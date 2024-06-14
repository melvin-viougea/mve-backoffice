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

declare interface CreateEventProps {
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

declare interface UpdateEventProps {
  id: number;
  event: CreateEventProps;
}

declare interface EventFormProps {
  event?: Events;
}

declare type Association = {
  id: string;
  $id: string;
  name: string;
};

declare type EventType = {
  id: string;
  $id: string;
  name: string;
};

declare type SubEventType = {
  id: string;
  $id: string;
  name: string;
};

declare type DisplayType = {
  id: string;
  $id: string;
  name: string;
};

// PARAM

declare type SignUpParams = {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  password: string;
};

declare interface getOneParams {
  id: number;
}

declare interface pageProps {
  params: {
    id: number;
  };
  searchParams: Record<any>;
}

declare interface createDataParams {
  data: string;
}

declare interface updateDataParams {
  id: string;
  data: string;
}

declare interface deleteDataParams {
  id: string;
}

// RESPONSE

declare interface AuthResponse {
  token: string;
  user: {
    firstname: string;
    lastname: string;
    email: string;
  };
}

// PROPS

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

declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

declare interface FooterProps {
  user: User;
  type?: 'mobile' | 'desktop'
}

declare interface SiderbarProps {
  user: User;
}

declare interface signInProps {
  email: string;
  password: string;
}

declare interface getUserInfoProps {
  userId: string;
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

declare interface EventTableProps {
  events: Events[];
}

declare interface DropdownProps {
  setValue?: UseFormSetValue<any>;
  defaultValue: string;
  otherStyles?: string;
}