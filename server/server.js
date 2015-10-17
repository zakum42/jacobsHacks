var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var config = require('./config');
var app = express();
var braintree = require("braintree");
var aws = require("aws-lib");
var beautifier = require("beautifier");

var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: config.merchantId,
    publicKey: config.publicKey,
    privateKey: config.privateKey
});

function getProductData() {


    // return result ;
    return 1;
}


var baseproductASIN = "B00IK01PJC";
var baseproductASIN = "B00JLT24BY";
var baseproductASIN2 = "B00C2QNGYC";

app.use(bodyParser.json());

app.get('/nextProduct', function(req, res, next) {
    console.log('Hi from express!');
    var data = getProductData();
    console.log(data);

    prodAdv = aws.createProdAdvClient(config.accessKeyId, config.secretAccessKey, config.associateTag);

    prodAdv.call("SimilarityLookup", {
        ItemId: baseproductASIN2,
        MerchantId: "Amazon",
        SimilarityType: "Random",
        ResponseGroup: "Request,Similarities,Images"
    }, function (err, result) {
        var items = result.Items['Item'];
        var randItem = items[Math.floor((Math.random() * items.length))];
        var imageURL = randItem.LargeImage.URL;
        console.log(JSON.stringify(imageURL));
        r = {imageURL: imageURL};
        res.status(200).json(randItem);
    });
});

http.createServer(app).listen(8080);