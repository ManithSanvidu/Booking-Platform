import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Booking } from './booking.entity';

@ApiTags('bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking (Open to customers)' })
  @ApiResponse({ status: 201, description: 'The booking has been successfully created.', type: Booking })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 404, description: 'Service not found.' })
  @ApiResponse({ status: 409, description: 'Conflict - Duplicate booking.' })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all bookings (Admin only)' })
  @ApiResponse({ status: 200, description: 'Return all bookings.', type: [Booking] })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a booking by ID (Admin only)' })
  @ApiResponse({ status: 200, description: 'Return the booking.', type: Booking })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update booking status (Admin only)' })
  @ApiResponse({ status: 200, description: 'The booking status has been successfully updated.', type: Booking })
  @ApiResponse({ status: 400, description: 'Bad Request (e.g. Cancelled to Completed).' })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  updateStatus(
    @Param('id') id: string,
    @Body() updateBookingStatusDto: UpdateBookingStatusDto,
  ) {
    return this.bookingsService.updateStatus(id, updateBookingStatusDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cancel/Delete a booking (Admin only)' })
  @ApiResponse({ status: 200, description: 'The booking has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }
}
