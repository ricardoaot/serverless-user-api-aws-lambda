import {v4 as uuidv4} from 'uuid';
import pkg from 'aws-sdk';
const AWS = pkg;

const getUsers = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: 'UserTable',
    };
    const result = await dynamodb.scan(params).promise();
    const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items)
    };
    return response;
};
export {getUsers}