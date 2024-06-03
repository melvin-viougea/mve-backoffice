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
  associationId: number;
  displayTypeId: number;
  eventTypeId: number;
  subEventTypeId: number;
  title: string;
  description: string;
  logo: string;
  isPublished: string;
  isPlace: boolean;
  place: string;
  isDate: boolean;
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

declare interface createEventProps {
  associationId: number;
  displayTypeId: number;
  eventTypeId: number;
  subEventTypeId: number;
  title: string;
  description: string;
  logo: string | undefined;
  isPublished: boolean;
  isPlace: boolean;
  place: string | undefined;
  isDate: boolean;
  date: string | undefined;
  isEndDate: boolean;
  endDate: string | undefined;
  isHour: boolean;
  hour: string | undefined;
  isEndHour: boolean;
  endHour: string | undefined;
  isAddress: boolean;
  address: string | undefined;
  isPeopleLimit: boolean;
  peopleLimit: number | undefined;
}

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

declare interface getDataParams {
  id: string;
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
  status: string;
}

declare interface EventTableProps {
  events: Events[];
}

declare interface DropdownProps {
  setValue?: UseFormSetValue<any>;
  otherStyles?: string;
}