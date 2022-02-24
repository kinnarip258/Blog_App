//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
const sendMail = require('../mail/nodemailer');
const upload = require('../fileupload/multer');
const cloudinary = require('../fileupload/cloudinary');
const path = require('path');
const User = require('../models/userSchema');
//========================== Load Modules End =============================

//============================= Register =============================

router.post('/signUp', async (req,res) => {
 
    const {name, email , phone, username, password, cpassword } = req.body;

    try {
        const emailExist = await User.findOne({email: email});
    
        const UsernameExist = await User.findOne({username: username});
        if(emailExist || UsernameExist) {
            return res.status(400).send({error: 'User Already Exist!'});
        }

        else {

            //============================= Save Register User =============================
            await new User({name, email, phone,username, password, cpassword}).save();

            //============================= Send Email To Register User =============================
            //sendMail({toUser: user.email, user: user});

            res.send({msg:"User Register Successfully!"});

        }
    }
    catch(err){
        //============================= Error Message =============================
        res.send(err)
    }
});

//============================= ProfilePhotot Upload =============================

router.post('/uploadProfilePicture',upload.single('profilePicture'), async (req, res) => {
    try{
        const photo = req.file;
        console.log("photo", photo);

        const uploadPhoto = await cloudinary.uploader.upload( photo.path, { resource_type: 'raw'});
        console.log(uploadPhoto);

        res.send({msg: "Profile Picture Updated Successfully!"})
    
    }
    catch(err){
        res.send(err);
    }
})


//============================= Login =============================

router.post('/signIn', async (req,res) => {
   
    try {
        let token;

        const {username, password } = req.body;

        //============================= User Exist =============================
        const userLogin = await User.findOne({ username: username});

        if(userLogin){
           //============================= Login User PassWord Matching=============================
           const isMatch = await bcrypt.compare(password, userLogin.password);
            
           if(!isMatch){
            res.status(400).send({ error: "Invalid Credientials!"});
            }
            else {
                //============================= Generate Token =============================
                token = await userLogin.generateAuthToken();

                //============================= Store Token In Cookie =============================
                res.cookie("blog", token , {
                    expires: new Date(Date.now() + 3600000),

                });
                //============================= Send Login User =============================
                res.send({msg: "User Login Successfully!"});
            }
        }
        else{
            //============================= Send Response =============================
            res.status(400).send({ error: "Invalid Username Or Password!"});
        }  
    }
    catch (err) {
        //============================= Send Error Message =============================
        res.send(err)
    }
})

//============================= Get LoginUser Profile =============================

router.get('/userProfile',authenticate, async (req,res) => {
    try{
        const LoginUser = req.authenticateUser

        //============================= Send Login User =============================
        res.send(LoginUser);

    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
})

//============================= Get Blogs =============================
//authenticate, 
router.get('/getBlogs', async (req,res) => {
    try{

        const blogs = await User.find();
        
        res.send(blogs)
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
})

//============================= Add Article =============================

router.post('/addArticle', authenticate, upload.single('image') , async (req,res) => {
    
    try{
        console.log("req.body", req.body);
        const {title, description , category, tags} = req.body
        
        const article = {
            title , description , category, tags 
        }
    
        await User.updateOne({email: req.authenticateUser.email} , { $push: { Articles: article} } )
    
        res.send({msg: 'Article Added successfully!'})
    }
    catch(err) {
        res.send(err)
    };
});

//============================= Add Article Banner =============================
//
router.post('/addArticleBanner', authenticate, upload.single('image'), async (req,res) => {

    try{
        console.log("req.file", req.file);
        const photo = req.file;
        
        const updateQuery = [];

        updateQuery.push(
            {
                $match: {
                    email: req.authenticateUser.email
                },
                        
            }
        )
        console.log("req.query.ID", req.query.ID);
        await User.updateOne({email: req.authenticateUser.email} , { $push: { Articles: article} } )

        const uploadPhoto = await cloudinary.uploader.upload( photo.path, { resource_type: 'auto'});
        console.log(uploadPhoto);

        
        res.send({msg: "Article Banner Updated Successfully!"})
    }
    catch(err) {
        res.send(err)
    };
});


//============================= Edit Article =============================

router.put('/updateArticle', authenticate, async (req,res) => {
    try{
        
        const updateUser = await User.findOneAndUpdate(
            { _id: req.query.ID }, req.body
        )
        
        //============================= Send Response =============================
        res.send({msg: "Profile Updated Sucessfully!" })
                
        
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
})


//============================= Delete Article =============================

router.delete('/deleteArticle', authenticate, async (req,res) => {
    
    try{

        await User.updateOne(
            { email: req.authenticateUser.email },
            { $pull: { Articles: { _id: req.query.ID } } }
        )

        //============================= Send Response =============================
        res.send({msg: "User Deleted Successfully!"})
        
    }
    catch(err) {
        res.send("error" + err)
    };
});

//============================= Logout =============================

router.get('/logout', authenticate, async (req,res) => {
    try{

        //============================= Remove Token From Database =============================
        req.authenticateUser.Tokens = req.authenticateUser.Tokens.filter((ele) => {
            return ele.token !== req.token
        })
        //============================= Clear Cookie =============================
        res.clearCookie("blog");
        
        //============================= Save Authenticate User =============================
        await req.authenticateUser.save();

        //============================= Send Response =============================
        res.status(200).send("User Logout");
    }
    catch(err){
        //============================= Send Error Message =============================
        res.status(500).send(err);
    }
    
});

//========================== Export Module Start ===========================

module.exports = router;

//========================== Export module end ==================================