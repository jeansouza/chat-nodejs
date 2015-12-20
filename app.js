var express = require('express'),
    load = require('express-load'),
    path = require('path'),
    app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

module.exports = app;

app.listen(3000, function() {
  console.log("Ntalk no ar!");
});
