var chokidar  = require('chokidar');
var fs        = require('fs');
var watcher = chokidar.watch('data', {
  ignoreInitial: true,
  persistent: true,
  ignored: /[\/\\]\./ //ignore dotfiles
});

exports['addfile'] = function(test) {
  console.log(watch());
  move();
  test.ok(true, ["File is an image and is detected"]);
  test.done();
};

var move = function() {
  fs.createReadStream('images/test.png').pipe(fs.createWriteStream('data/test.png'));
};

var watch = function() {
  watcher.on('add', function(path) {
    if(!isPicture(path))
      return false;

    fs.exists(path, function(exist) {
      if(!exist)
        return false;

      return false;
    });
  });
};

var isPicture = function(path) {
  return !!~['jpeg','jpg','png','gif','bmp','ico']
    .indexOf(p.extname(path).substring(1));
};