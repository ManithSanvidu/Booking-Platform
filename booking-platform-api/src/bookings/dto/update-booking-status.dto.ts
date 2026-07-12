import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '../booking.entity';

export class UpdateBookingStatusDto {
  @ApiProperty({ enum: BookingStatus, description: 'The new status of the booking' })
  @IsEnum(BookingStatus)
  @IsNotEmpty()
  status!: BookingStatus;
}
