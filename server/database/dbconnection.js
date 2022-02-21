//========================== Load Modules Start ===========================

//========================== Load internal Module =========================
const mongoose = require('mongoose');

//========================== Load Modules End =============================

//========================== MongoDB Connection =============================

//============================= Coonection Request =============================
const DB = process.env.DATABASECOMPASS;

//============================= Coonection With Database =============================
mongoose.connect(DB)
 .then(() => console.log('db connected'))
 .catch(err => console.log(err));