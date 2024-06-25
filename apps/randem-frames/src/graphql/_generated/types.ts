export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type AuthTokenType = {
  __typename?: 'AuthTokenType';
  access_token: Scalars['String']['output'];
};

export enum BookingStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  Scheduled = 'SCHEDULED'
}

export type BookingType = {
  __typename?: 'BookingType';
  bookingDate?: Maybe<Scalars['DateTime']['output']>;
  customer?: Maybe<CustomerType>;
  id?: Maybe<Scalars['ID']['output']>;
  offerForCompany?: Maybe<OfferForCompanyType>;
  offerForEmployee?: Maybe<OfferForEmployeeType>;
  status?: Maybe<BookingStatus>;
};

export type CategoryOfOfferTableType = {
  __typename?: 'CategoryOfOfferTableType';
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  offers?: Maybe<Array<OfferType>>;
};

export type CompanyType = {
  __typename?: 'CompanyType';
  address: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageId?: Maybe<Scalars['String']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  user?: Maybe<UserType>;
};

export type CreateBookingInput = {
  bookingDate: Scalars['DateTime']['input'];
  customerId: Scalars['ID']['input'];
  offerForCompanyId: Scalars['ID']['input'];
  offerForEmployeeId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<BookingStatus>;
};

export type CreateCategoryOfOfferInput = {
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateCompanyInput = {
  address: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  imageId?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type CreateCustomerInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEmployeeInput = {
  companyId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: Scalars['Boolean']['input'];
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  position: Scalars['String']['input'];
};

export type CreateOfferForCompanyInput = {
  availability: Scalars['Boolean']['input'];
  companyId: Scalars['String']['input'];
  customDescription?: InputMaybe<Scalars['String']['input']>;
  customImageUrl?: InputMaybe<Scalars['String']['input']>;
  customName?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['String']['input'];
  offerId: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type CreateOfferForEmployeeInput = {
  employeeId: Scalars['ID']['input'];
  offerForCompanyId: Scalars['ID']['input'];
};

export type CreateOfferInput = {
  categoryId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  password: Scalars['String']['input'];
  role: UserRoleEnum;
  username: Scalars['String']['input'];
};

export type CustomerType = {
  __typename?: 'CustomerType';
  bookings?: Maybe<Array<Maybe<BookingType>>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
};

export type EmployeeType = {
  __typename?: 'EmployeeType';
  company?: Maybe<CompanyType>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  position: Scalars['String']['output'];
};

export type LoginUserInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking: BookingType;
  createCategoryOfOffer: CategoryOfOfferTableType;
  createCompany: CompanyType;
  createCompanyForUser: CompanyType;
  createCustomer: CustomerType;
  createEmployee: EmployeeType;
  createOffer: OfferType;
  createOfferForCompany: OfferForCompanyType;
  createOfferForEmployee: OfferForEmployeeType;
  createUser: UserType;
  deleteBooking: BookingType;
  deleteCategoryOfOffer: CategoryOfOfferTableType;
  deleteCompany: CompanyType;
  deleteCustomer: CustomerType;
  deleteEmployee: Scalars['Boolean']['output'];
  deleteOffer: OfferType;
  deleteOfferForCompany: Scalars['Boolean']['output'];
  deleteOfferForEmployee: OfferForEmployeeType;
  deleteState?: Maybe<StateType>;
  deleteStateById?: Maybe<StateType>;
  deleteUser: UserType;
  login: AuthTokenType;
  setState: StateType;
  updateBooking: BookingType;
  updateCategoryOfOffer: CategoryOfOfferTableType;
  updateCompany: CompanyType;
  updateCompanyForUser: CompanyType;
  updateCustomer: CustomerType;
  updateEmployee: EmployeeType;
  updateOffer: OfferType;
  updateOfferForCompany: OfferForCompanyType;
  updateOfferForEmployee: OfferForEmployeeType;
  updateUser: UserType;
};


export type MutationCreateBookingArgs = {
  createBookingInput: CreateBookingInput;
};


export type MutationCreateCategoryOfOfferArgs = {
  input: CreateCategoryOfOfferInput;
};


export type MutationCreateCompanyArgs = {
  createCompanyInput: CreateCompanyInput;
};


export type MutationCreateCompanyForUserArgs = {
  createCompanyInput: CreateCompanyInput;
};


export type MutationCreateCustomerArgs = {
  createCustomerInput: CreateCustomerInput;
};


export type MutationCreateEmployeeArgs = {
  createEmployeeInput: CreateEmployeeInput;
};


export type MutationCreateOfferArgs = {
  createOfferInput: CreateOfferInput;
};


export type MutationCreateOfferForCompanyArgs = {
  createOfferForCompanyInput: CreateOfferForCompanyInput;
};


export type MutationCreateOfferForEmployeeArgs = {
  createOfferForEmployeeInput: CreateOfferForEmployeeInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteBookingArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCategoryOfOfferArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCompanyArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCustomerArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteEmployeeArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteOfferArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteOfferForCompanyArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteOfferForEmployeeArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteStateArgs = {
  key: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteStateByIdArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginUserData: LoginUserInput;
};


export type MutationSetStateArgs = {
  input: StateInput;
};


export type MutationUpdateBookingArgs = {
  id: Scalars['String']['input'];
  updateBookingInput: UpdateBookingInput;
};


export type MutationUpdateCategoryOfOfferArgs = {
  id: Scalars['String']['input'];
  input: UpdateCategoryOfOfferInput;
};


export type MutationUpdateCompanyArgs = {
  id: Scalars['String']['input'];
  updateCompanyInput: UpdateCompanyInput;
};


export type MutationUpdateCompanyForUserArgs = {
  id: Scalars['String']['input'];
  updateCompanyForUserInput: UpdateCompanyInput;
};


export type MutationUpdateCustomerArgs = {
  id: Scalars['String']['input'];
  updateCustomerInput: UpdateCustomerInput;
};


export type MutationUpdateEmployeeArgs = {
  id: Scalars['String']['input'];
  updateEmployeeInput: UpdateEmployeeInput;
};


export type MutationUpdateOfferArgs = {
  id: Scalars['String']['input'];
  updateOfferInput: UpdateOfferInput;
};


export type MutationUpdateOfferForCompanyArgs = {
  id: Scalars['String']['input'];
  updateOfferForCompanyInput: UpdateOfferForCompanyInput;
};


export type MutationUpdateOfferForEmployeeArgs = {
  id: Scalars['String']['input'];
  updateOfferForEmployeeInput: UpdateOfferForEmployeeInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserInput: UpdateUserInput;
};

export type OfferForCompanyType = {
  __typename?: 'OfferForCompanyType';
  availability: Scalars['Boolean']['output'];
  company?: Maybe<CompanyType>;
  customDescription?: Maybe<Scalars['String']['output']>;
  customImageUrl?: Maybe<Scalars['String']['output']>;
  customName?: Maybe<Scalars['String']['output']>;
  duration: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  offer?: Maybe<OfferType>;
  price: Scalars['Float']['output'];
};

export type OfferForEmployeeType = {
  __typename?: 'OfferForEmployeeType';
  booking?: Maybe<BookingType>;
  employee?: Maybe<EmployeeType>;
  id: Scalars['ID']['output'];
  offerForCompany?: Maybe<OfferForCompanyType>;
};

export type OfferType = {
  __typename?: 'OfferType';
  category?: Maybe<CategoryOfOfferTableType>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type PaginationInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getAllOffers: Array<OfferType>;
  getBooking: BookingType;
  getCategoryOfOffer: CategoryOfOfferTableType;
  getCategoryOfOfferPermissions: Scalars['JSON']['output'];
  getCompany: CompanyType;
  getCompanyPermissions: Scalars['JSON']['output'];
  getCurrentUser?: Maybe<UserType>;
  getCustomer: CustomerType;
  getEmployee?: Maybe<EmployeeType>;
  getOfferById?: Maybe<OfferType>;
  getOfferForCompany?: Maybe<OfferForCompanyType>;
  getOfferForEmployee: OfferForEmployeeType;
  getState?: Maybe<StateType>;
  getUser?: Maybe<UserType>;
  getUserByName?: Maybe<UserType>;
  listBooking_User: Array<BookingType>;
  listBookings: Array<BookingType>;
  listCategoryOfOffer: Array<CategoryOfOfferTableType>;
  listCompany: Array<CompanyType>;
  listCompanyForUser: Array<CompanyType>;
  listCustomer: Array<CustomerType>;
  listEmployee: Array<EmployeeType>;
  listEmployee_User: Array<EmployeeType>;
  listOfferForEmployees: Array<OfferForEmployeeType>;
  listOffersForCompany: Array<OfferForCompanyType>;
  listState: Array<StateType>;
  listUsers: Array<UserType>;
  schemaUser: Scalars['JSONObject']['output'];
  uniqueUsername: Scalars['Boolean']['output'];
};


export type QueryGetAllOffersArgs = {
  options?: InputMaybe<QueryOptionsInput>;
};


export type QueryGetBookingArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCategoryOfOfferArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCategoryOfOfferPermissionsArgs = {
  endpointName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCompanyArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCompanyPermissionsArgs = {
  endpointName?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetCustomerArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetEmployeeArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetOfferByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetOfferForCompanyArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetOfferForEmployeeArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetStateArgs = {
  key: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserByNameArgs = {
  username: Scalars['String']['input'];
};


export type QueryListBooking_UserArgs = {
  options?: InputMaybe<QueryOptionsInput>;
};


export type QueryListCategoryOfOfferArgs = {
  options?: InputMaybe<QueryOptionsInput>;
};


export type QueryListCompanyForUserArgs = {
  options?: InputMaybe<QueryOptionsInput>;
};


export type QueryListEmployee_UserArgs = {
  options?: InputMaybe<QueryOptionsInput>;
};


export type QueryListOffersForCompanyArgs = {
  options?: InputMaybe<QueryOptionsInput>;
};


export type QueryUniqueUsernameArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type QueryOptionsInput = {
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<Array<SortInput>>;
};

export type SortInput = {
  field: Scalars['String']['input'];
  order: SortOrder;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StateInput = {
  key: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

export type StateType = {
  __typename?: 'StateType';
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  value: Scalars['JSON']['output'];
};

export type UpdateBookingInput = {
  bookingDate?: InputMaybe<Scalars['DateTime']['input']>;
  customerId?: InputMaybe<Scalars['ID']['input']>;
  offerForCompanyId?: InputMaybe<Scalars['ID']['input']>;
  offerForEmployeeId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<BookingStatus>;
};

export type UpdateCategoryOfOfferInput = {
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCompanyInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  imageId?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEmployeeInput = {
  companyId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOfferForCompanyInput = {
  availability?: InputMaybe<Scalars['Boolean']['input']>;
  companyId?: InputMaybe<Scalars['String']['input']>;
  customDescription?: InputMaybe<Scalars['String']['input']>;
  customImageUrl?: InputMaybe<Scalars['String']['input']>;
  customName?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  offerId?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateOfferForEmployeeInput = {
  employeeId?: InputMaybe<Scalars['ID']['input']>;
  offerForCompanyId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateOfferInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRoleEnum>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export enum UserRoleEnum {
  Admin = 'ADMIN',
  Employee = 'EMPLOYEE',
  Owner = 'OWNER',
  User = 'USER'
}

export type UserType = {
  __typename?: 'UserType';
  company?: Maybe<Array<Maybe<CompanyType>>>;
  id: Scalars['ID']['output'];
  role: UserRoleEnum;
  username: Scalars['String']['output'];
};
