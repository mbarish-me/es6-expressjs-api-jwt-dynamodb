# Boiler plate for Rest API using Node-Expressjs-DynamoDB-JWTTokens



## 1. Install Local dynamo DB instance


### a. Setup local dynamo db & aws-cli at command line
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html
https://docs.aws.amazon.com/cli/latest/userguide/installing.html

### b. Start DynamoDB local instance
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html


### c. Create table USER
``
aws dynamodb create-table --cli-input-json file:///<Project_root>/db/tables/create_table_user.json --region us-east-1 --endpoint-url http://localhost:8000
``

### d. List table, You should see the just created table
``
aws dynamodb list-tables --endpoint-url http://localhost:8000
``

## e. Load Data to USER table
``
aws dynamodb batch-write-item --request-items file:///<Project_root>/db/tables/load_data_user.json --endpoint-url http://localhost:8000
``
## f. Check if data is loaded
``
 aws dynamodb scan --table-name USER --endpoint-url http://localhost:8000
 ``

 ## 2. Clone this repository

 ``
 git clone https://github.com/alowsarwar/express-api-passport-dynamo.git
 ``

 Then CD in to it

 ## 3. Run ``npm install && npm start``

 Server starts at http://localhost:5000

 ## 4. Test API

 ### a. Generate Auth token

 ```sh
 curl -X POST \
  http://localhost:5000/login \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Postman-Token: 053b531f-f1cd-4611-bd40-000b6aabeddf' \
  -d 'email=user2%40mail.com&password=pass2'
  ```

  Copy the token from response, This response will go into header for subsequent API calls. This token is valid for 30 minutes.

  ```
 {"auth":true,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzgxMTkyNjIsImV4cCI6MTUzODExOTI5Mn0.4ENUMKdOWBhE98dfKX9BsHTpvh0Q71PBWaaLbXex1kM"}%
  ```

   ### b. Make get TODOs API call

   ```
   curl -X GET \
  http://localhost:5000/api/v1/todos \
  -H 'Cache-Control: no-cache' \
  -H 'Postman-Token: 5177bd39-ad8e-443c-80fd-82f06ba6b9aa' \
  -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzgxMTk1NTQsImV4cCI6MTUzODEyMTM1NH0.yvL08KwD_rULN7OB54m0Ut70Zrwy2uc3ltqVocj9GPY'
  ```

   ### c. Make a post call to crete a todo

   ```
   curl -X POST \
     http://localhost:5000/api/v1/todos \
     -H 'Cache-Control: no-cache' \
     -H 'Content-Type: application/json' \
     -H 'Postman-Token: 46a62902-b3b6-4732-bef7-fb7d1bc622df' \
     -H 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MzgxMTk5MjksImV4cCI6MTUzODEyMTcyOX0.n64nxvv8UaieODFgH0Ybd3UNbyLk6_xtXeeKYcZiYcU' \
     -d '{
   "title": "new1",
   "description": "new1"
   }'
   ```
