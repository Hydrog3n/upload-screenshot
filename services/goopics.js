var request   = require('request');
var fs        = require('fs');
var notifier  = require('node-notifier');

function Goopic(service) {
  this.service = service;
}

Goopic.prototype.upload = function(path, callback) {

  var url = this.service.url;
  
  var formData = {
    image: fs.createReadStream(path),
    direct: "true"
  };


  request.post({url: url, formData: formData}, function (err, res, body) {
    if (err) {
      notifier.notify({
        'title': 'Error !',
        'message': err
      });
      return console.error('upload failed:', err);
    }

    var response = body;

    if (response === 'Aucune image soumise') {
      return notifier.notify({
        'title': 'Error while updating screenshot!',
        'message': response
      });
    }

    callback(body);
  });
};

module.exports = Goopic;
