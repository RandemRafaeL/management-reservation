import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtStrategy } from './jwt.strategy';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ErrorsMainInterceptor } from './interceptor/errors-main.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaService } from './prisma.service';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { CompanyModule } from './modules/company/company.module';
import { ImagesModule } from './modules/images/images.module';
import { EmployeeModule } from './modules/employee/employee.module'; // Import enumów
import { OfferModule } from './modules/offer/offer.module';
import { PermissionsService } from './modules/core/permissions/permission.service';
import { PermissionsResolver } from './modules/core/permissions/permissions.resolver';
import { CategoryOfOfferModule } from './modules/categoryOfOffer/category-of-offer.module';
import { OfferForCompanyModule } from './modules/offerForCompany/offerForCompany.module';
import { OfferForEmployeeModule } from './modules/offerForEmployee/offerForEmployee.module';
import { BookingModule } from './modules/booking/booking.module';
import { CustomerService } from './modules/customer/customer.service';
import { CustomerModule } from './modules/customer/customer.module';
import { StateService } from './modules/state/state.service';
import { StateModule } from './modules/state/state.module';

import GraphQLJSON from 'graphql-type-json';
import './core/graphql/enums-graphql';
import { HttpExceptionFilter } from './core/errors/graphql-exception-filter';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            context: ({ req, res }) => ({ req, res }), // Przekazywanie obiektu request do kontekstu GraphQL
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), '_graphql/schema.gql'),
            buildSchemaOptions: {
                scalarsMap: [{ type: () => 'JSON', scalar: GraphQLJSON }],
            },
            sortSchema: true,
            installSubscriptionHandlers: true,
            // playground: true,
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
            introspection: true,

            // Inne opcje konfiguracyjne
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        AuthModule,
        CompanyModule,
        UsersModule,
        ImagesModule,
        EmployeeModule,
        OfferModule,
        CategoryOfOfferModule,
        OfferForCompanyModule,
        OfferForEmployeeModule,
        BookingModule,
        CustomerModule,
        StateModule,
        // RedisModule,
        // ImagesModule,
    ],
    controllers: [],
    providers: [
        { provide: APP_FILTER, useClass: HttpExceptionFilter },
        { provide: APP_INTERCEPTOR, useClass: ErrorsMainInterceptor },
        AppService,
        JwtStrategy,
        PrismaService,
        PermissionsService,
        PermissionsResolver,
        StateService,
        CustomerService,
    ],
})
export class AppModule {}
