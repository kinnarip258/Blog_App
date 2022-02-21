const multer = require('multer');
const path = require('path');


//Multer Config
module.exports = multer({
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '_' + Date.now()
                + path.extname(file.originalname))
        }
    }),
    limits: {
        fieldNameSize: 200,
        fileSize: 5 * 1024 * 1024,
    },
});
