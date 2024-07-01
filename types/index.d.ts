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

declare interface EventPriceTableProps {
  eventPrice: EventPrice[];
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

// EVENT PRICE

declare type EventPrice = {
  id: number;
  $id: number;
  name: string;
  price: string;
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