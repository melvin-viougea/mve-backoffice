export const sidebarLinks = [
  {
    imgURL: "/icons/sidebar/tdb.svg",
    route: "/",
    label: "Tableau de bord",
  },
  {
    imgURL: "/icons/sidebar/team.svg",
    route: "/equipe",
    label: "Espace d'équipe",
  },
  {
    imgURL: "/icons/sidebar/calendar.svg",
    route: "/calendrier",
    label: "Calendrier",
  },
  {
    imgURL: "/icons/sidebar/plus.svg",
    route: "/evenement",
    label: "Évènement",
  },
  {
    imgURL: "/icons/sidebar/shop.svg",
    route: "/marketplace",
    label: "Marketplace",
  },
  {
    imgURL: "/icons/sidebar/data.svg",
    route: "/bon-plans",
    label: "Bon Plans",
  },
  {
    imgURL: "/icons/sidebar/home.svg",
    route: "/communaute",
    label: "Communauté",
  },
  {
    imgURL: "/icons/sidebar/db.svg",
    route: "/gestion-asso",
    label: "Gestion de l'asso",
  },
  {
    imgURL: "/icons/sidebar/school.svg",
    route: "/formation",
    label: "Formations",
  },
  {
    imgURL: "/icons/sidebar/help.svg",
    route: "/accompagnement",
    label: "Besoin d'accompagnement",
  },
  {
    imgURL: "/icons/sidebar/setting.svg",
    route: "/parametre",
    label: "Paramétrage",
  },
];

export const sidebarAdminLinks = [
  {
    imgURL: "/icons/sidebar/tdb.svg",
    route: "/admin/dashboard",
    label: "Tableau de bord",
  },
  {
    imgURL: "/icons/sidebar/team.svg",
    route: "/admin/utilisateurs",
    label: "Utilisateurs",
  },
  {
    imgURL: "/icons/sidebar/shop.svg",
    route: "/admin/association",
    label: "Assos",
  },
  {
    imgURL: "/icons/sidebar/plus.svg",
    route: "/admin/campus",
    label: "Campus",
  },
  {
    imgURL: "/icons/sidebar/data.svg",
    route: "/admin/bon-plans",
    label: "Bon plans",
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
