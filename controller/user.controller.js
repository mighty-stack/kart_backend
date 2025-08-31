const userModel = require("../Models/user.model")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const fetchAboutPage = (req,res)=>{
    res.send('I am the about page')
}

const displayIndexPage = (req,res)=>{
    res.render("index")
}

const displaySignupPage = (req,res)=>{
    res.render("signup")
}

const getDashbordPage = (req,res)=>{
    userModel.find()
    .then((response)=>{
        console.log(response)
        allCustomers = response
        res.render("dashboard", {allCustomers})
    })
    .catch((err)=>{
        console.log(err, "an error occured")
    })
}

const registerUser = (req,res)=>{
     console.log(req.body)
     let form = new userModel(req.body)
     form.save()
     .then(()=>{
        console.log("information saved successfully")
        
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Use environment variable for security
    pass: process.env.PASSWORD, // Use environment variable for security
  }
});

let mailOptions = {
  from: 'juiletchristopher@gmail.com',
  to: [req.body.email, "alabiolumide38@gmail.com"],
  subject: 'Sending Email using Node.js',
  text: 'welcome to kart, we are glad to have you onboard'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
        res.redirect("/user/dashboard")
     })
     .catch((err)=>{
       console.log(err, "could not save information")
     })
}

const signinUser = (req, res) => {
    console.log(req.body)
    userModel.findOne({email: req.body.email})
    .then((user)=>{
        console.log(user, "user found")
        res.send({user:user, message: "user found"})
        if(user) {
          console.log("user found")
          user.validatePassword(req.body.password) ((err, isMatch) => {
            if (err) {
              console.log(err, "error validating password")
              res.status(500).send("Error validating password")
            }
            else if (isMatch) {
              console.log("user fonund")
              let token = jwt.sign({email:req.body.email}, "SECRETTT", {expiresIn:'5h'})
              console.log(token)
              res.send("/user/dashboard", token)
            }
            else{
              console.log("invalid credientials")
              res.status(401).send("invalid credientials")
            }
        });
      }
    })
    .catch((err)=>{
        console.log(err, "could not find user")
        res.redirect("/user/signup")
    });
}

const Dashboard = (req, res) => {
  let token = req.header.authorization.split(""[1])

  jwt.verify(token, "SECRETTT", (err, result)=>{
    if(err){
      console.log(err)
    }
    else{
      console.log(result)
    }
  })
}


module.exports = {
  fetchAboutPage, 
  displayIndexPage, 
  displaySignupPage, 
  getDashbordPage, 
  registerUser, 
  signinUser,
  Dashboard
}