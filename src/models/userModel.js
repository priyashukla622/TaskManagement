// const mongoose=require("mongoose");

// const userSchema=new mongoose.Schema({
//     username:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     role:{
//         type:String,
//         enum:["admin","user"],
//         default:"user"
//     },
//     contact:{
//         type:Number,
//         required:true
//     }
// })
// const userModel= mongoose.model('User', userSchema);
// module.exports = userModel;


const mongoose=require("mongoose");
const userSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     required: true
    // },
    username: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[A-Za-z][A-Za-z0-9\s]*$/.test(value);  
            },
            message: "Username must start with a letter and can contain letters, numbers, and spaces."
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,  
        lowercase: true 
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    contact: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[6-9]\d{9}$/.test(value);
            },
            message: "Contact number must be a valid 10-digit."
        }
    }
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

