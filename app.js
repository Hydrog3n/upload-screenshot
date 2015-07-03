var chokidar  = require('chokidar');
var request   = require('request');
var fs        = require('fs');
var copy      = require("copy-paste");
var notifier  = require('node-notifier');
var settings  = require('./settings.json');
var p         = require('path');

var watcher = chokidar.watch(settings.dir, {
  ignoreInitial: true,
  persistent: true
});

watcher
  .on('ready', function() { console.log('Initial scan complete. Ready for changes.'); })
  .on('raw', function(event, path, details) {
    fs.exists(path, function(exist){
      if (exist && ~['jpeg','jpg','png','gif','bmp','ico'].indexOf(p.extname(path).substring(1))) {
        var formData = {
          upload: fs.createReadStream(path)
        };
        if (settings.key !== "") {
          formData.key = settings.key;
        }
        request.post({url:settings.urlapi, formData: formData}, function (err, res, body) {
          if (err) {
            notifier.notify({
              'title': 'Error !',
              'message': err
            });
            return console.error('upload failed:', err);
          }
          var response = JSON.parse(body);
          if (response.status_code == 200) {
            var shortlink = response.data.image_short_url;
            copy.copy(shortlink, function() {
               notifier.notify({
                'title': 'Uploaded',
                'message': shortlink,
                'appIcon': __dirname + '/icones/up.png',
                'contentImage': path,
                'open': shortlink
              });
            });
          } else {
             notifier.notify({
                'title': 'Error !',
                'message': response.status_txt
              });
          }
        });
      }
    });
  
});