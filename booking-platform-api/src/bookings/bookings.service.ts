import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { ServicesService } from '../services/services.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingsRepository: Repository<Booking>,
    private servicesService: ServicesService,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { serviceId, bookingDate, bookingTime } = createBookingDto;

    // Rule: A booking must belong to an existing service
    const service = await this.servicesService.findOne(serviceId);

    // Rule: Booking dates cannot be in the past
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time for accurate date comparison
    
    // Parse the bookingDate which is in YYYY-MM-DD
    const [year, month, day] = bookingDate.split('-').map(Number);
    const bookingDateObj = new Date(year, month - 1, day);
    bookingDateObj.setHours(0, 0, 0, 0);

    if (bookingDateObj < currentDate) {
      throw new BadRequestException('Booking dates cannot be in the past.');
    }

    // Bonus Rule: Prevent duplicate bookings for the same service, date, and time
    const existingBooking = await this.bookingsRepository.findOne({
      where: {
        serviceId,
        bookingDate,
        bookingTime,
        status: BookingStatus.CONFIRMED // Or PENDING, generally anything not CANCELLED
      }
    });

    if (existingBooking && existingBooking.status !== BookingStatus.CANCELLED) {
      throw new ConflictException('This time slot is already booked for this service.');
    }

    const booking = this.bookingsRepository.create({
      ...createBookingDto,
      service, // Assign the full service entity to satisfy relation
    });

    return await this.bookingsRepository.save(booking);
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingsRepository.find({ relations: { service: true } });
  }

  async findOne(id: string): Promise<Booking> {
    const booking = await this.bookingsRepository.findOne({ 
      where: { id },
      relations: { service: true }
    });
    
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async updateStatus(id: string, updateBookingStatusDto: UpdateBookingStatusDto): Promise<Booking> {
    const booking = await this.findOne(id);

    // Rule: Cancelled bookings cannot be marked as completed
    if (booking.status === BookingStatus.CANCELLED && updateBookingStatusDto.status === BookingStatus.COMPLETED) {
      throw new BadRequestException('Cancelled bookings cannot be marked as completed.');
    }

    booking.status = updateBookingStatusDto.status;
    return await this.bookingsRepository.save(booking);
  }

  async remove(id: string): Promise<void> {
    const booking = await this.findOne(id);
    await this.bookingsRepository.remove(booking);
  }
}
