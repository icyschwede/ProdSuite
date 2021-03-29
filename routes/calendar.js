var express = require('express');
var router = express.Router();
var app= express();
var moment = require('moment');
var jquery = require('jquery');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = require("mssql");
  var calendarList = [];

  // config for your database
  var config = {
      user: 'sa',
      password: 'Wiz999#ds@db',
      server: 'localhost', 
      database: 'Kagos' 
  };
  sql.connect(config, function (err) {
        
    if (err) console.log(err);

    var request = new sql.Request();

    request.query('select * from calendarItems', function (err, recordset) {
        
        if (err) 
            console.log(err)
        else{
            for  (var i = 0; i< recordset.recordset.length; i++) {
              var item = {
                'id':recordset.recordset[i].Id,
                'description':recordset.recordset[i].Description,
                'startDate':recordset.recordset[i].StartDate,
              }
              calendarList.push(item);
            }
            res.render('calendar', { calendarItems: calendarList});  
        }
    });

    


  });
});

module.exports = router;

