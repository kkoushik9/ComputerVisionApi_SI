'use strict';

const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
const request = require('request');
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jwt= require('jsonwebtoken');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const key = 'c3866e1a47e44afdb7ba4722e53db5cd';
const endpoint = 'https://koushikkoritala.cognitiveservices.azure.com/';

const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

    function computerVision() {
        async.series([
          async function () {},
          function () {
            return new Promise((resolve) => {
              resolve();
            })
          }
        ], (err) => {
          throw (err);
        });
      }
      
      computerVision();




//________________________________________________________________________________________________________________________________________________________________________________________


// imageUrl = "https://pyxis.nymag.com/v1/imgs/4e5/1f7/a917c50e70a4c16bc35b9f0d8ce0352635-14-tom-cruise.rsquare.w700.jpg"

// imageUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/celebrities.jpg"

/**
* @swagger
* /api/v1/identifyCeleb:
*   post:
*     description: This api can be used to identify a Celebrity. Just pass the image URL of an online image of a celebrity and you will receive an output with the corresponding details. For Example try passing this image url https://pyxis.nymag.com/v1/imgs/4e5/1f7/a917c50e70a4c16bc35b9f0d8ce0352635-14-tom-cruise.rsquare.w700.jpg
*     parameters:
 *       - name: imageUrl
 *         in: formData
 *         type: string
 *         required: true     
*     responses:
*       '200':
*         description: Everything is alright
*       '400':
*         description: Client side error
*       '500':
*         description: Server side error
*/
router.post('/identifyCeleb',urlencodedParser, async function(req, res){
    if (req.body) {
        if (req.body.imageUrl) {
          
          const imageUrl = req.body.imageUrl;
          let caption ;
          try{
           caption = (await computerVisionClient.describeImage(imageUrl)).captions[0];
          } catch (err) {
            res.status(err.statusCode).send(err.code);
            throw err;
          } finally {
          res.status(200).json(caption.text);
          }
        }
        else{
          res.send("Bad request please enter a valid url");
      } 
    }
    else{
        res.send("Bad request");
    }  
});



//________________________________________________________________________________________________________________________________________________________________________________________


// imageUrl = "https://ocr-demo.abtosoftware.com/uploads/handwritten2.jpg"

// imageUrl = "https://moderatorsampleimages.blob.core.windows.net/samples/sample2.jpg"



/**
* @swagger
* /api/v1/readText:
*   post:
*     description: This api can be used to read engilsh text in a given image. Just pass the image URL of an online image of a printed or handwritten and you will receive an output with the corresponding details. For Example try passing this image url https://ocr-demo.abtosoftware.com/uploads/handwritten2.jpg
*     parameters:
 *       - name: imageUrl
 *         in: formData
 *         type: string
 *         required: true     
*     responses:
*       '200':
*         description: Everything is alright
*       '400':
*         description: Client side error
*       '500':
*         description: Server side error
*/
router.post('/readText',urlencodedParser, async function(req, res){
    if (req.body) {
        if (req.body.imageUrl) {
          const imageUrl = req.body.imageUrl;
          let printedText
          try{
          printedText = (await readTextFromURL(computerVisionClient, imageUrl));
          }
          catch (err){
            res.status(err.statusCode).send(err.code);
            throw err;
          } finally {
            const now = toText(printedText[0].lines)
            if(now.length == 0 )
            res.send("There is no text to read.")
            else{
          res.status(200).json(now);
            }
          }
        }
        else{
          res.send("Bad request please enter a valid url");
      } 
    }
    else{
        res.send("Bad request");
    }  
});

function toText(out){
  let result = [];
  if(out.length != 0)
  for (let i = 0 ; i<out.length ; i++){
    result[i] = out[i].text;
  }
  return result;
}


//________________________________________________________________________________________________________________________________________________________________________________________

