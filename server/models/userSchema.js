//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//========================== Load Modules End =============================

//============================= Model Schema Of User =============================

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    cpassword: {
        type: String,
    },
    profilePhoto: [
        {
            type: String,
        }
    ],
    Articles: [
        {
            title: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            tags: [
                {
                    type: String,
                    required: true
                }
            ],
            description: {
                type: String,
                required: true
            },
            banner: {
                type: String,
            },
            createAt:{
                type: Date,
                default: Date.now
            },
            Likes: [
                {
                    type: mongoose.Types.ObjectId
                }
            ],
            Comment: [
                {
                    userId: {
                        type: String
                    },
                    comment: {
                        type: String
                    }
                }
            ],
        }
    ],
    Tokens: [
        {
            token: {
                type: String,
                required: true  
            }
        }
    ],
    createAt:{
        type: Date,
        default: Date.now
    },
});

//============================= Hashing Password =============================
userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

//============================= Generate Token =============================
userSchema.methods.generateAuthToken = async function() {
    try{
        //============================= Generate Token =============================
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        //============================= Concat Token With Tokens =============================
        this.Tokens = this.Tokens.concat({token});
        //============================= Save Token =============================  
        await this.save();
        return token;
    }
    catch (err) {
        //============================= Error Response =============================
        console.log(err);
    }
}

//============================= User Model =============================
const User = mongoose.model('User', userSchema);

//========================== Export Module Start ===========================

module.exports = User;

//========================== Export module end ==================================