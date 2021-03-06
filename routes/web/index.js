const express = require('express');
const router = express.Router();
const studentRouter = require('../../routes/web/students')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/students', studentRouter);

module.exports = router;
