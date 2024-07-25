import {v4 as uuidv4} from 'uuid';
import pkg from 'aws-sdk';
const AWS = pkg;

const getUser = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: 'UserTable',
        Key: {
            id: event.pathParameters.id
        }
    };
    const result = await dynamodb.get(params).promise();
    const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item)
    };
    return response;
};
export {getUser}