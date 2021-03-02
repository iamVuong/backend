require("dotenv").config();
var express = require("express");
var app = express();
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var userRouter = require("./router/user")
// parse application/x-www-form-urlencoded
var path = require("path")
app.use(express.static(path.join(__dirname, 'public'))) 
app.use(bodyParser.urlencoded({ extended: false }))
var cors = require('cors')
app.use(cors())
// parse application/json
app.use(bodyParser.json())
 
app.use(cookieParser())
app.use("/", userRouter)


app.listen(process.env.PORT, function(req, res){
    console.log("Da ket noi tai cong 3000")
})