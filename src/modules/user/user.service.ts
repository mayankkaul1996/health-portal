import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ILogger, Logger } from 'src/libs/logging/logger';
import { STATUS, User, UserDocument } from './schemas/user.schema';

export type TUserDetails = {
    firstName: string;
    lastName?: string;
    avatarUrl?: string;
    email: string;
};

@Injectable()
export class UserService {

    private readonly logger: ILogger = Logger.getLogger();
    
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ){}

    async updateOrCreate({ firstName, lastName = '', avatarUrl = '', email }: TUserDetails): Promise<any>{
        const user = await this.userModel.findOneAndUpdate({ email }, { firstName, lastName, avatarUrl, email, lastSignedInAt: new Date(), status: STATUS.ACTIVE }, { upsert: true, new: true });
        return user.toJSON();
    }

    async findOne(userId): Promise<UserDocument> {
        const user = await this.userModel.findById(userId);
        return user;
    }

}
