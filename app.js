var chokidar  = require('chokidar');
var copy      = require("copy-paste");
var notifier  = require('node-notifier');
var fs        = require('fs');
var settings  = require('./settings.js').settings;
var p         = require('path');
var debug     = require('debug')('upload-screenshot');
var async     = require('async');

var service = settings.services[settings.used]; 

var watcher = chokidar.watch(settings.dir, {
  ignoreInitial: true,
  persistent: true,
  ignored: /[\/\\]\./ //ignore dotfiles
});

try { 
  var Serv = require('./services/'+service.name);
  var s = new Serv(service);  
  
} catch(e) {
  console.error(e);
  process.exit(1); 
}

var q = async.queue(function(path, callback) {
  s.upload(path, function(shortlink){
    copyShortLink(shortlink, path);
    callback();
  });
}, 1);

function copyShortLink(shortlink, path) {

  copy.copy(shortlink, function() {
    
    notifier.notify({
      'title': 'Uploaded',
      'message': shortlink,
      'appIcon': __dirname + '/icones/up.png',
      'contentImage': path,
      'open': shortlink
    });
  });
}

function isPicture(path) {
  return !!~['jpeg','jpg','png','gif','bmp','ico']
    .indexOf(p.extname(path).substring(1));
}

watcher.on('add', function(path) {
  if(!isPicture(path))
    return;

  fs.exists(path, function(exist) {
    if(!exist) 
      return;
      
    q.push(path);
  });   
});
