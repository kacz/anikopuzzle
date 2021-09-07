module.exports = function (app) {
    var fs = require('fs');

     // helper method to serve files for puzzle documents
     app.get('/getDocument', (req, res) => {
         console.log(req.query.id);
         const path = __dirname + '/files/' + req.query.id + '.txt';
         console.log("opening " + path);
         
         fs.readFile(path, {encoding: 'utf-8'}, function(err,data){
             if (!err) {
                 console.log('received data: ' + data);
                 res.writeHead(200, {'Content-Type': 'text/plain'});
                 res.write(data);
                 res.end();
             } else {
                 res.status(404).send('HTTP 404: not found');
             }
         });
     });

};