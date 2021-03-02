var router = require("express").Router();
var userServices = require("../services/userServices");
let bcrypt = require('bcrypt');
let saltRounds = 10;
var jwt = require('jsonwebtoken');
var path = require("path")


var checklogin = function(req, res, next){
    try {
        var token = req.cookies.token
        var decodeToken = jwt.verify(token, process.env.JWT_SECRET)
        userServices.CheckId(decodeToken.id)
        .then(function(data){
            console.log(decodeToken.id);
            if(data){
                next()
            }else{
                res.redirect("/login")
            }
        })
    } catch (error) {
        res.redirect("/login")
    }
} 





router.post("/signup", async function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    if(username == "" || password.length < 8 || email.includes('@') != true){
        return res.status(400).json({
            status: 400,
            message: "tài khoản không hợp lệ"
         });
     }
    let user = await userServices.checkEmail(req.body.email);
    if(user){
        return res.status(400).json({
            status: 400,
            message: "user đã tồn tại"
        })
    }
        
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            userServices.signup(username, email, hash).then((result) => {
                res.status(200).json({
                    status: 200,
                    mesage: "tao tai khoan thanh cong"
                })
            }).catch((err) => {
                res.status(400).json({
                    status: 400,
                    mesage: "tao tai khoan that bai"
                })
            });
        });
    });

})

router.post("/login", function(req, res){
    userServices.checkEmail( req.body.email).then((user) => {
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(!result || err){
                    return res.status(400).json({
                        status:400,
                        mesage: "sai tai khaon mat khau sss",
                        data: err
                    }) 
                }
                var token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
                res.cookie("token", token,{maxAge: 60*60*1000})
                    return res.status(200).json({
                        status: 200,
                        mesage: "thanh cong",
                        data:  {
                            token,
                            user
                        }
                    })

            });

        }else{
            return res.status(400).json({
                status:400,
                mesage: "sai tai khaon mat khau"
            })
        }
    }).catch((err) => {
        return res.status(500).json({
            status:500,
            mesage: "Loi k ket noi dc voi server"
        })
    });
})

router.get("/login", function(req, res){
    res.sendFile(path.join(__dirname, "../view/login.html"))
})




router.delete("/:id", function(req, res) {
    userServices.DeleteByID(req.params.id).then((result) => {
        return res.status(200).json({
            status: 200,
            mesage: "Xoa thanh cong"
        })
    }).catch((err) => {
        return res.status(400).json({
            status: 400,
            mesage: "That bai"
        })
        
    });
})

router.put("/:id", function(req, res) {
    userServices.UpdataById(req.params.id, req.body.username).then((result) => {
        return res.status(200).json({
            status: 200,
            mesage: "Cập nhật thành công"
        })
    }).catch((err) => {
        return res.status(400).json({
            status: 400,
            mesage: "Cập nhật k thanh cong"
        })
    });
})


router.get("/DashBoard",function(req, res){
    userServices.getAll().then((user) => {
        res.json(user)
    }).catch((err) => {
        console.log("loi");
    });
})


module.exports = router