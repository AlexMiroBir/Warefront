const chalk = require('chalk')
// TODO понять вообще нужно это или нет и как должно работать

module.exports = function (err, req, res, next) {
    if(!err){
        console.log(chalk.greenBright(`
        REQUEST: ${req}
        RESPONSE: ${res}
        `))
        next()


    }




}