import {UseFormSetValue} from "react-hook-form";

// USER

declare type User = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  postalCode: string;
  association: Association;
};

declare type SignUpParams = {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  password: string;
};

declare interface AuthResponse {
  token: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
    associationId: number;
  };
}

declare interface SignInParams {
  email: string;
  password: string;
}

declare interface UpdateUserParams {
  id: number;
  user: CreateUserProps;
}

declare interface UserFormProps {
  user?: User;
}

declare interface UserTableProps {
  users: User[];
}

declare type AuthUser = User | SuperUser;

// SUPER USER

declare type SuperUser = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
};

// EVENT

declare type Events = {
  id: number;
  association: Association;
  displayType: DisplayType;
  eventType: EventType;
  subEventType: SubEventType;
  title: string;
  description: string;
  logo: string;
  isPublished: boolean;
  isPlace: boolean;
  place: string;
  date: string;
  isEndDate: boolean;
  endDate: string;
  isHour: boolean;
  hour: string;
  isEndHour: boolean;
  endHour: string;
  isAddress: boolean;
  address: string;
  isPeopleLimit: boolean;
  peopleLimit: number;
  ticket: EventTicket[];
  people: EventPeople[];
  eventTicket: EventTicket[];
  eventPeople: EventPeople[];
};

declare interface CreateEventParams {
  associationId: number;
  displayTypeId: number;
  eventTypeId: number;
  subEventTypeId: number;
  title: string;
  description: string;
  logo?: string;
  date: Date;
  isPublished: boolean;
  isPlace: boolean;
  place?: string;
  isEndDate: boolean;
  endDate?: Date;
  isHour: boolean;
  hour?: Date;
  isEndHour: boolean;
  endHour?: Date;
  isAddress: boolean;
  address?: string;
  isPeopleLimit: boolean;
  peopleLimit?: number;
}

declare interface UpdateEventParams {
  id: number;
  event: CreateEventParams;
}

declare interface EventFormProps {
  event?: Events;
  associationId: number;
}

declare interface EventTableProps {
  events: Events[];
}

declare interface EventPeopleTableProps {
  eventPeople: EventPeople[];
}

// ASSOCIATION

declare type Association = {
  associationType: AssociationType;
  id: number;
  name: string;
  image: string;
  campus: Campus;
  title: string;
  description: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
};

declare interface CreateAssociationParams {
  name: string;
  title: string;
  description: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  role: string;
  image?: string;
  campusId: number;
  associationTypeId: number;
}

declare interface UpdateAssociationParams {
  id: number;
  association: CreateAssociationParams;
}

declare interface AssociationFormProps {
  association?: Association;
}

declare interface AssociationTableProps {
  associations: Association[];
}

// CAMPUS

declare type Campus = {
  id: number;
  campusType: CampusType;
  nbStudent: NbStudent;
  name: string;
  description: string;
  city: string;
  address: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
};

declare interface CreateCampusParams {
  name: string;
}

declare interface UpdateCampusParams {
  id: number;
  campus: CreateCampusParams;
}

declare interface CampusFormProps {
  campus?: Campus;
}

declare interface CampusTableProps {
  campuses: Campus[];
}

// ASSOCIATION TYPE

declare type AssociationType = {
  id: number;
  $id: number;
  name: string;
};

// CAMPUS TYPE

declare type CampusType = {
  id: number;
  $id: number;
  name: string;
};

// NB STUDENT

declare type NbStudent = {
  id: number;
  $id: number;
  number: string;
};

// EVENT TYPE

declare type EventType = {
  id: number;
  $id: number;
  name: string;
};

// SUB EVENT TYPE

declare type SubEventType = {
  id: number;
  $id: number;
  name: string;
};

//DISPLAY TYPE

declare type DisplayType = {
  id: number;
  $id: number;
  name: string;
};

// EVENT TICKET

declare type EventTicket = {
  id: number;
  $id: number;
  name: string;
  price: number;
  event: Events;
};

declare interface EventTicketTableProps {
  eventTicket: EventTicket[];
}

declare interface CreateEventTicketParams {
  name: string;
  price?: number;
}

