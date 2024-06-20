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
    associations: user.associations.map((assoc: any) => ({
      id: assoc.association.id,
      name: assoc.association.name,
      image: assoc.association.image,
      campus: {
          id: assoc.association.campus.id,
          name: assoc.association.campus.name
        }
    }))
  };
}

