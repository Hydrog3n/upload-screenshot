var chevereto = exports;
var request   = require('request');
var fs        = require('fs');
var notifier  = require('node-notifier');

chevereto.response = null;
chevereto.shortlink = null;
chevereto.upload = function(service, path, callback) { 
  var formData = {
    upload: fs.createReadStream(path)
  };
  
  var form = {
    key: service.key ? service.key : undefined
  };

  request.post(service.urlapi, {formData: formData, form: form}, function (err, res, body) {
    if (err) {
      notifier.notify({
        'title': 'Error !',
        'message': err
      });
  
      return console.error('upload failed:', err);
    }
    
    chevereto.response = JSON.parse(body);

    if (chevereto.response.status_code !== 200) {
      return notifier.notify({
        'title': 'Error while updating screenshot!',
        'message': chevereto.response.status_txt
      });
    }
    
    chevereto.shortlink = chevereto.response.data.image_short_url;
    
    callback();
  });
};