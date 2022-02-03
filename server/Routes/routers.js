const express = require("express");
const router = express.Router();
const { ValidMobileStep1, ValidEmailStep2, ValidPAN } = require('../Modules/Auth/index.js');
const { UserLogin } = require('../Modules/Auth/index');

router.post('/validMobileStep1', ValidMobileStep1)
router.post('/validEmailStep2', ValidEmailStep2)
router.post('/validPAN', ValidPAN)
router.post('/userLogin', UserLogin)

// Export All Routers
module.exports = router
