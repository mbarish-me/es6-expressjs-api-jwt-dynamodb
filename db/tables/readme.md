### Skeleton for creating table! Also included how to add local secondary index and Global secondary index

```json {
  "AttributeDefinitions": [
    {
      "AttributeName": "string",
      "AttributeType": "string"
    }
  ],
  "GlobalSecondaryIndexes": [
    {
      "IndexName": "string",
      "KeySchema": [
        {
          "AttributeName": "string",
          "KeyType": "string"
        }
      ],
      "Projection": {
        "NonKeyAttributes": [ "string" ],
        "ProjectionType": "string"
      },
      "ProvisionedThroughput": {
        "ReadCapacityUnits": number,
        "WriteCapacityUnits": number
      }
    }
  ],
  "KeySchema": [
    {
      "AttributeName": "string",
      "KeyType": "string"
    }
  ],
  "LocalSecondaryIndexes": [
    {
      "IndexName": "string",
      "KeySchema": [
        {
          "AttributeName": "string",
          "KeyType": "string"
        }
      ],
      "Projection": {
        "NonKeyAttributes": [ "string" ],
        "ProjectionType": "string"
      }
    }
  ],
  "ProvisionedThroughput": {
    "ReadCapacityUnits": number,
    "WriteCapacityUnits": number
  },
  "SSESpecification": {
    "Enabled": boolean,
    "KMSMasterKeyId": "string",
    "SSEType": "string"
  },
  "StreamSpecification": {
    "StreamEnabled": boolean,
    "StreamViewType": "string"
  },
  "TableName": "string"
}
```
//Ref: https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html
       https://docs.aws.amazon.com/cli/latest/reference/dynamodb/create-table.html

#To create table from json file
``sh
$ aws dynamodb create-table --cli-input-json testbootstraptable.json --region us-west-2
``

### How to create local secondary index - CLI
```sh
aws dynamodb create-table \
--region=eu-west-1 \
--endpoint-url http://localhost:8000 \
--table-name users \
--attribute-definitions \
AttributeName=id,AttributeType=S \
AttributeName=name,AttributeType=S \
AttributeName=age,AttributeType=S \
--key-schema \
AttributeName=id,KeyType=HASH \
AttributeName=name,KeyType=RANGE \
--provisioned-throughput ReadCapacityUnits=10,WriteCapacityUnits=10 \
--local-secondary-indexes IndexName=localIndex,\
KeySchema=["{AttributeName=id,KeyType=HASH}","{AttributeName=age,KeyType=RANGE}"],\
Projection="{ProjectionType=INCLUDE ,NonKeyAttributes=["age"]}"
```

### How to create Global secondary index - CLI
```json

aws dynamodb create-table \
             --region=eu-west-1 \
             --endpoint-url http://localhost:8000 \
             --table-name users \
             --attribute-definitions \
                 AttributeName=id,AttributeType=S \
                 AttributeName=name,AttributeType=S \
                 AttributeName=age,AttributeType=S \
             --key-schema \
                 AttributeName=id,KeyType=HASH \
                 AttributeName=name,KeyType=RANGE \
             --provisioned-throughput ReadCapacityUnits=10,WriteCapacityUnits=10 \
             --global-secondary-indexes IndexName=Index,\
KeySchema=["{AttributeName=name,KeyType=HASH}","{AttributeName=id,KeyType=RANGE}"],\
Projection="{ProjectionType=INCLUDE ,NonKeyAttributes=["age"]}",\
ProvisionedThroughput="{ReadCapacityUnits=10,WriteCapacityUnits=10}"
```