import {EventPeople, EventTicket} from "@/types";

export async function getEventData(event: any) {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    logo: event.logo,
    date: event.date,
    isPublished: event.isPublished,
    isPlace: event.isPlace,
    place: event.place,
    isEndDate: event.isEndDate,
    endDate: event.endDate,
    isHour: event.isHour,
    hour: event.hour,
    isEndHour: event.isEndHour,
    endHour: event.endHour,
    isAddress: event.isAddress,
    address: event.address,
    isPeopleLimit: event.isPeopleLimit,
    peopleLimit: event.peopleLimit,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    association: {
      id: event.association.id,
      name: event.association.name,
    },
    eventTicket: event.eventTicket.map((ticket: EventTicket) => ({
      id: ticket.id,
      name: ticket.name,
      price: ticket.price,
    })),
    eventPeople: event.eventPeople.map((people: EventPeople) => ({
      id: people.id,
      firstname: people.firstname,
      lastname: people.lastname,
      email: people.email,
      date: people.date,
      eventTicket: people.eventTicket ? {
        id: people.eventTicket.id,
        name: people.eventTicket.name,
        price: people.eventTicket.price
      } : null,
      payment: people.payment ? {
        id: people.payment.id,
        name: people.payment.name,
      } : null,
    })),
    eventType: {
      id: event.eventType.id,
      name: event.eventType.name,
    },
    subEventType: {
      id: event.subEventType.id,
      name: event.subEventType.name,
    },
    displayType: {
      id: event.displayType.id,
      name: event.displayType.name,
    },
  };
}

export async function getAssociationData(association: any) {
  return {
    id: association.id,
    name: association.name,
    image: association.image,
    title: association.title,
    description: association.description,
    firstname: association.firstname,
    lastname: association.lastname,
    email: association.email,
    phone: association.phone,
    role: association.role,
    campus: {
      id: association.campus.id,
      name: association.campus.name,
    },
    associationType: {
      id: association.associationType.id,
      name: association.associationType.name,
    },
  };
}

export async function getUserData(user: any) {
  return {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    address: user.address,
    city: user.city,
    postalCode: user.postalCode,
    email: user.email,
    association: {
      id: user.association.id,
      name: user.association.name,
      image: user.association.image,
      campus: {
        id: user.association.campus.id,
        name: user.association.campus.name
      }
    },
  };
}

export async function getCampusData(campus: any) {
  return {
    id: campus.id,
    name: campus.name,
    description: campus.description,
    city: campus.city,
    address: campus.address,
    firstname: campus.firstname,
    lastname: campus.lastname,
    email: campus.email,
    phone: campus.phone,
    role: campus.role,
    campusType: {
      id: campus.campusType.id,
      name: campus.campusType.name,
    },
    nbStudent: {
      id: campus.nbStudent.id,
      name: campus.nbStudent.name,
    },
  };
}

export async function getEventTicketData(eventTicket: any) {
  return {
    id: eventTicket.id,
    name: eventTicket.name,
    price: eventTicket.price,
    event: {
      id: eventTicket.event.id,
      title: eventTicket.event.title,
    },
  };
}

export async function getEventPeopleData(eventPeople: any) {
  return {
    id: eventPeople.id,
    firstname: eventPeople.firstname,
    lastname: eventPeople.lastname,
    email: eventPeople.email,
    date: eventPeople.date,
    event: {
      id: eventPeople.event.id,
      title: eventPeople.event.title,
    },
    eventTicket: eventPeople.eventTicket ? {
      id: eventPeople.eventTicket.id,
      name: eventPeople.eventTicket.name,
      price: eventPeople.eventTicket.price,
    } : null,
    payment: eventPeople.payment ? {
      id: eventPeople.payment.id,
      name: eventPeople.payment.name,
    } : null,
  };
}

