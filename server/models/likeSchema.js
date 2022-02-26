//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const mongoose = require('mongoose');

//========================== Load Modules End =============================


//============================= Model Schema Of Like =============================

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


//============================= Like Model =============================
const Like = mongoose.model('Like', likeSchema);

//========================== Export Module Start ===========================

module.exports = Like;

//========================== Export module end ==================================