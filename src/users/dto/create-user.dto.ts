import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  email: string;
  @Field()
  firstname: string;
  @Field()
  lastname: string;
}
