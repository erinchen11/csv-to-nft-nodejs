const express = require('express');
const router = express.Router();
const fileController = require('controller/fileController');

//routes: "/resolve/csv"
router.post('/csv',fileController.preview);


module.exports = router;