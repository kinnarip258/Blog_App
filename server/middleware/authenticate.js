//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

//========================== Load Modules End =============================

//============================= Authenticate User =============================

const Authenticate = async (req,res, next) => {
    try{
        //============================= Get Cookie =============================

        const token = req.cookies.blog;

        //============================= Verify Token =============================

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

        //============================= Find Authenticate User =============================

        const authenticateUser = await User.findOne({_id: verifyToken._id, "Tokens.token": token})

        //============================= Not Authenticate User =============================

        if(!authenticateUser){
            throw new Error('User not found')
        }

        req.token = token;
        req.authenticateUser = authenticateUser;
        req.userId = authenticateUser._id;
        
        next();
    }
    catch(err) {
        //============================= Error Message Start =============================

        res.status(401).send('Unauthorized: No token Provided');
        console.log(err)

        //============================= Error Message End =============================
    }

}

//========================== Export Module Start ===========================

module.exports = Authenticate;

//========================== Export module end ==================================