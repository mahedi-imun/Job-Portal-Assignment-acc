const multer = require('multer')
const path = require('path')

const storage= multer.diskStorage({
    destination: "images/",
    filename:(req, file, cb)=> {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + "-" + file.originalname)
      }
})

const uploader = multer({
    storage:storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if(extName){
            return cb(null, true)
        }else{
            cb('Error: Images Only!')
        }
    },
    limits: { fileSize: 50000000 }
})
module.exports = uploader