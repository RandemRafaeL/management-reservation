import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateBookingInput } from './dto/create-booking.input';
import { UpdateBookingInput } from './dto/update-booking.input';
import { BookingStatus, Prisma } from '@prisma/client';
import { QueryOptionsInput } from '../../core/graphql/pagination-sort.input';
import { queryOptions } from '../../core/graphql/pagination-sort.decorator';

@Injectable()
export class BookingService {
    constructor(private readonly prismaService: PrismaService) {}

    defaultInclude: Prisma.BookingTableInclude = {
        customer: true,
        offerForEmployee: {
            include: {
                employee: true,
                offerForCompany: {
                    include: {
                        offer: true,
                        company: true,
                    },
                },
            },
        },
        offerForCompany: {
            include: {
                offer: true,
                company: true,
            },
        },
    };

    async create(createBookingInput: CreateBookingInput) {
        const {
            customerId,
            offerForCompanyId,
            offerForEmployeeId,
            status = BookingStatus.SCHEDULED, // Ustaw domyślny status jeśli jest undefined
            ...otherData
        } = createBookingInput;

        const effectiveStatus = status || BookingStatus.SCHEDULED;

        return this.prismaService.bookingTable.create({
            data: {
                ...otherData,
                status: effectiveStatus,
                customer: { connect: { id: customerId } },
                offerForCompany: { connect: { id: offerForCompanyId } },
                ...(offerForEmployeeId ? { offerForEmployee: { connect: { id: offerForEmployeeId } } } : {}),
            },
        });
    }

    async listBooking_User(userId: string, options?: QueryOptionsInput) {
        return this.prismaService.bookingTable.findMany({
            ...queryOptions(options),
            where: {
                offerForCompany: {
                    company: {
                        userId: userId,
                    },
                },
            },
            include: this.defaultInclude,
        });
    }

    async findAll() {
        return this.prismaService.bookingTable.findMany({
            include: this.defaultInclude,
        });
    }

    async findOne(id: string) {
        const booking = await this.prismaService.bookingTable.findUnique({
            where: { id },
            include: this.defaultInclude,
        });

        if (!booking) {
            throw new NotFoundException(`Booking with ID "${id}" not found`);
        }

        return booking;
    }

    async update(id: string, updateBookingInput: UpdateBookingInput) {
        const { customerId, offerForCompanyId, offerForEmployeeId, ...otherBookingInput } = updateBookingInput;

        return this.prismaService.bookingTable.update({
            where: { id },
            data: {
                ...otherBookingInput,
                ...(offerForCompanyId && { offerForCompany: { connect: { id: offerForCompanyId } } }),
                ...(offerForEmployeeId && { offerForEmployee: { connect: { id: offerForEmployeeId } } }),
                ...(customerId && { customer: { connect: { id: customerId } } }),
            },
            // data: {
            //     ...otherBookingInput,
            //     ...(offerForCompanyId
            //         ? { offerForCompany: { connect: { id: offerForCompanyId } } }
            //         : { offerForCompany: { disconnect: true } }),
            //     ...(offerForEmployeeId
            //         ? { offerForEmployee: { connect: { id: offerForEmployeeId } } }
            //         : { offerForEmployee: { disconnect: true } }),
            //     ...(customerId && { customer: { connect: { id: customerId } } }),
            // },
        });
    }

    async remove(id: string) {
        return this.prismaService.bookingTable.delete({
            where: { id },
        });
    }
}
