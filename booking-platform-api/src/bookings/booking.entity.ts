import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from '../services/service.entity';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  customerName!: string;

  @Column()
  customerEmail!: string;

  @Column()
  customerPhone!: string;

  @Column({ type: 'date' })
  bookingDate!: string;

  @Column({ type: 'time' })
  bookingTime!: string;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
  })
  status!: BookingStatus;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'serviceId' })
  service!: Service;

  @Column()
  serviceId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
