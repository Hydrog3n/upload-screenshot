var request   = require('request');
var fs        = require('fs');
var notifier  = require('node-notifier');

function Chevereto(service) {
	this.service = service;
};

Chevereto.prototype.upload = function(path, callback) { 
  var formData = {
    upload: fs.createReadStream(path)
  };
  
  var form = {
    key: this.service.key ? this.service.key : undefined
  };
  
  request.post(this.service.urlapi, {formData: formData, form: form}, function (err, res, body) {
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

    callback(response.data.image_short_url);
  });
};

module.exports = Chevereto;