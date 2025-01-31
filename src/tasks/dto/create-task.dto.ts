import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Faire les courses' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Acheter du lait et du pain' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
