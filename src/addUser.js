// CommonJs
// const AWS = require('aws-sdk');
// const { v4: uuidv4 } = require('uuid');

import { v4 as uuidv4 } from 'uuid';

import pkg from 'aws-sdk';
const AWS = pkg;

const addUser = async (event) => {
    const { name, email } = JSON.parse(event.body);
    const id = uuidv4();
    const createdAt = new Date().toISOString();
    
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: 'UserTable',
        Item: {
            id,
            name,
            email,
            createdAt
        }
    };

    await dynamodb.put(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            id,
            name,
            email,
            createdAt
        })
    };

    return response;
    
}

// CommonJs
//module.exports = {addUser}

// ESM
export {addUser}