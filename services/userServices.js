var userModel = require("../model/userModels")

function signup(username, email, password){
    return userModel.create({
        username: username,
        email: email,
        password: password,
    })
}

function login(email, password){
    return userModel.findOne({
        email: email,
        password: password    
    })
}


function checkEmail(email){
    return userModel.findOne({
        email: email
    })
}

function getAll(){
    return userModel.find()
}

function DeleteByID(id){
    return userModel.deleteOne({
        _id: id
    })
}

function UpdataById (id, username){
    return userModel.updateOne({
        _id: id
    },{
        username: username
    })
}

function CheckId(id){
    return userModel.findOne({
        _id: id
    })
}

module.exports = {
    signup: signup,
    login: login,
    checkEmail: checkEmail,
    getAll:getAll,
    DeleteByID: DeleteByID,
    UpdataById: UpdataById,
    CheckId: CheckId
    
}
