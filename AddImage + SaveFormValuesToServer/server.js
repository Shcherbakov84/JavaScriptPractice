var express         = require('express');
var path            = require('path');
var app = express();

app.use(express.logger('dev'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(app.router);
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next){
    res.status(404);
    console.log('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    console.log('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.get('/testApi', function (req, res) {
    res.send('{"result": "API is running"}');
});

app.post('/api/save', function(req, res) {
    var article = {
        name: req.body.name,
        url: req.body.url,
        description: req.body.description,
        date: req.body.date
    };
    console.log(article);
    res.send('Data is Saved');
});

app.listen("1337", function(){
    console.log('Express server listening on port 1337');
});

