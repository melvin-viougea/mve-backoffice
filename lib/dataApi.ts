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
    campusType: {
      id: campus.campusType.id,
      name: campus.campusType.name,
    },
  };
}
