//========================== Load Modules Start ===========================

//========================== Load internal Module =========================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//========================== Load Modules End =============================


//============================= Model Schema Of Blog =============================

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    banner: {
        type: String,
    }
})


//============================= User Model =============================
const Blog = mongoose.model('Article', articleSchema);

//========================== Export Module Start ===========================

module.exports = Blog;

//========================== Export module end ==================================