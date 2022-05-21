import { Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class UserInfoDto {
  @Expose()
  public email: string;

  @Expose()
  public createdAt?: Date;
}
