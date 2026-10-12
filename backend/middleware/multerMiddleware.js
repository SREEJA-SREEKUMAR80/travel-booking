// import multer
const multer=require("multer")

const storage=multer.diskStorage({
    // path to store data
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },

    // name in which file is stored
    filename:(req,file,callback)=>{
        const fname=`image-${file.originalname}`
        callback(null,fname)
    }
})

const fileFilter = (req, file, callback) => {
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/svg"];
    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error("Only jpeg, jpg, svg, png files are allowed"));
    }
};


// create config
const multerConfig=multer({
    storage,
    fileFilter
})

module.exports=multerConfig