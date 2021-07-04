const ApiError = require('../error/api-error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../DB/models/models')
const authMiddleware = require('../middleware/auth-middleware')

const {
    getAllUsersFromDB,
    loginDB,
    changePasswordDB,
    addOrUpdateUserDB,
    deleteUserFromDB
} = require('../DB/SQL/users-sequelize-scripts')

// const generateJwt = (Id, Name, Status) => {
//     return jwt.sign(
//         {Id, Name, Status},
//         process.env.SECRET_KEY,
//         {expiresIn: '24h'}
//     )
// }


class UserController {

    async getAllUsers(req, res, next) {
        try {
            const users = await getAllUsersFromDB(next)
            return res.json(users)

        } catch (error) {
            return next(ApiError.internal(error.message))
        }

    }


    async login(req, res, next) {

        try {
            const {Name, Password} = req.body
            // const user = await User.findOne({where: {Name}})
            // const Id = user.Id
            // const Status = user.Status
            // if (!user) {
            //     return next(ApiError.badRequest('User not found'))
            // }
            // let comparePasswordIfHashed = bcrypt.compareSync(Password, user.Password)
            // let comparePassword = Password === user.Password
            // if (!comparePassword && !comparePasswordIfHashed) {
            //     return next(ApiError.badRequest('Wrong password or username'))
            // }
            // const token = generateJwt(Id, Name, Status)
            // //return res.json({id, name, password, role, token})
            const token = await loginDB(Name, Password, next)
            return res.json({token})
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }

    async logOut(req, res, next) {
        try {
            return res.status(202).json({message: "Logout completed"})
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }


    async changPassword(req, res, next) {

        try {
            const {Id, NewPassword} = req.body
            // const hashPassword = await bcrypt.hash(NewPassword, 5)
            // const user = await User.findOne({where: {Id}})
            // if (!user) {
            //     return next(ApiError.badRequest('User not found'))
            // }
            // await user.update({Password: hashPassword})
            await changePasswordDB(Id, NewPassword, next)
            return res.status(202).json({message: "Password has been changed"})
        } catch (error) {
            return next(ApiError.internal(error.message))

        }
    }

    async addOrUpdateUser(req, res, next) {
        try {
            const {Id, Name, Status, Phone, Password} = req.body
            // if (!Name || !Status) {
            //     return next(ApiError.badRequest('Wrong data'))
            // }
            // if (Id === -1) {
            //     if (!Password) {
            //         return next(ApiError.badRequest('Wrong data'))
            //     }
            //     const candidate = await User.findOne({where: {Name}})
            //     if (candidate) {
            //         return next(ApiError.badRequest('User with such Name already exists'))
            //     }
            //     console.log(chalk.red(Name, Status, Phone, Password))
            //     const hashPassword = await bcrypt.hash(Password, 5)
            //
            //     await User.create({Name, Status, Phone, Password: hashPassword})
            //     return res.json('New user has been created!')
            //
            // } else {
            //     const user = await User.findOne({where: {Id}})
            //     if (user) {
            //         await user.update({Name, Status, Phone})
            //         return res.status(202).json({message: "User data has been changed"})
            //     }
            //     return next(ApiError.badRequest('User not found'))
            // }
            await addOrUpdateUserDB(Id, Name, Status, Phone, Password, next, res)
        } catch (error) {
            return next(ApiError.internal(error.message))

        }
    }

    async deleteUser(req, res, next) {
        try {
            const {Id} = req.body
            // const user = await User.findOne({where: {Id}})
            // if (user) {
            //     if (user.name.toLowerCase() === "administrator") {
            //         return next(ApiError.badRequest(`You can't remove Administrator`))
            //     }
            //     await user.destroy()
            //     return res.status(202).json('User has been removed')
            // }
            // return next(ApiError.badRequest('User not found'))
            await deleteUserFromDB(Id, res, next)
        } catch (error) {
            return next(ApiError.internal(error.message))
        }
    }

//     async check(req, res, next) {
//         const token = generateJwt(req.user.id, req.user.name, req.user.Status)
//         return res.json({token})
//     }
}

module.exports = new UserController()