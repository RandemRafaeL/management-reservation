import { EntityMetadataMap, EntityDataModuleConfig, ENTITY_METADATA_TOKEN, EntityDataModule } from '@ngrx/data';
import { NgModule } from '@angular/core';

const entityMetadata: EntityMetadataMap = {
    User: {}, // UserTable z Prisma
    Company: {}, // CompanyTable z Prisma
    Employee: {}, // EmployeeTable z Prisma
    Offer: {}, // OfferTable z Prisma
    Image: {}, // ImageTable z Prisma
};

// Dodatkowa konfiguracja, jeśli jest potrzebna
const pluralNames = {
    // Employee: 'EMPLOYEES',
    // Możemy tutaj dodać niestandardowe mapowanie nazw encji do ich liczby mnogiej, jeśli różni się od domyślnego schematu
};

export const entityConfig: EntityDataModuleConfig = {
    entityMetadata,
    pluralNames,
};

// I w końcu dodajemy do NgModule
@NgModule({
    imports: [
        // inny kod modułu
        EntityDataModule.forRoot({ entityMetadata }),
    ],
    providers: [{ provide: ENTITY_METADATA_TOKEN, multi: true, useValue: entityMetadata }],
    // reszta kodu modułu
})
export class EntityMetadataModule {}
