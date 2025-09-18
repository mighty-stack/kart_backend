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
res.status(201).json({
        success: true,
        message: "User registered successfully",
        redirect: "/dashboard"
      })
    })
    .catch((err) => {
      console.log(err, "could not save information");
      res.status(500).json({
        success: false,
        message: "Could not save information",
        error: err.message
      })
    })
}

const signinUser = (req, res) => {
  const { email, password } = req.body
    console.log(req.body)
     if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

    userModel.findOne({email: req.body.email})
    .then((user)=>{
        if(!user) {
          console.log("user not found")
          return res.status(404).json({ success: false, message: "User not found" });
        }
        user.validatePassword(req.body.password, (err, isMatch) => {
            if (err) {
              console.log(err, "error validating password")
              return res.status(500).send("Error validating password")
            }
            if (!isMatch) {
          console.log("Invalid credentials");
          return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
            
              console.log("user found")
              let token = jwt.sign({email:req.body.email},
               "SECRETTT", 
                {expiresIn:'5h'}
              )
              console.log(token)

              return res.status(200).json({ 
                success: true, 
                message: "login successful", 
                token, 
                user
               })
        })})
    .catch((err)=>{
        console.log(err, "could not find user")
         res.status(500).json({ success: false, message: "Internal server error" });
    });
}


const Dashboard = (req, res) => {
const authHeader = req.headers.authorization;
if (!authHeader) return res.status(401).json({ error: "No token" });

const token = authHeader.split(" ")[1]; 

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