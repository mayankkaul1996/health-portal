import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTimestampsConfig } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type UserDocument = HydratedDocument<User> & SchemaTimestampsConfig;

export enum STATUS {
  ACTIVE = 'ACTIVE'
}

@Schema({ timestamps: true })
export class User {

  @Prop()
  firstName: string;

  @Prop()
  middleName: string;

  @Prop()
  lastName: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  email: string;

  @Prop()
  lastSignedInAt: Date;

  @Prop()
  status: STATUS;

}

export const UserSchema = SchemaFactory.createForClass(User).plugin(softDeletePlugin);