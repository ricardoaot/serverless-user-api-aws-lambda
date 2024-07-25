import { v4 as uuidv4 } from "uuid";

import pkg from "aws-sdk";
const AWS = pkg;

const updateUser = async (event) => {
    const { name:userName, email } = JSON.parse(event.body);
    const id = event.pathParameters.id;
    const updatedAt = new Date().toISOString();
    
    const dynamodb = new AWS.DynamoDB.DocumentClient(); 

    const params = {
        TableName: 'UserTable',
        Key: {
            id
        },
        UpdateExpression: "set #name = :n, email = :e, updatedAt = :u",
        ExpressionAttributeNames: {
            "#name": "name"
        },
        ExpressionAttributeValues: {
            ":n": userName,
            ":e": email,
            ":u": updatedAt
        },
        ReturnValues: "ALL_NEW"
    };

    const result = await dynamodb.update(params).promise();
    const response = {
        statusCode: 200,
        body: JSON.stringify(result.Attributes)
    };
    return response;
};
export {updateUser}