import { ItemStatus } from '@dtos/items.dto';
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';

@modelOptions({ schemaOptions: { collection: 'items', timestamps: true } })
@Exclude()
export class Item {
  @Expose()
  @prop()
  @Transform(value => value.obj._id.toString() || null)
  public _id: mongoose.Types.ObjectId;

  @Expose()
  @prop({ type: String, required: true })
  public title: string;

  @Expose()
  @prop({ type: String, default: '' })
  public description: string;

  @Expose()
  @prop({ type: String, default: 'in-progress' })
  public status: ItemStatus;

  @Expose()
  @prop({ default: null })
  @Type(() => Date)
  public dueDate?: Date;

  @prop({ type: mongoose.Types.ObjectId })
  public userId?: mongoose.Types.ObjectId;
}

const ItemModel = getModelForClass(Item);

export default ItemModel;
