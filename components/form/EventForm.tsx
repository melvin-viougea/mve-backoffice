'use client';

import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {EventTypeDropdown} from "../dropdown/EventTypeDropdown";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {createEvent, updateEvent} from "@/lib/actions/event.actions";
import {SubEventTypeDropdown} from "@/components/dropdown/SubEventTypeDropdown";
import {DisplayTypeDropdown} from "@/components/dropdown/DisplayTypeDropdown";
import {Switch} from "@/components/ui/switch";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {EventFormProps} from "@/types";
import {Pagination} from "@/components/Pagination";
import EventTicketTable from "@/components/table/form/EventTicketTable";
import EventPeopleTable from "@/components/table/form/EventPeopleTable";
import Link from "next/link";

const EventForm = ({event, associationId}: EventFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    association: z.number().min(1, { message: "L'association n'est pas correctement définie" }),
    displayType: z.number().min(1, { message: "Le type d'affichage n'est pas correctement défini" }),
    eventType: z.number().min(1, { message: "Le type d'événement n'est pas correctement défini" }),
    subEventType: z.number().min(1, { message: "Le sous-type d'événement n'est pas correctement défini" }),
    title: z.string().min(1, { message: "Le titre doit contenir au moins 1 caractère" }).max(50, { message: "Le titre doit contenir au maximum 50 caractères" }),
    description: z.string().min(1, { message: "La description doit contenir au moins 1 caractère" }).max(50, { message: "La description doit contenir au maximum 50 caractères" }),
    logo: z.instanceof(File).optional(),
    date: z.string().refine(value => {
      return !isNaN(Date.parse(value));
    }, { message: "Date invalide" }),
    isPublished: z.boolean(),
    isPlace: z.boolean(),
    place: z.string().min(1, { message: "Le lieu doit contenir au moins 1 caractère" }).max(50, { message: "Le lieu doit contenir au maximum 50 caractères" }).optional(),
    isEndDate: z.boolean(),
    endDate: z.string().refine(value => {
      return !isNaN(Date.parse(value));
    }, { message: "Date invalide" }).optional(),
    isHour: z.boolean(),
    hour: z.string().optional(),
    isEndHour: z.boolean(),
    endHour: z.string().optional(),
    isAddress: z.boolean(),
    address: z.string().min(1, { message: "L'adresse doit contenir au moins 1 caractère" }).max(50, { message: "L'adresse doit contenir au maximum 50 caractères" }).optional(),
    isPeopleLimit: z.boolean(),
    peopleLimit: z.string()
      .min(1, { message: "Le nombre de personnes doit être au moins 1" })
      .max(6, { message: "Le nombre de personnes ne peut pas excéder 999999" })
      .refine(value => {
        const numberValue = parseInt(value, 10);
        return !isNaN(numberValue) && numberValue >= 1 && numberValue <= 999999;
      }, { message: "Le nombre de personnes doit être un nombre valide entre 1 et 999999" })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      association: event ? event.association.id : associationId,
      displayType: event ? event.displayType.id : 0,
      eventType: event ? event.eventType.id : 0,
      subEventType: event ? event.subEventType.id : 0,
      title: event ? event.title : "",
      description: event ? event.description : "",
      logo: undefined,
      date: event ? new Date(event.date).toISOString().split('T')[0] : "",
      isPublished: event ? event.isPublished : false,
      isPlace: event ? event.isPlace : false,
      place: event?.place ? event.place : undefined,
      isEndDate: event ? event.isEndDate : false,
      endDate: event?.endDate ? new Date(event.endDate).toISOString().split('T')[0] : undefined,
      isHour: event ? event.isHour : false,
      hour: event?.hour ? new Date(event.hour).toISOString().split('T')[1].slice(0, 5) : undefined,
      isEndHour: event ? event.isEndHour : false,
      endHour: event?.endHour ? new Date(event.endHour).toISOString().split('T')[1].slice(0, 5) : undefined,
      isAddress: event ? event.isAddress : false,
      address: event?.address ? event.address : undefined,
      isPeopleLimit: event ? event.isPeopleLimit : false,
      peopleLimit: event?.peopleLimit ? event.peopleLimit.toString() : undefined
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const eventData = {
        associationId: data.association,
        displayTypeId: data.displayType,
        eventTypeId: data.eventType,
        subEventTypeId: data.subEventType,
        title: data.title,
        description: data.description,
        logo: data.logo ? URL.createObjectURL(data.logo) : undefined,
        date: new Date(data.date),
        isPlace: data.isPlace,
        place: data.place ? data.place : undefined,
        isEndDate: data.isEndDate,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        isHour: data.isHour,
        hour: data.hour ? new Date(`1970-01-01T${data.hour}:00`) : undefined,
        isEndHour: data.isEndHour,
        endHour: data.endHour ? new Date(`1970-01-01T${data.endHour}:00`) : undefined,
        isAddress: data.isAddress,
        address: data.address ? data.address : undefined,
        isPeopleLimit: data.isPeopleLimit,
        peopleLimit: data.peopleLimit ? parseInt(data.peopleLimit) : undefined,
        isPublished: data.isPublished,
      };

      if (event) {
        const updatedEvent = await updateEvent({id: event.id, event: eventData});
        if (updatedEvent) {
          form.reset();
          router.push('/evenement');
        }
      } else {
        const newEvent = await createEvent(eventData);
        if (newEvent) {
          form.reset();
          router.push('/evenement');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const currentPagePrice = 1;
  const eventTicket = event ? event.eventTicket : [];

  const rowsPerPagePrice = 10;
  const totalPagesPrice = Math.ceil(eventTicket.length / rowsPerPagePrice);

  const indexOfLastEventTicket = currentPagePrice * rowsPerPagePrice;
  const indexOfFirstEventTicket = indexOfLastEventTicket - rowsPerPagePrice;

  const currentEventTicket = eventTicket.slice(
    indexOfFirstEventTicket, indexOfLastEventTicket
  )

  const currentPagePeople = 1;
  const eventPeople = event ? event.eventPeople : [];

  const rowsPerPagePeople = 10;
  const totalPagesPeople = Math.ceil(eventPeople.length / rowsPerPagePeople);

  const indexOfLastEventPeople = currentPagePeople * rowsPerPagePeople;
  const indexOfFirstEventPeople = indexOfLastEventPeople - rowsPerPagePeople;

  const currentEventPeople = eventPeople.slice(
    indexOfFirstEventPeople, indexOfLastEventPeople
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">

        <FormField
          control={form.control}
          name="isPublished"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Publier sur l&apos;application
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Publier maintenant l&apos;événement ou le garder en tant que brouillon
                  </FormDescription>
                </div>
                <div className="flex flex-col">
                  <FormControl>
                    <Switch
                      checked={form.watch('isPublished')}
                      onCheckedChange={(checked) => form.setValue('isPublished', checked)}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="eventType"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Type d&apos;événement
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Sélectionnez le type d&apos;événement que vous souhaitez
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <EventTypeDropdown
                      setValue={form.setValue}
                      defaultValue={form.watch("eventType").toString()}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subEventType"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Sous-type d&apos;événement
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Sélectionnez le sous-type d&apos;événement que vous souhaitez
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <SubEventTypeDropdown
                      setValue={form.setValue}
                      defaultValue={form.watch("subEventType").toString()}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="displayType"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Type d&apos;affichage
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Sélectionnez le type d&apos;affichage que vous souhaitez
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <DisplayTypeDropdown
                      setValue={form.setValue}
                      defaultValue={form.watch("displayType").toString()}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-5 pt-6">
                <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                  Titre
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Entrez le titre"
                      className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Description
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Logo de l&apos;événement :
                  </FormLabel>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Date
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                </div>
                <div className="flex flex-col">
                  <FormControl>
                    <Input
                      type="date"
                      className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Date de fin
                  </FormLabel>
                </div>
                <div className="flex flex-col">
                  <FormControl>
                    <Input
                      type="date"
                      className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hour"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Hour
                  </FormLabel>
                </div>
                <div className="flex flex-col">
                  <FormControl>
                    <Input
                      type="time"
                      className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endHour"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Heure de fin
                  </FormLabel>
                </div>
                <div className="flex flex-col">
                  <FormControl>
                    <Input
                      type="time"
                      className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="place"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-5 pt-6">
                <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                  Lieu
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Entrez le lieu"
                      className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-5 pt-6">
                <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                  Adresse
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Entrez l'adresse"
                      className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="peopleLimit"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-5 pt-6">
                <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                  Limite de participants
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="ex: 200"
                      className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="max-w-[850px] gap-3 pb-5 border-t border-gray-200">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-[14px] leading-[20px] w-full font-medium text-gray-700">
                Tarifs
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row mb-3">
                  <Link
                    href={`/evenement/ajout/ticket/${event?.id}`}
                    className="text-[14px] leading-[20px] rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
                  >
                    Ajouter un ticket
                  </Link>
                </div>
                <section className="flex w-full flex-col gap-6">
                  <EventTicketTable
                    eventTicket={currentEventTicket}
                  />
                  {totalPagesPrice > 1 && (
                    <div className="my-4 w-full">
                      <Pagination totalPages={totalPagesPrice} page={currentPagePrice}/>
                    </div>
                  )}
                </section>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-[14px] leading-[20px] w-full font-medium text-gray-700">
                Participants
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row mb-3">
                  <Link
                    href={`/evenement/ajout/participant/${event?.id}`}
                    className="text-[14px] leading-[20px] rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700"
                  >
                    Ajouter un participant
                  </Link>
                </div>
                <section className="flex w-full flex-col gap-6">
                  <EventPeopleTable
                    eventPeople={currentEventPeople}
                  />
                  {totalPagesPeople > 1 && (
                    <div className="my-4 w-full">
                      <Pagination totalPages={totalPagesPeople} page={currentPagePeople}/>
                    </div>
                  )}
                </section>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-5 flex w-full max-w-[850px] gap-3 border-gray-200 py-5">
          <Button type="submit" className="text-[14px] leading-[20px] w-full bg-primary font-semibold text-white shadow-form !important">
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin"/> &nbsp; Envoie...
              </>
            ) : (
              <>
                {event ? "Éditer l'événement" : "Enregistrer l'événement"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
