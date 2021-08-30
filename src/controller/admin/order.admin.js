const Order = require("../../models/order");

exports.initialDataOrder = async (req, res) => {
  const orders = await Order.find({})
    .populate("items.productId", "name")
    .populate("user", "email firstName lastName")
    .exec();
  res.status(200).json({ orders });
};

exports.updateOrder = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId, "orderStatus.type": req.body.type },
    {
      $set: {
        "orderStatus.$": [
          { type: req.body.type, date: new Date(), isCompleted: true },
        ],
      },
    }
  ).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      res.status(201).json({ order });
    }
  });
};

exports.getCustomerOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("items.productId", "name")
    .populate("user", "email firstName lastName")
    .exec();
  res.status(200).json({ orders });
};

exports.deleteOrder = (req, res) => {
  const { orderId } = req.params;
  if (orderId) {
    Order.deleteOne({ _id: orderId })
      .exec((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) {
          res.status(202).json({ message: `Order removed successfully! ${orderId}` });
        }
      });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};
