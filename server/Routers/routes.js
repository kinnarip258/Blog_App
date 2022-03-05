//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');
const sendMail = require('../mail/nodemailer');
const upload = require('../fileupload/multer');
const cloudinary = require('../fileupload/cloudinary');
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

router.post('/uploadProfilePicture', upload.single('profilePicture'), async (req, res) => {
    try{
        const photo = req.file;
    
        //============================= Upload Profile Picture in Cloudinary =============================
        const uploadPhoto = await cloudinary.uploader.upload( photo.path, { resource_type: 'auto'});

        //============================= Update Profile Picture in User Data =============================
        await User.updateOne({username: req.query.Username} , { $push: { profilePhoto: uploadPhoto.secure_url} } )
        
        //============================= Send Response =============================
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
        
        let aggregateQuery = [];
        
        aggregateQuery.push(
            {
                $match: {
                    email: req.authenticateUser.email
                },
            },
            {
                $unwind: "$Articles",
            },
            {
                $sort: { "Articles.createAt": -1}
            }
            
        )

        //============================= Get LoginUser =============================
        const LoginUser = req.authenticateUser;
        const MyArticles = await User.aggregate([aggregateQuery]);
        //============================= Send Login User =============================
        res.send({LoginUser, MyArticles});

    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
});


//============================= Get search Article =============================
//authenticate,
router.put('/getBlogs',  async (req,res) => {
    
    try{
        
        //============================= get Search User =============================
        const {SearchValue} = req.body;

        let aggregateQuery = [];

        if(SearchValue === ""){
            aggregateQuery.push(
                {
                    $unwind : "$Articles",
                }, 
                {
                    $sort: { "Articles.createAt": -1}
                }
            )
            const blogs = await User.aggregate([aggregateQuery]);
            
            res.send(blogs);
        }

        else{
            aggregateQuery.push(  
                {
                    $unwind : "$Articles",
                }, 
                {
                    $match: {
                        $or: [
                            {"Articles.title": new RegExp("^" + SearchValue, 'i')},
                            {"Articles.category": new RegExp("^" + SearchValue, 'i')},
                            {"Articles.tags": new RegExp(SearchValue, 'i')},
                            {"username": new RegExp("^" + SearchValue, 'i')}
                        ]   
                    },
                },
                {
                    $sort: { "Articles.createAt": -1}
                }   
            );
    
            //============================= Apply AggreagteQuery In User Collection =============================
            const matchUser = await User.aggregate([aggregateQuery]);
            
            //============================= Send Response =============================
            res.send(matchUser); 
        }
    }
    catch(err) {
        console.log(err);
        
    };
});

//============================= Add Article =============================

router.post('/addArticle', authenticate, async (req,res) => {
    
    try{

        const {title, description, category, tags} = req.body.values;
        const banner = req.body.Banner;
        const article = {
            title: title, 
            description: description, 
            category: category, 
            tags: tags,
            banner: banner
        }

        //============================= Add Article =============================
        await User.updateOne({email: req.authenticateUser.email} , { $push: { Articles: article} } )
        
        res.send({msg: 'Article Added successfully!'})
    }
    catch(err) {
        res.send(err)
    };
});

//============================= Add Article Banner =============================

router.post('/addArticleBanner', authenticate, upload.single('image'), async (req,res) => {

    try{
        
        const photo = req.file;
        
        //============================= Upload Article Banner =============================
        const uploadPhoto = await cloudinary.uploader.upload( photo.path, { resource_type: 'auto'});
       
        const banner = uploadPhoto.secure_url;

        res.send(banner);
    }
    catch(err) {
        res.send(err)
    };
});

//============================= Edit Article =============================

router.put('/updateArticle', authenticate, async (req,res) => {
    try{
       
        const {_id, title, description, category, tags, banner} = req.body.values;
        const ArticleBanner = req.body.Banner;
        
        if(ArticleBanner.length === undefined){
            console.log("if");
            const article = {
                _id: _id,
                title: title, 
                description: description, 
                category: category, 
                tags: tags,
                banner: banner
            }
            
            //============================= Update Article Data =============================
            await User.findOneAndUpdate(
                { "Articles._id": req.query.ID }, {$set: {"Articles.$": article}}
            );
           
            //============================= Send Response =============================
            res.send({msg: "Profile Updated Sucessfully!" })
        }
        else{
            console.log("else");
            const article = {
                _id: _id,
                title: title, 
                description: description, 
                category: category, 
                tags: tags,
                banner: ArticleBanner
            }
        
            //============================= Update Article Data =============================
            await User.findOneAndUpdate(
                { "Articles._id": req.query.ID }, {$set: {"Articles.$": article}}
            );
           
            //============================= Send Response =============================
            res.send({msg: "Profile Updated Sucessfully!" })
        }  
    }
    catch(err){
        //============================= Send Error Message =============================
        res.send(err)
    }
})


//============================= Delete Article =============================

router.delete('/deleteArticle', authenticate, async (req,res) => {
    
    try{

        //============================= Delete Article Data =============================
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

//============================= Like Article =============================

router.post('/likeArticle', authenticate, async (req,res) => {
    
    try{
    
        const {userId} = req.body;
        const articleId = req.query.ID;
        
        //============================= Like Article =============================
        await User.findOneAndUpdate(
            { "Articles._id": articleId }, {$push: {"Articles.$.Likes": userId}}
        );
          
        res.send({msg: "Like The Article"});
 
    }
    catch(err) {
        res.send("error" + err)
    };
});

//============================= UnLike Article =============================

router.post('/unLikeArticle', authenticate, async (req,res) => {
    
    try{
    
        const {userId} = req.body;
        const articleId = req.query.ID;
        
        //============================= Like Article =============================
        await User.findOneAndUpdate(
            { "Articles._id": articleId }, {$pull: {"Articles.$.Likes": userId}}
        );
          
        res.send({msg: "UnLike The Article"});
 
    }
    catch(err) {
        res.send("error" + err)
    };
});

//============================= Get LikeUser Article =============================

router.get('/likeUser',authenticate, async (req,res) => {
    
    try{

        let aggregateQuery = [];

        aggregateQuery.push(
            {
                $project: {username: 1}
            }
        )
        //============================= Get Like Articles =============================
        const likes = await User.aggregate([aggregateQuery]);
        res.send(likes);
    }
    catch(err) {
        res.send("error" + err)
    };
});

//============================= Comment Article =============================

router.post('/commentArticle', authenticate, async (req,res) => {
    
    try{
        const {userId,username, comment} = req.body;
        const articleId = req.query.ID;
       
        const user = {
            userId: userId,
            username: username,
            comment: comment
        };

        //============================= Like Article =============================
        await User.findOneAndUpdate(
            { "Articles._id": articleId }, {$push: {"Articles.$.Comment": user}}
        );

        res.send({msg: "Comment The Article"});
        
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