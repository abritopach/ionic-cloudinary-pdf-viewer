var express = require('express');
var router = express.Router();

var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'CLOUD_NAME',
  api_key: 'API_KEY',
  api_secret: 'API_SECRET'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST number pages PDF. */
router.post('/numberPagesPDF', (req, res) => {
  console.log(req.body);
  let pdf = req.body.pdf;
  console.log('pdf', pdf);
  cloudinary.v2.api.resource(pdf, {pages: true}, (error, result) => {

    if(error) {
      return res.status(500).json({
          title: 'An error has occured.',
          error: error
      });
    }
    console.log(result.pages);
    res.status(201).json(
      { pages: result.pages }
    );
    return
  });
});


module.exports = router;
