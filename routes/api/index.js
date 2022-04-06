const router = require("express").Router();
const reactionRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

router.use("/reactions", reactionRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
