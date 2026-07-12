"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./booking.entity");
const services_service_1 = require("../services/services.service");
let BookingsService = class BookingsService {
    bookingsRepository;
    servicesService;
    constructor(bookingsRepository, servicesService) {
        this.bookingsRepository = bookingsRepository;
        this.servicesService = servicesService;
    }
    async create(createBookingDto) {
        const { serviceId, bookingDate, bookingTime } = createBookingDto;
        const service = await this.servicesService.findOne(serviceId);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const [year, month, day] = bookingDate.split('-').map(Number);
        const bookingDateObj = new Date(year, month - 1, day);
        bookingDateObj.setHours(0, 0, 0, 0);
        if (bookingDateObj < currentDate) {
            throw new common_1.BadRequestException('Booking dates cannot be in the past.');
        }
        const existingBooking = await this.bookingsRepository.findOne({
            where: {
                serviceId,
                bookingDate,
                bookingTime,
                status: booking_entity_1.BookingStatus.CONFIRMED
            }
        });
        if (existingBooking && existingBooking.status !== booking_entity_1.BookingStatus.CANCELLED) {
            throw new common_1.ConflictException('This time slot is already booked for this service.');
        }
        const booking = this.bookingsRepository.create({
            ...createBookingDto,
            service,
        });
        return await this.bookingsRepository.save(booking);
    }
    async findAll() {
        return await this.bookingsRepository.find({ relations: { service: true } });
    }
    async findOne(id) {
        const booking = await this.bookingsRepository.findOne({
            where: { id },
            relations: { service: true }
        });
        if (!booking) {
            throw new common_1.NotFoundException(`Booking with ID ${id} not found`);
        }
        return booking;
    }
    async updateStatus(id, updateBookingStatusDto) {
        const booking = await this.findOne(id);
        if (booking.status === booking_entity_1.BookingStatus.CANCELLED && updateBookingStatusDto.status === booking_entity_1.BookingStatus.COMPLETED) {
            throw new common_1.BadRequestException('Cancelled bookings cannot be marked as completed.');
        }
        booking.status = updateBookingStatusDto.status;
        return await this.bookingsRepository.save(booking);
    }
    async remove(id) {
        const booking = await this.findOne(id);
        await this.bookingsRepository.remove(booking);
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        services_service_1.ServicesService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map