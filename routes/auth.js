const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi")

//! LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({username: req.body.username})
    !user && res.status(400).json({
      success: false,
      message: "Something went wrong!"
    })

    const validate = await bcrypt.compare(req.body.password, user.password)
    !validate && res.status(400).json({
      success: false,
      message: "Something went wrong!"
    })

    const {password, ...others} = user._doc;

    res.status(200).json(
      {
        success: true,
        data: {others},
      })
  } catch (err) {
    res.status(500).json(
      {
        success: true,
        message: err
      })
  }
})

module.exports = router;
