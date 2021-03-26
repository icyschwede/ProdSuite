var express = require('express');
var mail = require('../includes/sendmail');
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

    request.query('select * from Cards where Status < 999', function (err, recordset) {
        
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
  console.log(req.body);
  var sql = require("mssql");
  var cardList = [];
  var foo=mail.foo();
  // config for your database
  var config = {
      user: 'sa',
      password: 'Wiz999#ds@db',
      server: 'localhost', 
      database: 'Kagos' 
  };
  sql.connect(config, function (err,result) {
        
    if (err) console.log(err);
    if (result) console.log("Result" + result);
    var request = new sql.Request();
    request.query("insert into Cards (Title, CategoryId) Values('"+ req.body.text  + "','" + req.body.categoryId + "'); SELECT SCOPE_IDENTITY() AS id;", (err, recordset, affected) => {
    });

    res.send({'new card status':'ok'});

  });
});

router.put('/', function(req, res, next) {
  console.log(req.body);
  var sql = require("mssql");
  var cardList = [];

  var foo=mail.foo();


  // config for your database
  var config = {
      user: 'sa',
      password: 'Wiz999#ds@db',
      server: 'localhost', 
      database: 'Kagos' 
  };
  sql.connect(config, function (err,result) {
        
    if (err) console.log(err);
    if (result) console.log("Result" + result);

    var request = new sql.Request();

    request.query("update Cards set Title='" + req.body.title + "', Text='" + req.body.text + foo + "' where id=" + req.body.id);
  });
  res.send({'card updated':'ok'});
});
router.delete('/', function(req, res, next) {
  console.log(req.body);
  var sql = require("mssql");
  var cardList = [];



  // config for your database
  var config = {
      user: 'sa',
      password: 'Wiz999#ds@db',
      server: 'localhost', 
      database: 'Kagos' 
  };

  sql.connect(config, function (err,result) {
        
    if (err) console.log(err);

    var request = new sql.Request();

   request.query("update Cards set Status=999  where id=" + req.body.id);

   res.send({'archive card status':'ok'});
  });

});

module.exports = router;
