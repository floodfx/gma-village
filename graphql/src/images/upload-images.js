var Storage = require('@google-cloud/storage');
var config = require('../config');
var uuid = require('node-uuid');
var mime = require('mime-types');

const CLOUD_BUCKET = config.get('GOOGLE_CLOUD_BUCKET');

const storage = Storage({
  projectId: config.get('GOOGLE_PROJECT_ID')
});

const bucket = storage.bucket(CLOUD_BUCKET)

function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

function sendUploadToGCS (req, res, next) {
  if (!req.files.file) {
    return next();
  }

  var extension = mime.extension(req.files.file.mimetype);
  extension = extension ? `.${extension}` : ''
  const gcsname = `gma/${uuid.v1()}${extension}`
  const file = bucket.file(gcsname);

  file.save(req.files.file.data, {
    metadata: {
      contentType: req.files.file.mimetype
    }
  }, (err) => {
    if(err) {
      req.files.file.cloudStorageError = err;
    } else {
      req.files.file.cloudStorageObject = gcsname;
      req.files.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    }
    next();
  });

}


module.exports = {
  getPublicUrl,
  sendUploadToGCS
};
