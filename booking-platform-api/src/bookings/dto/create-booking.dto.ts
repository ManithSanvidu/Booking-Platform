import { IsString, IsEmail, IsNotEmpty, IsDateString, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the customer' })
  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email of the customer' })
  @IsEmail()
  @IsNotEmpty()
  customerEmail!: string;

  @ApiProperty({ example: '+1234567890', description: 'Phone number of the customer' })
  @IsString()
  @IsNotEmpty()
  customerPhone!: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'UUID of the service' })
  @IsUUID()
  @IsNotEmpty()
  serviceId!: string;

  @ApiProperty({ example: '2026-12-31', description: 'Date of the booking (YYYY-MM-DD)' })
  @IsDateString()
  @IsNotEmpty()
  bookingDate!: string;

  @ApiProperty({ example: '14:30', description: 'Time of the booking (HH:mm)' })
  @IsString()
  @IsNotEmpty()
  bookingTime!: string;

  @ApiPropertyOptional({ example: 'Please prepare the room early.', description: 'Additional notes' })
  @IsString()
  @IsOptional()
  notes?: string;
}
