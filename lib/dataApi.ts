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