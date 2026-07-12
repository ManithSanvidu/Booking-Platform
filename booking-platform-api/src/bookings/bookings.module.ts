import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './booking.entity';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    ServicesModule, // Need this to validate if a service exists
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService], // Export in case other modules need it
})
export class BookingsModule {}
