import { Type } from 'class-transformer';
import { IsString, IsIn, IsDateString, IsOptional, IsDate } from 'class-validator';

export type ItemStatus = 'in-progress' | 'done';

export class CreateItemDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsIn(['in-progress', 'done'])
  public status: ItemStatus = 'in-progress';

  @IsDateString()
  public dueDate: Date;
}

export class UpdateItemDto {
  @IsIn(['in-progress', 'done'])
  public status: ItemStatus;

  @IsDateString()
  public dueDate: Date;
}

export class SearchItemDto {
  @IsOptional()
  @IsIn(['in-progress', 'done'])
  public status: ItemStatus;

  @IsOptional()
  @IsDateString()
  public toDueDate: Date;

  @IsOptional()
  @IsDateString()
  public fromDueDate: Date;
}
