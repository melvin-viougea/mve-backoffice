// ENTITY

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

declare interface RightSidebarProps {
    user: User;
    transactions: Transaction[];
    banks: Bank[] & Account[];
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