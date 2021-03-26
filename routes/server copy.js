var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = require("mssql");

  // config for your database
  var config = {
      user: 'sa',
      password: 'Wiz999#ds@db',
      server: 'localhost', 
      database: 'Kagos' 
  };
  (async function () {
      try {
          let pool = await sql.connect(config)
          let result1 = await pool.request()
              .query('select * from Cards')
              
          console.dir(result1)
          res.render('server', { title: result1 });
          let res1='testinger';
      
      } catch (err) {
          
          console.dir(err.message);
      }
  })()
   
  sql.on('error', err => {
      // ... error handler
  })

});

module.exports = router;
