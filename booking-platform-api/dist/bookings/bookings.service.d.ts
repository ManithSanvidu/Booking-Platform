import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { ServicesService } from '../services/services.service';
export declare class BookingsService {
    private bookingsRepository;
    private servicesService;
    constructor(bookingsRepository: Repository<Booking>, servicesService: ServicesService);
    create(createBookingDto: CreateBookingDto): Promise<Booking>;
    findAll(): Promise<Booking[]>;
    findOne(id: string): Promise<Booking>;
    updateStatus(id: string, updateBookingStatusDto: UpdateBookingStatusDto): Promise<Booking>;
    remove(id: string): Promise<void>;
}
