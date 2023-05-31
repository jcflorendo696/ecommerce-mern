import path from 'path';
import express from 'express'
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png/;
    const extname   = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype  = filetypes.test(file.mimetype);
    if(extname && mimetype){
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

const upload = multer({
    storage,
});

router.post('/', upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'banner_image', maxCount: 1 }
    ]), (req, res) => {

    const { image, banner_image } = req.files;

    if(image){
        res.send({
            message: 'Image Uploaded',
            image: `/${image[0].path}`
        });
    } else if (banner_image){
        res.send({
            message: 'Banner Image Uploaded',
            bannerImage: `/${banner_image[0].path}`
        });

        console.log('banner_image condition');
    }
});

export default router;