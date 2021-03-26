var express = require('express');
var router = express.Router();
var app= express();
var moment = require('moment');
var jquery = require('jquery');
var sendmail = require('sendmail');
var mail=require('../includes/sendmail');

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = require("mssql");
  var cardList = [];
  var itemList = [];

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

    request.query('select * from cards where Status < 999', function (err, recordset) {
        
        if (err) 
            console.log(err)
        else{
            for  (var i = 0; i< recordset.recordset.length; i++) {
              var card = {
                'title':recordset.recordset[i].Title,
                'text':recordset.recordset[i].Text,
                'date':moment(recordset.recordset[i].DateCreate).format('dd.mm.YYYY'),
                'id':recordset.recordset[i].Id,
                'categoryId':recordset.recordset[i].CategoryId
              }
              cardList.push(card);
            }

        }
    });

    var request = new sql.Request();

    request.query('select Id, CardId, name as ItemName, Type as ItemType, Content as ItemContent, DateCreate as ItemCreated, DateModified as ItemModified from Items where Status < 999', function (err, recordset) {
        
        if (err) 
            console.log(err)
        else{
            for  (var i = 0; i< recordset.recordset.length; i++) {
              var item = {
                'type': recordset.recordset[i].ItemType,
                'content': recordset.recordset[i].ItemContent,
                'date':moment(recordset.recordset[i].ItemCreated).format('dd.mm.YYYY'),
                'cardid':recordset.recordset[i].CardId,
                'id':recordset.recordset[i].Id
              }
              itemList.push(item);
            }
        }     
        res.render('cards', { cards: cardList, items: itemList, test:'testinger'});      
    });

  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var sql = require("mssql");

  mail.send('test');
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
    request.query("insert into Log (Module, Message) Values('"+ req.body.module  + "','" + mail.foo() + "')");
    console.log({'new card status':mail.foo()});
    res.send({'new card status':mail.foo()});

  });
});

module.exports = router;

