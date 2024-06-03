//TODO mettre SVG a la place des PNG
export const sidebarLinks = [
  {
    imgURL: "/icons/tdb.png",
    route: "/",
    label: "Tableau de bord",
  },
  {
    imgURL: "/icons/team.png",
    route: "/equipe",
    label: "Espace d'équipe",
  },
  {
    imgURL: "/icons/calendar.png",
    route: "/calendrier",
    label: "Calendrier",
  },
  {
    imgURL: "/icons/plus.png",
    route: "/evenement",
    label: "Évènement",
  },
  {
    imgURL: "/icons/shop.png",
    route: "/marketplace",
    label: "Marketplace",
  },
  {
    imgURL: "/icons/data.png",
    route: "/partenaires",
    label: "Partenaires",
  },
  {
    imgURL: "/icons/home.png",
    route: "/communaute",
    label: "Communauté",
  },
  {
    imgURL: "/icons/db.png",
    route: "/gestion-asso",
    label: "Gestion de l'asso",
  },
  {
    imgURL: "/icons/school.png",
    route: "/formation",
    label: "Formations",
  },
  {
    imgURL: "/icons/help.png",
    route: "/accompagnement",
    label: "Besoin d'accompagnement",
  },
  {
    imgURL: "/icons/setting.png",
    route: "/parametre",
    label: "Paramétrage",
  },
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN =
  "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
  {
    id: "6624c02e00367128945e", // appwrite item Id
    accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
    itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
  },
  {
    id: "6627f07b00348f242ea9", // appwrite item Id
    accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
    itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
    userId: "6627ed3d00267aa6fa3e",
    accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
  },
];

export const topCategoryStyles = {
  "Food and Drink": {
    bg: "bg-blue-25",
    circleBg: "bg-blue-100",
    text: {
      main: "text-blue-900",
      count: "text-blue-700",
    },
    progress: {
      bg: "bg-blue-100",
      indicator: "bg-blue-700",
    },
    icon: "/icons/monitor.svg",
  },
  Travel: {
    bg: "bg-success-25",
    circleBg: "bg-success-100",
    text: {
      main: "text-success-900",
      count: "text-success-700",
    },
    progress: {
      bg: "bg-success-100",
      indicator: "bg-success-700",
    },
    icon: "/icons/coins.svg",
  },
  default: {
    bg: "bg-pink-25",
    circleBg: "bg-pink-100",
    text: {
      main: "text-pink-900",
      count: "text-pink-700",
    },
    progress: {
      bg: "bg-pink-100",
      indicator: "bg-pink-700",
    },
    icon: "/icons/shopping-bag.svg",
  },
};

export const statusStyles = {
  true: {
    borderColor: "border-green-600",
    backgroundColor: "bg-green-500",
    textColor: "text-green-700",
    chipBackgroundColor: "bg-inherit",
  },
  false: {
    borderColor: "border-yellow-600",
    backgroundColor: "bg-yellow-500",
    textColor: "text-yellow-700",
    chipBackgroundColor: "bg-inherit",
  },
  default: {
    borderColor: "",
    backgroundColor: "bg-blue-500",
    textColor: "text-blue-700",
    chipBackgroundColor: "bg-inherit",
  },
};
