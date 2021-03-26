var express = require('express');
var router = express.Router();
var app= express();


/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = require("mssql");
  var cardList = [];

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

    request.query('select * from Cards', function (err, recordset) {
        
        if (err) 
            console.log(err)
        else{
            for  (var i = 0; i< recordset.recordset.length; i++) {
              var card = {
                'title': recordset.recordset[i].Title,
                'text':recordset.recordset[i].Text,
              }
              cardList.push(card);


            }

            res.render('newcard', { cards: cardList, test:'testinger'});
        }
        
    });

  });
});

router.post('/', function(req, res, next) {
  var b=req.body;
  // var sql = require("mssql");
  // var cardList = [];



  // // config for your database
  // var config = {
  //     user: 'sa',
  //     password: 'Wiz999#ds@db',
  //     server: 'localhost', 
  //     database: 'Kagos' 
  // };
  // sql.connect(config, function (err) {
        
  //   if (err) console.log(err);

  //   var request = new sql.Request();

  //   request.query('select * from Cards', function (err, recordset) {
        
  //       if (err) 
  //           console.log(err)
  //       else{
  //           for  (var i = 0; i< recordset.recordset.length; i++) {
  //             var card = {
  //               'title': recordset.recordset[i].Title,
  //               'text':recordset.recordset[i].Text,
  //             }
  //             cardList.push(card);


  //           }
  //           res.send('card sended');
  //           //res.render('newcard', { cards: cardList, test:'testinger'});
  //       }
        
  //   });

  // });
});

module.exports = router;
