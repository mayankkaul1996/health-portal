import { Injectable } from '@nestjs/common';
import { ILogger, Logger } from '../../libs/logging/logger';


@Injectable()
export class LockerService {
  private readonly logger: ILogger = Logger.getLogger();

  constructor() { }

}
