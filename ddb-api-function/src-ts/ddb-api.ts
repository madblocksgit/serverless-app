import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" });
const TableName = process.env.TABLE_NAME;

export const Get_Data = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const db: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();
    var params = { TableName: TableName };

    let comments_data: any = await db.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ data: comments_data }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ Error: err }),
    };
  }
};
