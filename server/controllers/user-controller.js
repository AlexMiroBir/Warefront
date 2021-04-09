const ApiError = require('../error/api-error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../DB/models/models')
const authMiddleware= require('../middleware/auth-middleware')

const generateJwt = (id, name, role) => {
    return jwt.sign(
        {id, name, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController {
    async registration(req, res, next) {
        const {name, password, role} = req.body
        if (!name || !password) {
            return next(ApiError.badRequest('Wrong name or password'))
        }
        const candidate = await User.findOne({where: {name}})
        if (candidate) {
            return next(ApiError.badRequest('User with such name already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({name, role, password: hashPassword})
        const token = generateJwt(user.id, user.name, user.role)
        return res.json({token})

    }

    async login(req, res, next) {
        const {name, password} = req.body
        const user = await User.findOne({where: {name}})
        if (!user) {
            return next(ApiError.badRequest('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Wrong password'))
        }
        const token = generateJwt((user.id, user.name, user.role))
        return res.json({token})
    }

    async check(req, res, next) {
       const token = generateJwt(req.user.id, req.user.name, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()