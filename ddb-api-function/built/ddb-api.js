"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_Data = void 0;
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const TableName = process.env.TABLE_NAME;
exports.Get_Data = async (event) => {
    try {
        const db = new AWS.DynamoDB.DocumentClient();
        var params = { TableName: TableName };
        let comments_data = await db.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ data: comments_data }),
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ Error: err }),
        };
    }
};
//# sourceMappingURL=ddb-api.js.map