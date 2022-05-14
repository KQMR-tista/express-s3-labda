const express = require('express')
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3');
const bodyParser = require('body-parser')

require("dotenv").config()

const app = express();

app.use(bodyParser.json())

app.listen(8000);

// add these to the .env file
aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION,

});
const BUCKET = process.env.BUCKET

const s3 = new aws.S3();


/*  Example GET request to http://localhost:8000/testData/TC-1514
    Returns the data.json
 */


app.get("/testData/:foldername", async (req, res) => {
    const folderName = req.params.foldername;
    console.log(folderName)
    let x = await s3.getObject({ Bucket: BUCKET, Key: "static-data/tests/" + folderName + "/data.json" }).promise();
    res.send(x.Body)
})