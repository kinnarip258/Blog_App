//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const mongoose = require('mongoose');

//========================== Load Modules End =============================


//============================= Model Schema Of Comment =============================

const commentSchema = new mongoose.Schema({
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

            },
            comment: {
                type: String,

            }
        }
    ]
})


//============================= Comment Model =============================
const Comment = mongoose.model('Comment', commentSchema);

//========================== Export Module Start ===========================

module.exports = Comment;

//========================== Export module end ==================================