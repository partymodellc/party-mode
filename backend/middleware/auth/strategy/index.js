module.exports.configure = () => {
    // strategy strategies
    require('./facebook')
    require('./google')
    require('./local')
}