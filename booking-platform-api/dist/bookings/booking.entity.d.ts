import { Service } from '../services/service.entity';
export declare enum BookingStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    CANCELLED = "CANCELLED",
    COMPLETED = "COMPLETED"
}
export declare class Booking {
    id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    bookingDate: string;
    bookingTime: string;
    status: BookingStatus;
    notes?: string;
    service: Service;
    serviceId: string;
    createdAt: Date;
    updatedAt: Date;
}
