const mongoose = require('mongoose')
const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
    type:String,
    required:true,
    unique: true
    },
    email:{
    type:String,
    required:true,
    unique: true
    },
    password:{
    type:String,
    required:true
    },
    confirmPassword:{
    type:Boolean,
    required:false,
    },
    phoneNumber: {
    type:String,
    required:true,
},
    address: {
    type: String
  },
    cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  }
});
userSchema.pre('save',async function (next) {
    if(!this.isModified('password'))
    return next();
    const salt=await bycrypt.genSalt(10);
    this.password =bycrypt.hash(this.password,salt);
    next();
});

// userSchema.methods.matchPassword = async function(enterPassword) {
//     return await bycrypt.compare(this.password, enterPassword)
// };



const User=mongoose.model('User',userSchema)

module.exports = User;