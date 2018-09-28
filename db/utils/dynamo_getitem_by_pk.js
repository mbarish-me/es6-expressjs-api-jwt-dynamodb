
var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
var config = require('./../../config/env');
var db = new AWS.DynamoDB.DocumentClient({endpoint: 'http://localhost:8000',
    apiVersion: '2012-08-10'});

var params = {
    TableName: 'USER',
    KeyConditionExpression: '#email = :email',
    ExpressionAttributeNames: {
        '#email': 'email'
    },
    ExpressionAttributeValues: {
        ":email": 'user2@mail.com'
    },
};


// console.log(process.env);
db.query(params, function(err, data) {

    if (err) console.log(err, err.stack); // an error occurred
    else {
        console.log(data);
    }
});