declare interface UpdateEventTicketParams {
  id: number;
  eventTicket: CreateEventTicketParams;
}

declare interface EventTicketFormProps {
  eventId?: number;
  eventTicket?: EventTicket;
}

// EVENT PEOPLE

declare type EventPeople = {
  id: number;
  $id: number;
  firstname: string;
  lastname: string;
  email: string;
  date: Date;
  eventTicket: EventTicket;
  payment: Payment;
  event: Events;
};

declare interface EventPeopleTableProps {
  eventPeople: EventPeople[];
}

declare interface CreateEventPeopleParams {
  firstname: string;
  lastname: string;
  email: string;
  date: Date;
  eventTicketId: number;
  paymentId: number;
  eventId: number;
}

declare interface EventPeopleFormProps {
  eventId?: number;
  eventPeople?: EventPeople;
}

declare interface UpdateEventPeopleParams {
  id: number;
  eventPeople: CreateEventPeopleParams;
}

// PAYMENT

declare type Payment = {
  id: number;
  $id: number;
  name: string;
};

// PARTNER

declare type Partner = {
  id: number;
  name: string;
  date: Date;
  description: string;
  price: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  percentage: number;
  reduction: number;
  link: string;
  place?: string;
  address: string ;
  offerLimit: number;
  offerTemp: Date;
  isPublished: boolean;
  association: Association;
  partnerType: PartnerType;
  subPartnerType: SubPartnerType;
  displayType: DisplayType;
};

declare type PartnerType = {
  id: number;
  $id: number;
  name: string;
};

declare type SubPartnerType = {
  id: number;
  $id: number;
  name: string;
};

declare interface PartnerTableProps {
  partners: Partner[];
}

declare interface CreatePartnerParams {
  name: string;
  date: Date;
  description: string;
  price: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  percentage: number;
  reduction: number;
  link: string;
  place?: string;
  address: string ;
  offerLimit: number;
  offerTemp: Date;
  isPublished: boolean;
  associationId: number;
  partnerTypeId: number;
  subPartnerTypeId: number;
  displayTypeId: number;
}

declare interface PartnerFormProps {
  partner?: Partner;
  associationId: number;
}

declare interface UpdatePartnerParams {
  id: number;
  partner: CreatePartnerParams;
}

//DEAL

declare type Deal = {
  id: number;
  title: string;
  isPublished: boolean;
  association: Association;
  company: Company;
  format: Format;
  offerType: OfferType;
  dealType: DealType;
  dealCategory: DealCategory
  subDealCategory: SubDealCategory;
  displayType: DisplayType;
};

declare type Company = {
  id: number;
  $id: number;
  name: string;
};

declare type Format = {
  id: number;
  $id: number;
  name: string;
};

declare type OfferType = {
  id: number;
  $id: number;
  name: string;
};

declare type DealType = {
  id: number;
  $id: number;
  name: string;
};

declare type DealCategory = {
  id: number;
  $id: number;
  name: string;
};

declare type SubDealCategory = {
  id: number;
  $id: number;
  name: string;
};

declare interface DealTableProps {
  deals: Deal[];
}

declare interface CreateDealParams {
  title: string;
  isPublished: boolean;
  associationId: number;
  companyId: number;
  formatId: number;
  offerTypeId: number;
  dealTypeId: number;
  dealCategoryId: number;
  subDealCategoryId: number;
  displayTypeId: number;
}

declare interface DealFormProps {
  deal?: Deal;
  associationId: number;
}

declare interface UpdateDealParams {
  id: number;
  deal: CreateDealParams;
}

// OTHER

declare interface pageProps {
  params: {
    id: number;
  };
  searchParams: Record<any>;
}

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare interface MobileNavProps {
  user: User;
}

declare interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare interface ButtonProps {
  id: number;
  action: any;
}

declare interface FooterProps {
  user: User;
  type?: 'mobile' | 'desktop'
}

declare interface SiderbarProps {
  user: User;
}

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

declare interface BadgeProps {
  status: boolean;
}

declare interface DropdownProps {
  setValue?: UseFormSetValue<any>;
  defaultValue: string;
  otherStyles?: string;
}