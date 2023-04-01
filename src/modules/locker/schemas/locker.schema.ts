import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTimestampsConfig } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

export type LockerDocument = HydratedDocument<Locker> & SchemaTimestampsConfig;

@Schema({ timestamps: true })
export class Locker {
  @Prop()
  name: string;

  @Prop()
  path: string;

  @Prop()
  user: string;

  @Prop()
  title: string;

  @Prop()
  mimetype: string;
}

export const LockerSchema = SchemaFactory.createForClass(Locker).plugin(softDeletePlugin);