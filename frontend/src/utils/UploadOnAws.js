import AWS from "aws-sdk";

const BUCKET_NAME = process.env.REACT_APP_AWS_BUCKET_NAME;
const IAM_USER_KEY = process.env.REACT_APP_AWS_IAM_USER_KEY;
const IAM_USER_SECRET = process.env.REACT_APP_AWS_IAM_USER_SECRET;

let s3Bucket = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET,
  Bucket: BUCKET_NAME,
});

function generateUniqueFileName(originalName) {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 20);
  const fileExtension = originalName.split(".").pop();
  return `ElectroCart${timestamp}-${randomString}.${fileExtension}`;
}

export const uploadProductImageOnAws = async (selectedFiles) => {
  if (selectedFiles.length > 0) {
    // setIsLoading(true);
    const s3Urls = [];

    try {
      for (const file of selectedFiles) {
        const newFileName = generateUniqueFileName(file?.name);
        // console.log("newFileName - ", newFileName);

        const params = {
          Bucket: BUCKET_NAME,
          Key: newFileName,
          Body: file,
          // ACL: "public-read",
        };

        const s3response = await new Promise((resolve, reject) => {
          s3Bucket.upload(params, (err, s3response) => {
            if (err) {
              console.log(`Something went wrong -- \n`, err);
              reject(err);
            } else {
              //   console.log("Image URL - ", s3response.Location);
              resolve(s3response.Location);
            }
          });
        });

        s3Urls.push(s3response);
      }

      return s3Urls;
    } catch (error) {
      console.log(`uploadProductImageOnAws Error ${error}`);
    }
  }
};

export const uploadImageOnAws = async (fileName) => {
  try {
    const newFileName = generateUniqueFileName(fileName?.name);
    // console.log("newFileName - ", newFileName);

    const params = {
      Bucket: BUCKET_NAME,
      Key: newFileName,
      Body: fileName,
      // ACL: "public-read",
    };

    const s3response = await new Promise((resolve, reject) => {
      s3Bucket.upload(params, (err, s3response) => {
        if (err) {
          console.log(`Something went wrong -- \n`, err);
          reject(err);
        } else {
          //   console.log("Image URL - ", s3response.Location);
          resolve(s3response.Location);
        }
      });
    });

    return s3response;
  } catch (error) {
    console.log(`uploadProductImageOnAws Error ${error}`);
  }
};
