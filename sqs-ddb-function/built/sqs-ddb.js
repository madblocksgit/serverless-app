"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receive_Data = void 0;
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const TableName = process.env.TABLE_NAME;
exports.Receive_Data = async (event, context) => {
    try {
        const db = new AWS.DynamoDB.DocumentClient();
        for (const { body } of event.Records) {
            let data = JSON.parse(body);
            await db
                .put({
                TableName: TableName,
                Item: data,
            })
                .promise();
        }
    }
    catch (err) {
        console.log("Error occured", err);
    }
};
//# sourceMappingURL=sqs-ddb.js.map