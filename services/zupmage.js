var request   = require('request');
var fs        = require('fs');
var notifier  = require('node-notifier');

function Zupmage(service) {
  this.service = service;
}

Zupmage.prototype.upload = function(path, callback) {

  var formData = {
    f: fs.createReadStream(path),
    k: this.service.k,
    prive: this.service.prive
  };

  request.post("http://www.zupmage.eu/api", {formData: formData}, function (err, res, body) {
    if (err) {
      notifier.notify({
        'title': 'Error !',
        'message': err
      });

      return console.error('upload failed:', err);
    }

    var response = JSON.parse(body);

    if (response.error !== false) {
      return notifier.notify({
        'title': 'Error while updating screenshot!',
        'message': response.error
      });
    }

    callback(response.url.viewer);
  });
};

module.exports = Zupmage;
