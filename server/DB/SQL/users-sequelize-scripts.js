const {User} = require('../../DB/models/models')
const ApiError = require('../../error/api-error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (Id, Name, Status) => {
    return jwt.sign(
        {Id, Name, Status},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


async function getAllUsersFromDB(next) {
    const users = await User.findAll()
    if (!users) {
        return next(ApiError.badRequest('No users'))
    }
    return users

}


async function loginDB(Name, Password, next) {

    const user = await User.findOne({where: {Name}})
    // const Id = user.Id
    // const Status = user.Status  //TODO проверить подобные случаи и перенести вних после проверки есть ли юзер
    if (!user) {
        return next(ApiError.badRequest('User not found'))
    }
    const Id = user.Id
    const Status = user.Status
    let comparePasswordIfHashed = bcrypt.compareSync(Password, user.Password)
    let comparePassword = Password === user.Password
    if (!comparePassword && !comparePasswordIfHashed) {
        return next(ApiError.badRequest('Wrong password or username'))
    }
    const token = generateJwt(Id, Name, Status)
    console.log(token)
    return token


}


async function changePasswordDB(Id, NewPassword, next) {

    const hashPassword = await bcrypt.hash(NewPassword, 5)
    const user = await User.findOne({where: {Id}})
    if (!user) {
        return next(ApiError.badRequest('User not found'))
    }
    await user.update({Password: hashPassword})

}


async function addOrUpdateUserDB(Id, Name, Status, Phone, Password, next, res) {

    if (!Name || !Status) {
        return next(ApiError.badRequest('Wrong data'))
    }
    if (Id === -1) {
        if (!Password) {
            return next(ApiError.badRequest('Wrong data'))
        }
        const candidate = await User.findOne({where: {Name}})
        if (candidate) {
            return next(ApiError.badRequest('User with such Name already exists'))
        }

        const hashPassword = await bcrypt.hash(Password, 5)

        await User.create({Name, Status, Phone, Password: hashPassword})
        return res.json('New user has been created!')

    } else {
        const user = await User.findOne({where: {Id}})
        if (user) {
            await user.update({Name, Status, Phone})
            return res.status(202).json({message: "User data has been changed"})
        }
        return next(ApiError.badRequest('User not found'))
    }


}


async function deleteUserFromDB(Id, res, next) {
    const user = await User.findOne({where: {Id}})
    if (user) {
        if (user.Name.toLowerCase() === "administrator") {
            return next(ApiError.badRequest(`You can't remove Administrator`))
        }
        await user.destroy()
        return res.status(202).json('User has been removed')
    }
    return next(ApiError.badRequest('User not found'))

}


module.exports = {
    getAllUsersFromDB,
    loginDB,
    changePasswordDB,
    addOrUpdateUserDB,
    deleteUserFromDB
}