const Category = require("../../models/category");
const Product = require("../../models/product");
// const Order = require("../../models/order");
const UserAddress = require("../../models/address");
const User = require("../../models/user");

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id),
        });
    }

    return categoryList;
}

exports.initialData = async (req, res) => {
    const admins = await User.countDocuments({ role: "admin" });
    const members = await User.countDocuments({ role: "user" });
    const memberWithAddresses = await UserAddress.countDocuments();
    const categories = await Category.find({}).exec();
    res.status(200).json({
        categories: createCategories(categories),
        memberWithAddresses,
        members,
        admins
    });
};
