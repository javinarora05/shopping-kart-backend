const express = require("express");

const {
  registerCustomer,
  loginCustomer,
  getMyProfile,
  logoutCustomer,
  changePassword,
} = require("../controllers/customer.controllers");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();


router.post("/register", registerCustomer);

router.post("/login", loginCustomer);

router.get("/me", authMiddleware, getMyProfile);

router.post("/logout", authMiddleware, logoutCustomer);

router.patch("/change-password", authMiddleware, changePassword);

module.exports = router;