// imageUrl = "https://www.swagshirts99.com/wp-content/uploads/2020/05/777fe3eb-8e63-49c2-979c-f12f0f1c7c48.jpg" ;
// imageUrl = "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/zxgvvbflzw529uvanto4/air-zoom-structure-22-running-shoe-jR46t0.jpg" ;


/**
* @swagger
* /api/v1/detectBrand:
*   post:
*     description: This api can be used to detect well known brand logos in a given image. Just pass the image URL of an online image of a product or anything with the brand logo on it and you will receive an output with the corresponding details. For Example try passing this image url https://www.swagshirts99.com/wp-content/uploads/2020/05/777fe3eb-8e63-49c2-979c-f12f0f1c7c48.jpg  and  
*     parameters:
 *       - name: imageUrl
 *         in: formData
 *         type: string
 *         required: true     
*     responses:
*       '200':
*         description: Everything is alright
*       '400':
*         description: Client side error
*       '500':
*         description: Server side error
*/
router.post('/detectBrand',urlencodedParser, async function(req, res){
  if (req.body) {
      if (req.body.imageUrl) {
        const imageUrl = req.body.imageUrl;
        let brands;
        try{
        brands = (await computerVisionClient.analyzeImage(imageUrl, { visualFeatures: ['Brands'] })).brands;
        }
        catch (err){
          res.status(err.statusCode).send(err.code);
          throw err;
        } finally {
          const now = listBrands(brands);
          if(now.length == 0)
          res.send("No brands were detected.")
          else
        res.status(200).json(now);
        }
      }
      else{
        res.send("Bad request please enter a valid url");
    } 
  }
  else{
      res.send("Bad request");
  }  
});


function listBrands(brands){
  let result = [];
  if(brands.length != 0)
  for (let i = 0 ; i<brands.length ; i++){
    result[i] = brands[i].name;
  }
  return result;
}



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const STATUS_SUCCEEDED = "succeeded";
const STATUS_FAILED = "failed"
async function readTextFromURL(client, url) {
  let result = await client.read(url);
  let operation = result.operationLocation.split('/').slice(-1)[0];
  while (result.status !== STATUS_SUCCEEDED) { await sleep(1000); result = await client.getReadResult(operation); }
  return result.analyzeResult.readResults; 
}

//________________________________________________________________________________________________________________________________________________________________________________________


// imageUrl = "https://www.exposit.com/media/images/Object_detection_for_traffic_analysis.original.original.png"

// imageUrl = "https://st4.depositphotos.com/13349494/27426/i/600/depositphotos_274265420-stock-photo-single-opened-tube-red-lipstick.jpg"

/**
* @swagger
* /api/v1/detectObject:
*   post:
*     description: This api can be used for object detection. We just need to pass the image url which we want to use and the api will give us the required output. We can use the following example https://www.exposit.com/media/images/Object_detection_for_traffic_analysis.original.original.png
*     parameters:
 *       - name: imageUrl
 *         in: formData
 *         type: string
 *         required: true     
*     responses:
*       '200':
*         description: Everything is alright
*       '400':
*         description: Client side error
*       '500':
*         description: Server side error
*/
router.post('/detectObject',urlencodedParser, async function(req, res){
  if (req.body) {
      if (req.body.imageUrl) {
        const imageUrl = req.body.imageUrl;
        let objects;
        try{
        objects = (await computerVisionClient.analyzeImage(imageUrl, { visualFeatures: ['Objects'] })).objects;
        }
        catch (err){
          res.status(err.statusCode).send(err.code);
          throw err;
        } finally {
          const out = toListOfObjects(objects);
            if(out.length == 0)
            res.send("There are no objects in the image.")
            else
        res.status(200).json(out);
        }
      }
      else{
        res.send("Bad request please enter a valid url");
    } 
  }
  else{
      res.send("Bad request");
  }  
});

function toListOfObjects(items){
  let result = [];
  if(items.length != 0)
  for (let i = 0 ; i<items.length ; i++){
    result[i] = items[i].object;
  }
  return result;

}


//________________________________________________________________________________________________________________________________________________________________________________________



module.exports = router;