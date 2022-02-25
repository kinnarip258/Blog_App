//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const mongoose = require('mongoose');

//========================== Load Modules End =============================


//============================= Model Schema Of Blog =============================

const likeSchema = new mongoose.Schema({
    articleId: {
        type: String,
    },
    Users: [
        {
            userId: {
                type: String,
    
            },
            username: {
                type: String,
      
            }
        }
    ]
})


//============================= User Model =============================
const Like = mongoose.model('Like', likeSchema);

//========================== Export Module Start ===========================

module.exports = Like;

//========================== Export module end ==================================