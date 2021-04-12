const ApiError = require('../error/api-error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../DB/models/models')
const authMiddleware = require('../middleware/auth-middleware')
const chalk = require('chalk')

const generateJwt = (id, name, role) => {
    return jwt.sign(
        {id, name, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController {

    async getAllUsers(req, res, next) {
        const users = await User.findAll()
        if (!users) {
            return next(ApiError.badRequest('No users'))
        }
        return res.json(users)

    }



    async login(req, res, next) {
        const {name, password} = req.body
        const user = await User.findOne({where: {name}})
        const id = user.id
        const role = user.role
        if (!user) {
            return next(ApiError.badRequest('User not found'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Wrong password'))
        }
        const token = generateJwt(id, name, role)
        //return res.json({id, name, password, role, token})
        return res.json({token})
    }

    async logOut(req, res, next) {
        return res.status(202).json({message: "Logout completed"})

    }

    async changPassword(req, res, next) {

        const {id, newPassword} = req.body
        const hashPassword = await bcrypt.hash(newPassword, 3)
        const user = await User.findOne({where: {id}})
        if (user) {
            await user.update({password: hashPassword})
            return res.status(202).json({message: "Password has been changed"})
        }
        return next(ApiError.badRequest('User not found'))
    }

    async addOrUpdateUser(req, res, next) {

        const {id, name, role, phone, password} = req.body

        if (!name || !role) {
            return next(ApiError.badRequest('Wrong data'))
        }
        if (id === -1) {
            if (!password) {
                return next(ApiError.badRequest('Wrong data'))
            }
            const candidate = await User.findOne({where: {name}})
            if (candidate) {
                return next(ApiError.badRequest('User with such name already exists'))
            }
            let hashPassword
            if(name==="Administrator"){
                hashPassword = await bcrypt.hash(password, 10)
            } else {
                hashPassword = await bcrypt.hash(password, 5)
            }
            const user = await User.create({name, role, phone, password: hashPassword})
            return res.json('New user has been created!')

        } else {
            const user = await User.findOne({where: {id}})
            if (user) {
                await user.update({name: name, role: role, phone: phone})
                return res.status(202).json({message: "User data has been changed"})
            }
            return next(ApiError.badRequest('User not found'))
        }
    }

    async deleteUser (req, res, next){
        const {id} = req.body

        const user = await User.findOne({where:{id}})
        if(user){
            await user.destroy()
            return res.status(202).json('User has been removed')
        }
        return next(ApiError.badRequest('User not found'))

    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.name, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()