const express = require('express');
const { requireSignin, userMiddleware, adminMiddleware } = require('../common-middleware');
const { addAddress, getAddress, getAllAddresses, deleteAddress } = require('../controller/address');
const router = express.Router();


router.post('/user/address/create', requireSignin, userMiddleware, addAddress);
router.post('/user/getaddress', requireSignin, userMiddleware, getAddress);

router.post('/user/getaddresses', requireSignin, adminMiddleware, getAllAddresses);
router.delete('/user/deleteaddress/:addressId', requireSignin, adminMiddleware, deleteAddress);

module.exports = router;