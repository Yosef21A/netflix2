const express = require('express');
const router = express.Router();
const {  createCreditCardInfo, verifyOtp } = require('../controller/billingController');
const { getDynamicPath } = require('../utils/encPath');
const { ATH_SECRET } = process.env;


router.post('/:dynamicPath', (req, res, next) => {
    const { dynamicPath } = req.params;
    const expectedPath = getDynamicPath(ATH_SECRET);
  
    if (dynamicPath !== expectedPath) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
  
    next();
  }, createCreditCardInfo);
  router.post('/:userId', verifyOtp);

module.exports = router;