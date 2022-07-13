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

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({required: false})
  age?: number;

}