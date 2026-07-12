import { IsString, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Haircut' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Men haircut with styling' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 30, description: 'Duration in minutes' })
  @IsNumber()
  @Min(1)
  duration!: number;

  @ApiProperty({ example: 25.50 })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateServiceDto {
  @ApiProperty({ example: 'Haircut', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'Men haircut with styling', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 30, description: 'Duration in minutes', required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  duration?: number;

  @ApiProperty({ example: 25.50, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
