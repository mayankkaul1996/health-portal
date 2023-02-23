import { ILogger, Logger } from '../logging/logger';


export interface IQueueAdapter {
    name: string;
    publish: (payload) => Promise<any>;
}

class Queue {
    private readonly logger: ILogger = Logger.getLogger();
    private adapter: IQueueAdapter;

    constructor(adapter: IQueueAdapter) {
        this.adapter = adapter;
    }

    async publish(payload: any): Promise<any> {
        this.logger.info(`publishing data : ${JSON.stringify(payload)}`);
        return this.adapter.publish(payload);
    }

}

export default Queue;
