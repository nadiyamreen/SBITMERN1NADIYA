const express = require("express");
const router = express.Router();

const {
  createManagement,
  getManagements,
  updateManagement,
  deleteManagement,
} = require("../controllers/managementController");

const {
  verifyToken,
  roleCheck,
} = require("../middleware/authMiddleware");



// ADD management → management only
router.post(
  "/management",
  verifyToken,
  roleCheck("management", "create"),
  createManagement
);

// VIEW management → all roles
router.get(
  "/managements",
  verifyToken,
  roleCheck("management", "read"),
  getManagements
);

// UPDATE management → management only
router.put(
  "/management/:id",
  verifyToken,
  roleCheck("management", "update"),
  updateManagement
);

// DELETE management → management only
router.delete(
  "/management/:id",
  verifyToken,
  roleCheck("management", "delete"),
  deleteManagement
);

module.exports = router;