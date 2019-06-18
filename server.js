var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var path = require('path');
var fs = require('fs');
var gm = require('gm').subClass({imageMagick: true});
var FroalaEditor = require('./node_modules/wysiwyg-editor-node-sdk/lib/froalaEditor.js');
var port = 3003;

app.use(express.static(__dirname + '/'));
app.use('/bower_components',  express.static(path.join(__dirname, '../bower_components')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/get_signature', function (req, res) {
  var configs = {
    // The name of your bucket.
    bucket: 'navneetnagpal',

    // S3 region. If you are using the default us-east-1, it this can be ignored.
    region: 's3',

    // The folder where to upload the images.
    keyStart: 'images',

    // File access.
    acl: 'public-read',

    // AWS keys.
    accessKey: 'YOUR ACCESS KEY',
    secretKey: 'YOUR SECRET KEY'
  }

  var s3Hash = FroalaEditor.S3.getHash(configs);

  res.send(s3Hash);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))