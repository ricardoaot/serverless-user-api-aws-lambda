import { v4 as uuidv4 } from "uuid";

import pkg from "aws-sdk";
const AWS = pkg;    

const deleteUser = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {   
        TableName: 'UserTable',
        Key: {
            id: event.pathParameters.id
        }
    };
    const result = await dynamodb.delete(params).promise();
    const response = {
        statusCode: 200,
        body: JSON.stringify(result)
    };
    return response;
};
export {deleteUser}