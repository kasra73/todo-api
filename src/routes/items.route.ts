import { Router } from 'express';
import ItemsController from '@controllers/items.controller';
import { CreateItemDto, SearchItemDto, UpdateItemDto } from '@dtos/items.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';

class ItemsRoute implements Routes {
  public path = '/items';
  public router = Router();
  public itemsController = new ItemsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(SearchItemDto, 'query'),
      this.itemsController.getItems,
    );
    this.router.get(`${this.path}/:id`, authMiddleware, this.itemsController.getItemById);
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validationMiddleware(CreateItemDto, 'body'),
      this.itemsController.createItem,
    );
    this.router.patch(
      `${this.path}/:id`,
      authMiddleware,
      validationMiddleware(UpdateItemDto, 'body', true),
      this.itemsController.updateItem,
    );
    this.router.delete(`${this.path}/:id`, authMiddleware, this.itemsController.deleteItem);
  }
}

export default ItemsRoute;
