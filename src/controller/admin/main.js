const Main = require("../../models/main");
const { deletePigs } = require("../../uploads/ClearPicture");
const slugify = require("slugify");

exports.addMainPage = (req, res) => {
    const { name, category } = req.body;
    if (req.files.length > 0) {
        swiperPictures = req.files.map((file) => {
            return { img: file.filename };
        });
    }
    const swiperPig = new Main({
        name: name,
        slug: slugify(name),
        swiperPictures,
        category,
        createdBy: req.user._id,
    });
    swiperPig.save((error, pig) => {
        if (error) return res.status(400).json({ error: 'Saving error SwiperOne images!' });
        if (pig) {
            res.status(200).json({ swiperPig, files: req.files });
        }
    });

};

exports.getMainPage = (req, res) => {
    Main.find()
        .populate("category", "name")
        .exec((error, mains) => {
            if (error) return res.status(400).json({ error: 'Geting error SwiperOne images!' });
            if (mains) {
                res.status(200).json({ mains });
            }
        });
};

exports.deleteMainPage = async (req, res) => {
    const { swiperOneId } = req.params;
    const pigsForDelete = req.body;
    if (swiperOneId) {
        Main.deleteOne({ _id: swiperOneId }).exec((error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
                deletePigs(pigsForDelete);
                res.status(202).json({ result: 'Successfully images deleted!' });
            }
        });
    } else {
        res.status(400).json({ error: "Params required" });
    }
};

