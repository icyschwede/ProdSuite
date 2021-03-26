module.exports = {
  foo: function () {
    return ('foofoofoo');
  },
  bar: function () {
    // whatever
  },
  send: function(text){
    const sendmail = require('sendmail')();
 
    sendmail({
    from: 'icyschwede@gmail.com',
    to: 'cards@kagos-it.com',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});
  }
  
};
