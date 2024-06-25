// Company types DEPRECATED

export type Company = {
    id: number;
    imageId: string;
    imageUrl: string;
    name: string;
    address: string;
    email: string;
    phoneNumber?: string;
    description?: string;
    userId: string;
};

export type CreateCompanyDTO = Omit<Company, 'id'>;

export type UpdateCompanyDTO = {
    id: number & Partial<CreateCompanyDTO>;
};
export type DeleteCompanyDTO = {
    id: number;
};
