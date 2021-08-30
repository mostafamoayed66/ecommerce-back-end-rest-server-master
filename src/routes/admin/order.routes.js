const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const {
  initialDataOrder,
  updateOrder,
  getCustomerOrders,
  deleteOrder
} = require("../../controller/admin/order.admin");
const router = express.Router();

router.post(`/order/initialDataOrders`, requireSignin, adminMiddleware, initialDataOrder);
router.post(`/order/update`, requireSignin, adminMiddleware, updateOrder);
router.post(
  `/order/getCustomerOrders`,
  requireSignin,
  adminMiddleware,
  getCustomerOrders
);
router.delete(`/order/delete/:orderId`, requireSignin, adminMiddleware, deleteOrder);

module.exports = router;
