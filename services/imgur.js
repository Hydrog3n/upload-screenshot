var img      = require('imgur');
var notifier = require('node-notifier');

function Imgur(service) {
  this.service = service;
}

Imgur.prototype.upload = function(path,callback) {

  img.setClientId(this.service.clientId);

  img.uploadFile(path)
    .then(function (json) {
    callback(json.data.link);
    })
    .catch(function (err) {
      console.error(err);
      notifier.notify({
        'title': 'Error !',
        'message': err
      });
    });
};

module.exports = Imgur;
