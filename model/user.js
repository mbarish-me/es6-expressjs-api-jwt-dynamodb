
let AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
let db = new AWS.DynamoDB({endpoint: 'http://localhost:8000',
    apiVersion: '2012-08-10'});

export const getUserByEmail = email => {
    let params = {
        ExpressionAttributeValues: {
            ':s': {S: email}
        },
        KeyConditionExpression: 'email = :s',
        // ProjectionExpression: 'first_name, last_name',
        // FilterExpression: 'contains (Subtitle, :topic)',
        TableName: 'USER'
    };

    return new Promise((res, rej) => {
        db.query(params, (err, data) => {
            if (err) {
                console.log(err, err.stack); // an error occurred
                rej(err);
            }
            else {
                let response = data.Items.map(item => AWS.DynamoDB.Converter.unmarshall(item));
                // console.log(response);
                res(response);
            }
        });
    });
}
