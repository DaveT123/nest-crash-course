import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, MaxLength } from "class-validator";

export class CreateUserDto {
  
  @ApiProperty() // property for Open API
  @IsAlphanumeric() // validator
  @MaxLength(10) // validator
  name: string;

  @ApiProperty({required: false}) // property for Open API
  age?: number;

}

export class UpdateUserDto {

  id: number;
  name: string;
  age?: number;

}