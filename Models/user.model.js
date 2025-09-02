const bcrypt = require("bcryptjs");

const { default: mongoose, Model } = require("mongoose");

//schemas
let userSchema = mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {
    type: String,
    required: true,
    unique: [true, "Email has been used before, try another email"]
  },
    password: {type:String, required:true},
    registrationDate: {type:Date, default:Date.now}
})

//hashing password before saving
let saltRounds = 10
userSchema.pre("save", function(next){
    console.log(this.password)
    bcrypt.hash(this.password, saltRounds, (err, hashedPassword)=>{
         if(err) {
            console.log(err, "hash not successful")
         }
         else{
            this.password = hashedPassword
            console.log(this.password, "hash successful")
            next()
         }
    })
})

//method to validate password
userSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return callback(err, false);
        }
        callback(null, isMatch);
    });
}

let userModel = mongoose.model("users_collection", userSchema)

module.exports = userModel;