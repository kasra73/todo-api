import { CreateItemDto, SearchItemDto, UpdateItemDto } from '@dtos/items.dto';
import { HttpException } from '@exceptions/HttpException';
import ItemModel, { Item } from '@models/items.model';
import { plainToInstance } from 'class-transformer';
import mongoose from 'mongoose';

class ItemService {
  // public items = ItemModel;

  public async findAllItem(userId: mongoose.Types.ObjectId, searchQuery: SearchItemDto): Promise<Item[]> {
    const query: any = {};
    if (searchQuery.fromDueDate !== undefined) {
      query.dueDate = { $gte: searchQuery.fromDueDate };
    }
    if (searchQuery.toDueDate !== undefined) {
      if (query.dueDate === undefined) {
        query.dueDate = {};
      }
      query.dueDate.$lte = searchQuery.toDueDate;
    }
    if (searchQuery.status !== undefined) {
      query.status = searchQuery.status;
    }

    const items: Item[] = await ItemModel.find({ userId, ...query });

    return items.map(item => plainToInstance(Item, item));
  }

  public async findItemById(itemId: string, userId: mongoose.Types.ObjectId): Promise<Item> {
    const findItem: Item = await ItemModel.findOne({ _id: new mongoose.Types.ObjectId(itemId), userId });
    if (!findItem) throw new HttpException(404, 'Item does not exist');

    return plainToInstance(Item, findItem);
  }

  public async createItem(itemData: CreateItemDto, userId: mongoose.Types.ObjectId): Promise<Item> {
    const data = plainToInstance(CreateItemDto, itemData);
    const createItemData: Item = await ItemModel.create({ _id: new mongoose.Types.ObjectId(), userId, ...data });

    return plainToInstance(Item, createItemData);
  }

  public async updateItem(itemId: string, itemData: UpdateItemDto, userId: mongoose.Types.ObjectId): Promise<Item> {
    const data = plainToInstance(UpdateItemDto, itemData);
    const updateItemById = await ItemModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(itemId), userId },
      { ...data },
      { returnDocument: 'after' },
    );
    if (!updateItemById) throw new HttpException(404, 'Item does not exist');

    return updateItemById;
  }

  public async deleteItem(itemId: string, userId: mongoose.Types.ObjectId): Promise<boolean> {
    const deleteItemById = await ItemModel.deleteOne({ _id: new mongoose.Types.ObjectId(itemId), userId });
    console.log(deleteItemById);
    if (deleteItemById.deletedCount === 0) throw new HttpException(404, 'Item does not exist');
    return true;
  }
}

export default ItemService;
