const express = require("express");
const router = express.Router();
const middleWare = require("../middlewares/sv");
const validateRequest = middleWare(true);

// generic route handler
const genericHandler = (req, res, next) => {
  res.json({
    status: "success",
    data: req.body,
  });
};

// create a new teacher or student
router.post("/people", validateRequest, genericHandler);

// change auth credentials for teachers
router.post("/auth/edit", validateRequest, genericHandler);

// accept fee payments for students
router.post("/fees/pay", validateRequest, genericHandler);

module.exports = router;
