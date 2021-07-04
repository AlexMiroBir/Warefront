// const morgan = require('morgan')
// const chalk = require('chalk')
//
// module.exports  =  morgan(function (tokens, req, res) {
//     return [
//         '\n',
//         chalk.bgGrey.hex('#ff4757').bold('Morgan --> '),
//         '\n',
//         chalk.yellow.bold('METHOD: '+tokens.method(req, res)),
//         '\n',
//         chalk.yellow.bold('STATUS: '+tokens.status(req, res)),
//         '\n',
//         chalk.yellow.bold('URL: '+tokens.url(req, res)),
//         '\n',
//         chalk.yellow.bold('RESPONSE TIME: '+tokens['response-time'](req, res) + ' ms'),
//         '\n',
//         chalk.yellow.bold('TIME STAMP: ' + tokens.date(req, res)),
//         '\n',
//         chalk.yellow.bold('REMOTE ADDRESS: '+tokens['remote-addr'](req, res)),
//         '\n',
//         chalk.yellow.bold('FROM: ' + tokens.referrer(req, res)),
//         '\n',
//         chalk.yellow.bold('USER AGENT: '+tokens['user-agent'](req, res)),
//         '\n',
//         chalk.bgGrey.hex('#ff4757').bold('<-- Morgan '),
//         '\n',
//
//     ].join(' ');
// })