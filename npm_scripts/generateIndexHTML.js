var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var inputPath = path.join(process.cwd(), '/src/views/index.ejs');
var data = {
  html: '',
};

var content = ejs.compile(fs.readFileSync(inputPath, 'utf8'), { filename: inputPath })(data);

fs.writeFile('./public/index.html', content, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log('index.html was generated!');
});
