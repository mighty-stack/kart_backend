const userModel = require("../Models/user.model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const displaySignupPage = (req, res) => {
  res.render("signup");
};

const getDashbordPage = (req, res) => {
  userModel
    .find()
    .then((response) => {
      console.log(response);
      allCustomers = response;
      res.render("dashboard", { allCustomers });
    })
    .catch((err) => {
      console.log(err, "an error occured");
    });
};

const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    let form = new userModel(req.body);
    await form.save().then(() => {
      console.log("information saved successfully");

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        redirect: "/dashboard",
      });
    });



    let transporter = nodemailer.createTransport({
      host: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const userMailOptions = {
      from: `"Kart Team" <${process.env.EMAIL}>`,
      to: req.body.email,
      subject: "Welcome to Kart ",
      text: "We are glad to have you onboard",
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f7fa;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background: #007bff; color: white; padding: 15px 20px; text-align: center;">
          <h2>Welcome to Kart 🎉</h2>
        </div>
        <div style="padding: 20px;">
          <p>Hi <strong>${req.body.firstName || "User"}</strong>,</p>
          <p>We’re excited to have you on board! Your account has been successfully created.</p>
          <p>Start exploring our platform and enjoy smooth, reliable service for all your logistics needs.</p>
          <a href="https://Kart-mu.vercel.app/dashboard" 
             style="display:inline-block;margin-top:15px;background:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
             Go to Dashboard
          </a>
          <p style="margin-top:25px; font-size: 0.9em; color: #666;">
            If you didn’t register on Kart, please ignore this message.
          </p>
        </div>
      </div>
    </div>`,
    };

    const adminMailOptions = {
      from: `"Kart Notifications" <${process.env.EMAIL}>`,
      to: "alabiolumide38@gmail.com",
      subject: "New User Registered ",
      text: `
    A new user has registered on Kart.
    
    Name: ${req.body.firstName || ""} ${req.body.lastName || ""}
    Email: ${req.body.email}
  `,
    };
    setImmediate(async () => {
      try {
        await transporter.sendMail(userMailOptions);
        console.log("Welcome email sent successfully.");
        await transporter.sendMail(adminMailOptions);
        console.log("Admin notification email sent successfully.");
      } catch (mailErr) {
        console.error("Email send error:", mailErr.message);
      }
    });
  } catch (err) {
    console.log(err, "Registration error");
    res.status(500).json({
      success: false,
      message: "Could not complete registration",
      error: err.message,
    });
  }
};

const signinUser = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        console.log("user not found");
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      user.validatePassword(req.body.password, (err, isMatch) => {
        if (err) {
          console.log(err, "error validating password");
          return res
            .status(500)
            .json({ success: false, message: "Error validating password" });
        }
        if (!isMatch) {
          console.log("Invalid credentials");
          return res
            .status(401)
            .json({ success: false, message: "Invalid credentials" });
        }
        console.log("user found");
        try {
          const token = jwt.sign({ email: user.email }, "SECRETTT", {
            expiresIn: "5h",
          });
          console.log("Signin successful:", user.email);
          return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user,
          });
        } catch (jwtError) {
          console.error("JWT error:", jwtError);
          return res
            .status(500)
            .json({ success: false, message: "Token generation failed" });
        }
      });
    })
    .catch((err) => {
      console.log(err, "could not find user");
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
};

const Dashboard = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "SECRETTT", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
};

module.exports = {
  displaySignupPage,
  getDashbordPage,
  registerUser,
  signinUser,
  Dashboard,
};
