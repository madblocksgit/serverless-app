import { SQSEvent, Context } from "aws-lambda";

import * as AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" });
const TableName = process.env.TABLE_NAME;
export const Receive_Data = async (
  event: SQSEvent,
  context: Context
): Promise<void> => {
  try {
    const db: AWS.DynamoDB.DocumentClient = new AWS.DynamoDB.DocumentClient();

    for (const { body } of event.Records) {
      let data: any = JSON.parse(body);
      await db
        .put({
          TableName: TableName,
          Item: data,
        })
        .promise();
    }
  } catch (err) {
    console.log("Error occured", err);
  }
};
