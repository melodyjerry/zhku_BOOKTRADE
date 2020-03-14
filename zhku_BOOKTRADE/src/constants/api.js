export const host = HOST

// USER
export const API_GET_USER_OPENID = `${host}/wechat-return/UserInteract/wx_openid.php`
export const API_GET_USER_POINT = `${host}/wechat-return/UserInteract/personal_getPoint.php`

// BOOK
export const API_GET_BOOK_INFO_BY_ISBN = `${host}/wechat-return/code_getBookInfo.php`
export const API_GET_BOOK_COMMENT_BY_ISBN = `${host}/wechat-return/code_getBookComment.php`
export const API_GET_BOOK_INFO_BY_KEY = `${host}/wechat-return/search/search_getBookInfo.php`
export const API_USER_TAKE_BOOK = `${host}/wechat-return/UserInteract/home_take_bookFlist.php`

// HOME
export const API_GET_MORE_LASTEST_BOOK = `${host}/wechat-return/home/home_getBookInfo.php`

// CATEGORY
export const API_GET_All_CATEGORY_INFO = `${host}/wechat-return/category/category_getAllCategory.php`
export const API_GET_SINGLECATEGORY_BY_TYPE = `${host}/wechat-return/category/category_getTypeBook.php`


// CENSOR
export const API_GET_All_CENSOR_INFO = `${host}/wechat-return/CensorInteract/censor_getCensor.php`
export const API_ADD_CENSOR = `${host}/wechat-return/CensorInteract/home_addCensor.php`
export const API_DEAL_CENSOR = `${host}/wechat-return/CensorInteract/censor_dealCensor.php`
export const API_GET_USER_CENSOR_BY_OPENID = `${host}/wechat-return/CensorInteract/userCensor_get.php`

// COMMENT
export const API_GET_BECOMMENT_BOOK = `${host}/wechat-return/UserInteract/personal_getBeCommented.php`
export const API_COMMENT_SUBMIT = `${host}/wechat-return/UserInteract/personal_submitEval.php`