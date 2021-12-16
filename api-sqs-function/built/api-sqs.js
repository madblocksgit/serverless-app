"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Send_Data = void 0;
const AWS = require("aws-sdk");
// Environment Config Setup
AWS.config.update({ region: 'us-east-1' });
var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const url = process.env.SQS_URL;
// Receive Data from APIGateway Event
exports.Send_Data = async (event) => {
    try {
        const params = {
            DelaySeconds: 10,
            MessageBody: JSON.stringify(JSON.parse(event.body)),
            QueueUrl: url
        }; // queue parameters config
        var response = await new AWS.SQS().sendMessage(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Secret Message Inserted" })
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ Message: "Secret Message Not  Inserted", Error: err })
        };
    }
};
//# sourceMappingURL=api-sqs.js.map