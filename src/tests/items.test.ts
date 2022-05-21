import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import { CreateItemDto, UpdateItemDto } from '@dtos/items.dto';
import ItemsRoute from '@routes/items.route';
import itemModel from '@models/items.model';

beforeAll(() => {
  jest.mock('@middlewares/auth.middleware', () => (req, res, next) => {
    req.user = {
      _id: '60706478aad6c9ad19a31c84',
      email: 'test@email.com',
    };
    next();
  });
});

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Items', () => {
  describe('[GET] /items', () => {
    it('response fineAll Items', async () => {
      const itemsRoute = new ItemsRoute();

      itemModel.find = jest.fn().mockReturnValue([
        {
          _id: '6287f36bf05aff932a1e3f77',
          title: 'Writing tests',
          description: 'string',
          status: 'done',
          dueDate: '2022-12-23T09:39:14.000Z',
        },
        {
          _id: '6287f382f05aff932a1e3f82',
          title: 'Writing tests',
          description: 'string',
          status: 'done',
          dueDate: '2022-12-23T11:40:14.000Z',
        },
        {
          _id: '6287f386f05aff932a1e3f86',
          title: 'Writing tests',
          description: 'string',
          status: 'in-progress',
          dueDate: '2022-12-23T12:40:14.000Z',
        },
      ]);

      (mongoose as any).connect = jest.fn();
      const app = new App([itemsRoute]);
      return request(app.getServer()).get(`${itemsRoute.path}`).expect(200);
    });
  });

  describe('[GET] /items/:id', () => {
    it('response findOne Item', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const itemId = '6287f386f05aff932a1e3f86';

      const itemsRoute = new ItemsRoute();

      itemModel.findOne = jest.fn().mockReturnValue({
        _id: '6287f386f05aff932a1e3f86',
        title: 'Writing tests',
        description: 'string',
        status: 'in-progress',
        dueDate: '2022-12-23T12:40:14.000Z',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([itemsRoute]);
      return request(app.getServer()).get(`${itemsRoute.path}/${itemId}`).expect(200);
    });
  });

  describe('[POST] /items', () => {
    it('response Create Item', async () => {
      const itemData: CreateItemDto = {
        title: 'Writing tests',
        description: 'string',
        status: 'in-progress',
        dueDate: new Date('2022-12-23T12:40:14.000Z'),
      };

      const itemsRoute = new ItemsRoute();

      itemModel.findOne = jest.fn().mockReturnValue(null);
      itemModel.create = jest.fn().mockReturnValue({
        _id: '6287f386f05aff932a1e3f86',
        title: 'Writing tests',
        description: 'string',
        status: 'in-progress',
        dueDate: '2022-12-23T12:40:14.000Z',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([itemsRoute]);
      return request(app.getServer()).post(`${itemsRoute.path}`).send(itemData).expect(201);
    });
  });

  describe('[PATCH] /items/:id', () => {
    it('response Update Item', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const itemId = '6287f386f05aff932a1e3f86';
      const itemData: UpdateItemDto = {
        status: 'done',
        dueDate: new Date('2022-12-23T12:42:14.000Z'),
      };

      const itemsRoute = new ItemsRoute();

      itemModel.findOneAndUpdate = jest.fn().mockReturnValue({
        _id: '62892a95c78b5d84ac4473b8',
        title: 'Writing tests',
        description: 'string',
        status: 'done',
        dueDate: '2022-12-23T12:42:14.000Z',
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([itemsRoute]);
      return request(app.getServer()).put(`${itemsRoute.path}/${itemId}`).send(itemData).expect(200);
    });
  });

  describe('[DELETE] /items/:id', () => {
    it('response Delete User', async () => {
      const userId = '60706478aad6c9ad19a31c84';
      const itemId = '6287f386f05aff932a1e3f86';

      const itemsRoute = new ItemsRoute();

      itemModel.deleteOne = jest.fn().mockReturnValue({ acknowledged: true, deletedCount: 1 });

      (mongoose as any).connect = jest.fn();
      const app = new App([itemsRoute]);
      return request(app.getServer()).delete(`${itemsRoute.path}/${itemId}`).expect(200);
    });
  });
});
