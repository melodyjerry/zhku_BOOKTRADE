# -*- coding=utf-8 -*-
import math
import pymysql
import sys
from texttable import Texttable
from collections import defaultdict
#from Wtemp import *
from operator import itemgetter

# 读取数据库中评分记录
def readRecordFromDateBase():
    connection = pymysql.connect(
        host='119.29.139.239',              # IP，MySQL数据库服务器IP地址
        port=888,                           # 端口，默认3306，可以不输入
        user='zhku16_system',               # 数据库用户名
        password='FiF3i74ihEkC2njS',        # 数据库登录密码
        database='zhku_book_trade_system',  # 要连接的数据库
        charset='utf8'                      # 字符集，注意不是'utf-8'
    )
    cursor = connection.cursor()            # 游标
    sql = 'SELECT VERSION()'        
    cursor.execute(sql)                     # 使用游标执行SQL语句
    
    data = cursor.fetchone()                # 遍历单条数据
    print("数据库版本：%s" % data)

    connection.close()                      # 关闭数据库

# 读取评分记录
def readRecord(fileData):
    data=[]
    rates=[]
    f=open(fileData,"r")
    data=f.readlines()
    f.close()
    for line in data:
        dataLine=line.split("/")
        rates.append([str(dataLine[0]),int(dataLine[1]),int(dataLine[2])])
    return rates

#获取书籍列表
def getBookList(item):
    items={}
    f=open(item,"r")
    book_content=f.readlines()
    f.close()
    for book in book_content:
        bookLine=book.split("|")
        items[int(bookLine[0])]=bookLine[1:]
    return items

# 创建用户评分矩阵
# 输入：数据集合，格式：用户ID / 书籍ISBN / 用户评分
# 输出：1. [ 
#           {用户ID: [(书籍ISBN,评分),...] } 
#           {用户ID: [(书籍ISBN,评分),...] }
#           ...
#         ]
#      2. [ 
#           {书籍ISBN: [(用户ID,评分),...] } 
#           {书籍ISBN: [用户ID,...] }
#           ...
#         ]
def createMarkMatrix(rates):
    user_dict={}
    book_dict={}
    # 遍历所有记录
    for item in rates:
        # 用户字典
        if item[0] in user_dict:
            user_dict[item[0]].append((item[1], item[2]))
        else:
            user_dict[item[0]]=[(item[1], item[2])]
        # 书籍字典
        if item[1] in book_dict:
            book_dict[item[1]].append(item[0])
        else:
            book_dict[item[1]]=[item[0]]
    return user_dict,book_dict

# 计算物品相似度，相似度矩阵
# 就是
def itemCF(user_dict):
    # 新建一个空字典，用于状态每本书的观看人数
    N=dict()
    # C是公共矩阵
    C=dict()
    # W是相似度矩阵
    W=dict()
    # 遍历用户字典的所有值，得出公共矩阵，也就是看过这两本书的公共人数
    for key in user_dict:
        # 遍历当前用户曾经评分过的书籍
        for i in user_dict[key]:
            # i[0]就是书籍的ISBN，N[i[0]]就是当前这本书评分人数
            if i[0] not in N.keys(): #i[0]表示movie_id
                N[i[0]]=0
                C[i[0]]=dict()
            N[i[0]]+=1
            # 这里再遍历一次user_dict计算公共矩阵
            for j in user_dict[key]:
                # 两本书相同的话直接跳过
                if i[0]==j[0]:
                    continue
                # 判断i[0]和j对应的值
                if j[0] not in C[i[0]].keys():
                    C[i[0]][j[0]]=0
                C[i[0]][j[0]]+=1
    # 接下来计算相似度矩阵
    for i, related_item in C.items():
        W[i]=dict()
        for j, cij in related_item.items():
            # 余弦相似公式
            W[i][j]=cij/math.sqrt(N[i]*N[j]) 
    return W
    # for i, related_item in C.items():

                    


# 结合用户评分矩阵对user_id为评价过的书进行预测
# user_id：待推荐的用户
# user_dict：评分矩阵
# K：取多少本相似的书籍来计算
def recommondation(user_id, user_dict, K):
    rank=defaultdict(int)
    l=list()
    W=itemCF(user_dict)
    # 计算预测分数，遍历曾经评分过的书籍
    for item in user_dict[user_id]:
        bookIsbn = item[0]  # 评价过的书籍的ISBN
        bookScore = item[1] # 评价过的书籍的评分
        # 取相似度较高的前K本书来计算
        # print(bookIsbn, W[bookIsbn])
        for j in sorted(W[bookIsbn].items(), key=itemgetter(1),reverse=True)[0:K]:
            flag = False
            for temp in user_dict[user_id]:
                if j[0] == temp[0]:
                    flag = True
                    break
            # 评价过的书则跳过
            if flag:
                continue
            # 预测未评价的书的评分，套用公式，相似度*评分之和，则出最终的期待值
            rank[j[0]]+=bookScore*j[1]
    # 返回前10本书
    l=sorted(rank.items(),key=itemgetter(1),reverse=True)[0:10]
    return l

# 主程序
if __name__=='__main__':
    user_id='aaaaa'
    dataItemTemp=readRecord('ml-100k/u.data_small')
    user_dict,book_dict=createMarkMatrix(dataItemTemp)
    bookTemp=recommondation(user_id, user_dict, 10)
    rows=[]
    table=Texttable()                                              #创建表格并显示
    table.set_deco(Texttable.HEADER)
    table.set_cols_dtype(['t','t','a'])
    table.set_cols_align(["l","l","l"])
    rows.append(["被推荐用户","被推荐书籍的ISBN","期待值"])
    for i in bookTemp:
        rows.append([user_id, i[0], i[1]])
    table.add_rows(rows) 
    print(table.draw())
    # readRecordFromDateBase()