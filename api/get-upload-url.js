// api/get-upload-url.js
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'eu-north-1',
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: 'fileName and fileType are required' });
    }

    const key = `uploads/${Date.now()}-${fileName}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET || 'ivling-app',
      Key: key,
      Expires: 60,
      ContentType: fileType,
    };

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);

    return res.status(200).json({ uploadUrl, key });
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return res.status(500).json({ error: 'Failed to generate upload URL' });
  }
};
