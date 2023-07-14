import { Field, InputType } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  firstname: string;

  @IsNotEmpty()
  @IsAlpha()
  @Field()
  lastname: string;
}
