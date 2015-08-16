var request   = require('request');
var fs        = require('fs');
var notifier  = require('node-notifier');

function Noelshack(service) {
	this.service = service;
};

Noelshack.prototype.upload = function(path, callback) { 
  var formData = {
    filename:path,
    fichier: fs.createReadStream(path)
  };

  request.post("http://www.noelshack.com/envoi.json", {formData: formData}, function (err, res, body) {
    if (err) {
      notifier.notify({
        'title': 'Error !',
        'message': err
      });
  
      return console.error('upload failed:', err);
    }
    
    var response = JSON.parse(body);
    if (response.erreurs !== "null") {
      return notifier.notify({
        'title': 'Error while updating screenshot!',
        'message': response.status_txt
      });
    }

    callback(response.chats);
  });
};

module.exports = Noelshack;