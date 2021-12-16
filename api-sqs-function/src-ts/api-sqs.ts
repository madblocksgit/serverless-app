// Importing Modules
import { 
    APIGatewayProxyEvent, 
    APIGatewayProxyResult 
  } from "aws-lambda";
  import * as AWS from 'aws-sdk';

// Environment Config Setup
AWS.config.update({region: 'us-east-1'});  
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const url=process.env.SQS_URL;

// Receive Data from APIGateway Event
export const Send_Data = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try{
      const params = {
          DelaySeconds: 10,
          MessageBody: JSON.stringify(JSON.parse(event.body)),
          QueueUrl: url
      }; // queue parameters config

      var response = await new AWS.SQS().sendMessage(params).promise();
      return {
          statusCode: 200,
          body:JSON.stringify({message:"Secret Message Inserted"})
      }
    }
    catch(err){
        return {
            statusCode: 500,
            body:JSON.stringify({Message:"Secret Message Not  Inserted",Error:err})
          }
    }
}