exports.shortid = function(name) {
    return `${name || "id"}_${Number(Math.random().toString().substr(3,6) + Date.now()).toString(36)}`
}