var express = require('express'); 
var fs = require('fs');
var app = express();
var serveIndex = require('serve-index');

// revoke access to all txt files
app.use('*.txt', (req,res) => {
    res.status(403).send('HTTP 403: permission denied');
});

var taunts = [
    'nope',
    'Nice try!',
    'Almost there!',
    'Seriously? :D',
    'Come on, you can find it.',
    'I\'m not asking for your Windows password...'
    ]

// password verification API
app.use('/password', (req, res) => {
    var pwd = req.query.value;
    var taunt = taunts[Math.floor(Math.random() * taunts.length)];
    if(solutions.includes(pwd)) {
        res.end(JSON.stringify({ 'success': 'ok', 'url': '/' + pwd}));
    } else {
        res.end(JSON.stringify({ 'success': 'no', 'message': taunt}));
    }
});

// common assets
app.use('/assets', express.static(__dirname + '/www/assets/'));


var lastSolution = '';
var solutions = [''];
var registerPuzzle = (folder, solution) => {
    var lastSolution = '/' + solutions[solutions.length - 1];
    console.log('registring folder ' + folder + ' to url ' + lastSolution + ' with password ' + solution);
    app.use(lastSolution, express.static(__dirname + '/www/puzzles/' + folder));
    app.use(lastSolution, serveIndex(__dirname + '/www/puzzles/' + folder))
    solutions.push(solution);
}

// puzzle registration
registerPuzzle('hardcoded/', 'password123');
registerPuzzle('base64/', 'ServiceForever');

// TODO: register your puzzles here

registerPuzzle('pathTraversal/', 'atanu');
registerPuzzle('finale/', 'congrats'); // final congrats page with the archive password


// helper method to serve files
app.get('/getFile', (req, res) => {
    console.log(req.query.fileName);
    
    fs.readFile(__dirname + '/www/' + req.query.fileName, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            console.log('received data: ' + data);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        } else {
            res.status(404).send('HTTP 404: not found');
        }
    });
})

var port = 8080;
var server = app.listen(port);
console.log('Express app started on port ' + port);