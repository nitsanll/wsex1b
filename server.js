var express = require('express');
var app = express();
var grades = require('./stud_grades');
var port = process.env.PORT || 3000;

app.set('port', port);
app.use('/',express.static('./public'));
app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.set('json spaces', 4);
    res.set("Content-Type", "application/json");
    next();
});

app.get('/getAllStud', function(req,res){
  grades.getAllStud(function(data){
    res.json(data);
  });
});

app.get('/getStudById/:studId', function(req,res){
  grades.getStudById(req.params.studId, function(data){
    res.json(data); 
  });
});

app.get('/getStudByYear/:year', function(req,res){
  var a;
  grades.getStudByYear(req.params.year, function(data){
    res.json(data);
    a = data;
  });
  console.log('>><><' + a);
});

app.listen(port);
console.log('listening on port ' + port);
