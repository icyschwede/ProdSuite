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

    request.query('select * from Cards where Status = 999', function (err, recordset) {
        
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
    var itemrecordset;

    request.query("insert into Items (CardId,Content,Type) Values('" + req.body.cardid + "','" + req.body.content + "','" + req.body.type +"'); SELECT SCOPE_IDENTITY() AS id;", (err, recordset, affected) => {
      res.send(recordset.recordset[0]);
    });
  });

});

router.put('/', function(req, res, next) {
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
    if (result) console.log("Result" + result);

    var request = new sql.Request();

    if(req.body.action==='itemChecked'){
      request.query("update Items set Checked='" + req.body.check +"' where id=" + req.body.id);
    }

    else{
      request.query("update Items set Content='" + req.body.content + "', DateModified=CURRENT_TIMESTAMP where id=" + req.body.id);
    }
  });
  res.send({'item changed':'ok'});
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

   request.query("update items set Status=999  where id=" + req.body.id);
  });
  res.send({'item deleted':'ok'});
});

module.exports = router;
