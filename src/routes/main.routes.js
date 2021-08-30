const { requireSignin, adminMiddleware } = require("../common-middleware");
const { getMainPage, addMainPage, deleteMainPage } = require("../controller/admin/main");
const path = require('path');
const multer = require('multer');
const router = require("express").Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage });

router.get("/main/getMain", getMainPage);
router.post("/main/delMain/:swiperOneId", requireSignin, adminMiddleware, deleteMainPage);
router.post("/main/addMain", requireSignin, adminMiddleware, upload.array('swiperPicture'), addMainPage);

module.exports = router;
