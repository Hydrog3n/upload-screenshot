var chokidar  = require('chokidar');
var request   = require('request');
var fs        = require('fs');
var copy      = require("copy-paste");
var notifier  = require('node-notifier');
var settings  = require('./settings.json');
var p         = require('path');
var debug     = require('debug')('upload-screenshot');
var async     = require('async');

var watcher = chokidar.watch(settings.dir, {
  ignoreInitial: true,
  persistent: true,
  ignored: /[\/\\]\./ //ignore dotfiles
});

var q = async.queue(function(task, callback) {
  callback();
}, 1);

function isPicture(path) {
  return !!~['jpeg','jpg','png','gif','bmp','ico']
    .indexOf(p.extname(path).substring(1));
}

watcher.on('add', function(path) {
  if(!isPicture(path))
    return;

  q.push({name:'exist'}, fs.exists(path, function(exist) {
    if(!exist) 
      return;
  }));
  
  q.push({name:'request'}, function() {
    
    var formData = {
      upload: fs.createReadStream(path)
    };

    var form = {
      key: settings.key ? settings.key : undefined
    };

    debug('Posting picture from path %s to url %s', path, settings.urlapi)

    request.post(settings.urlapi, {formData: formData, form: form}, function (err, res, body) {

      if (err) {
        notifier.notify({
          'title': 'Error !',
          'message': err
        });

        return console.error('upload failed:', err);
      }

      var response = JSON.parse(body);

      if (response.status_code !== 200) {
        return notifier.notify({
          'title': 'Error while updating screenshot!',
          'message': response.status_txt
        });

      }

      var shortlink = response.data.image_short_url;

      //copy to clipboard
      copy.copy(shortlink, function() {
        notifier.notify({
          'title': 'Uploaded',
          'message': shortlink,
          'appIcon': __dirname + '/icones/up.png',
          'contentImage': path,
          'open': shortlink
        });
      });
    });
  })
})
