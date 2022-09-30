const { Router } = require('express');

const imageController = require('../controllers/image');

const router = Router();


/* GET flickr images */
router.get('/',  imageController.getAllImages);


module.exports = router;
