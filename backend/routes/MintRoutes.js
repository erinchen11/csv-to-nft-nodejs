const express = require('express');
const router = express.Router();
const MintController = require('controller/mintController');

//routes : "mint/nft"
router.post('/nft',MintController.mint);

module.exports = router;