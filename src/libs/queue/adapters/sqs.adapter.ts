import  { SendMessageCommand, SQSClient, SQSClientConfig } from "@aws-sdk/client-sqs";
import { IQueueAdapter } from "..";
// Set the AWS Region.
const REGION = "ap-south-1"; //e.g. "us-east-1"
// Create SQS service object.

export type SQSConfig = {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    queue?: string
};

export type EmailPayload ={
    from: string;
    to: string[];
    subject: string;
    body: string;
}

class SQSAdapter implements IQueueAdapter {

    name: string = 'AWS_SQS';
    private client: SQSClient;
    private queue: string;

    constructor(config: SQSConfig) {
        const sqsConfig: SQSClientConfig = {
            credentials: {
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
            },
            region: config.region,
        };
        this.client = new SQSClient(sqsConfig);
        this.queue = config.queue;
    }

    async publish(payload){

        const params = {
            MessageBody: payload,
            QueueUrl: this.queue
        };

        const data = await this.client.send(new SendMessageCommand(params));
        return data;
    }

}


export default SQSAdapter;
