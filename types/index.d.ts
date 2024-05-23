declare type SignUpParams = {
    firstname: string;
    lastname: string;
    address: string;
    city: string;
    postalCode: string;
    email: string;
    password: string;
};

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

declare interface getDataProps {
    id: string;
}

declare interface createDataProps {
    data: string;
}

declare interface updateDataProps {
    id: string;
    data: string;
}

declare interface deleteDataProps {
    id: string;
}