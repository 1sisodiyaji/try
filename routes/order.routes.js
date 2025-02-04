const express = require("express");
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require("../controller/order.controller");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.post("/create",authMiddleware, createOrder);
router.get("/get-all-order", getAllOrders);
router.get("/get-order-id", getOrderById);
router.put("/update-order", updateOrder);
router.delete("/delete-order", deleteOrder);

module.exports = router;