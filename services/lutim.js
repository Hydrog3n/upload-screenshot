var request   = require('request');
var fs        = require('fs');
var notifier  = require('node-notifier');

function Lutim(service) {
  this.service = service;
}

Lutim.prototype.upload = function(path, callback) {

  var nameFileArray = path.split('/');
  var nameFile = nameFileArray[nameFileArray.length - 1];
  var url = this.service.url;

  var formData = {
    file: fs.createReadStream(path),
    filename: nameFile,
    format: 'json'
  };

  request.post({url: url, formData: formData}, function (err, res, body) {
    if (err) {
      notifier.notify({
        'title': 'Error !',
        'message': err
      });

      return console.error('upload failed:', err);
    }

    var response = JSON.parse(body);

    if (response.success !== true) {
      return notifier.notify({
        'title': 'Error while updating screenshot!',
        'message': response.success
      });
    }

    var ext = response.msg.filename.split('.').pop();
    var urlShort = url + response.msg.short + '.' + ext;
    callback(urlShort);
  });
};

module.exports = Lutim;
