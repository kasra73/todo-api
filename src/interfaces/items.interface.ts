import { ItemStatus } from '@dtos/items.dto';

export interface Item {
  _id: string;
  title: string;
  description: string;
  status: ItemStatus;
  dueDate?: Date;
}
