# Computer vision: Image Analyzing API

## Venkata Sai Koushik Koritala

## ID# 801135486

The Computer Vision service provides us with AI algorithms for processing images and returning information on their visual features.

**This API can be used for the following things:**

1. Celebrity Face Identification
2. Text Extraction
3. Brand Detection
4. Object Detection

For using the API for the things metioned above, We have four endpoints.

> **The Base URL for the API is,** <br/> > http://167.99.225.207:3000/api/v1/

<br/>

> **The API working can be observed at,** <br/> >[API Documentation Using Swagger](http://167.99.225.207:3000/api-docs/)

<br/>

**All the Endpoints in the API are `POST` requests that use the following request body which is in JSON format:**

```JavaScript
{
    "imageUrl" : "<< Your_Image_URL >>"
}
```

<br/>
<br/>

![How to use it?](https://media.giphy.com/media/26ufjEfPw3SZp5EQ0/giphy.gif)

<br/>
<br/>

## **Using the API with `POSTMAN`**

---

## 1. Celebrity Face Identification

<br/>

### Endpoint: `/identifyCeleb`

- Send a `POST` request to the url - `http://167.99.225.207:3000/api/v1/identifyCeleb`<br/>
  by using a request body as mentioned above.
- You will get a JSON as an output with the details about the celebrity in the Image. If no celebrity is identified, then the description of the image will be given as output.
- In the place of `<< Your_Image_URL >>` you can use the following example URL:<br/>

  > https://pyxis.nymag.com/v1/imgs/4e5/1f7/a917c50e70a4c16bc35b9f0d8ce0352635-14-tom-cruise.rsquare.w700.jpg

  ![celebpic1](./resources/pictures/celebpic_1.png)
  ![celeboutput1](./resources/pictures/celeb_1.png)

  > https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/celebrities.jpg

  ![celebpic2](./resources/pictures/celebpic_2.png)
  ![celeboutput2](./resources/pictures/celeb_2.png)

- If we pass a image URL which does not have a celebrity or if the API does not identify the celebrity then the output will be as following:

  > https://cdn.images.express.co.uk/img/dynamic/109/590x/world-smile-day-top-facts-about-smiling-863001.jpg

  ![celebpic3](./resources/pictures/celebpic_3.png)
  ![celeboutput3](./resources/pictures/celeb_3.png)

    <br/>
    <br/>
