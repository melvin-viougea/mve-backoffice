import {UseFormSetValue} from "react-hook-form";

// USER

declare type User = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  associations: Association[];
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
  };
}

declare interface SignInParams {
  email: string;
  password: string;
}

declare interface UpdateUserParams {
  id: string;
  user: CreateUserProps;
}

declare interface UserFormProps {
  user?: User;
}

declare interface UserTableProps {
  users: User[];
}

// EVENT

declare type Events = {
  id: string;
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
  id: string;
  event: CreateEventParams;
}

declare interface EventFormProps {
  event?: Events;
}

declare interface EventTableProps {
  events: Events[];
}

// ASSOCIATION

declare type Association = {
  id: string;
  name: string;
  image: string;
  campus: Campus;
};

declare interface CreateAssociationParams {
  name: string;
  image?: string;
  campusId: number;
}

declare interface UpdateAssociationParams {
  id: string;
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
  id: string;
  name: string;
};

declare interface CreateCampusParams {
  name: string;
}

declare interface UpdateCampusParams {
  id: string;
  campus: CreateCampusParams;
}

declare interface CampusFormProps {
  campus?: Campus;
}

declare interface CampusTableProps {
  campuses: Campus[];
}

// EVENT TYPE

declare type EventType = {
  id: string;
  $id: string;
  name: string;
};

// SUB EVENT TYPE

declare type SubEventType = {
  id: string;
  $id: string;
  name: string;
};

//DISPLAY TYPE

declare type DisplayType = {
  id: string;
  $id: string;
  name: string;
};

// OTHER

declare interface pageProps {
  params: {
    id: string;
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
  id: string;
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