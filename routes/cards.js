var express = require('express');
var router = express.Router();
var app= express();
var moment = require('moment');
var jquery = require('jquery');

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

    request.query('select * from cards where Status < 999 ORDER BY Position', function (err, recordset) {
        
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

    request.query('select Id, CardId, name as ItemName, Type as ItemType, Content as ItemContent, DateCreate as ItemCreated, DateModified as ItemModified, Checked from Items where Status < 999', function (err, recordset) {
        
        if (err) 
            console.log(err)
        else{
            for  (var i = 0; i< recordset.recordset.length; i++) {
              var item = {
                'type': recordset.recordset[i].ItemType,
                'content': recordset.recordset[i].ItemContent,
                'date':moment(recordset.recordset[i].ItemCreated).format('dd.mm.YYYY'),
                'cardid':recordset.recordset[i].CardId,
                'id':recordset.recordset[i].Id,
                'checked':recordset.recordset[i].Checked
              }
              itemList.push(item);
            }
        }     
        res.render('cards', { cards: cardList, items: itemList, test:'testinger'});      
    });

  });
});

module.exports = router;

