import { NextFunction, Request, Response } from 'express';
import { CreateItemDto, SearchItemDto, UpdateItemDto } from '@dtos/items.dto';
import ItemService from '@services/items.service';
import { Item } from '@models/items.model';

class ItemsController {
  public itemService = new ItemService();

  public getItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user._id;
      const searchQuery: SearchItemDto = req.query;
      const findAllItemsData: Item[] = await this.itemService.findAllItem(userId, searchQuery);

      res.status(200).json({ data: findAllItemsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getItemById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user._id;
      const itemId: string = req.params.id;
      const findOneItemData: Item = await this.itemService.findItemById(itemId, userId);

      res.status(200).json({ data: findOneItemData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user._id;
      const itemData: CreateItemDto = req.body;
      const createItemData: Item = await this.itemService.createItem(itemData, userId);

      res.status(201).json({ data: createItemData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user._id;
      const itemId: string = req.params.id;
      const itemData: UpdateItemDto = req.body;
      const updateItemData: Item = await this.itemService.updateItem(itemId, itemData, userId);

      res.status(200).json({ data: updateItemData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user._id;
      const itemId: string = req.params.id;
      await this.itemService.deleteItem(itemId, req.con, userId);

      res.status(200).json({ data: null, message: 'Item deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default ItemsController;
