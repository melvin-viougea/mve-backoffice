'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { EventTypeDropdown } from "../dropdown/EventTypeDropdown";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { SubEventTypeDropdown } from "@/components/dropdown/SubEventTypeDropdown";
import { DisplayTypeDropdown } from "@/components/dropdown/DisplayTypeDropdown";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EventFormProps } from "@/types";

const EventForm = ({ event }: EventFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  console.log(event);
  const formSchema = z.object({
    association: z.number(),
    displayType: z.number(),
    eventType: z.number(),
    subEventType: z.number(),
    title: z.string(),
    description: z.string(),
    logo: z.instanceof(File).optional(),
    date: z.string(),
    isPublished: z.boolean(),
    isPlace: z.boolean(),
    place: z.string().optional(),
    isEndDate: z.boolean(),
    endDate: z.string().optional(),
    isHour: z.boolean(),
    hour: z.string().optional(),
    isEndHour: z.boolean(),
    endHour: z.string().optional(),
    isAddress: z.boolean(),
    address: z.string().optional(),
    isPeopleLimit: z.boolean(),
    peopleLimit: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      association: event ? event.associationId : 1,
      displayType: event ? parseInt(event.displayType.id) : 0,
      eventType: event ? parseInt(event.eventType.id) : 0,
      subEventType: event ? parseInt(event.subEventType.id) : 0,
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
        const updatedEvent = await updateEvent({ id: event.id, event: eventData });
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">

        <FormField
          control={form.control}
          name="eventType"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Type d&apos;événement :
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
                    Sous-type d&apos;événement :
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
                    Type d&apos;affichage :
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
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Saisissez une description de l&apos;événement
                  </FormDescription>
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
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Téléchargez un logo pour l&apos;événement
                  </FormDescription>
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
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Entrez la date
                  </FormDescription>
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
          name="isPublished"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Publier
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Publier maintenant l&apos;événement ou enregistrer le en tant que brouillon
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

        <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 py-5 border-t border-gray-200">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center gap-2">
              <FormControl>
                <Switch
                  checked={form.watch('isEndDate')}
                  onCheckedChange={(checked) => form.setValue('isEndDate', checked)}
                />
              </FormControl>
              <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                Date de fin
              </FormLabel>
              {form.watch('isEndDate') && (
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({field}) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormControl>
                        <Input
                          type="date"
                          className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <FormControl>
                <Switch
                  checked={form.watch('isHour')}
                  onCheckedChange={(checked) => form.setValue('isHour', checked)}
                />
              </FormControl>
              <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                Heure
              </FormLabel>
              {form.watch('isHour') && (
                <FormField
                  control={form.control}
                  name="hour"
                  render={({field}) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormControl>
                        <Input
                          type="time"
                          className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <FormControl>
                <Switch
                  checked={form.watch('isEndHour')}
                  onCheckedChange={(checked) => form.setValue('isEndHour', checked)}
                />
              </FormControl>
              <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                Heure de fin
              </FormLabel>
              {form.watch('isEndHour') && (
                <FormField
                  control={form.control}
                  name="endHour"
                  render={({field}) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormControl>
                        <Input
                          type="time"
                          className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full">
            <div className="flex items-center gap-2">
              <FormControl>
                <Switch
                  checked={form.watch('isPlace')}
                  onCheckedChange={(checked) => form.setValue('isPlace', checked)}
                />
              </FormControl>
              <FormLabel className="text-[14px] leading-[20px] w-full [280px] font-medium text-gray-700">
                Lieu
              </FormLabel>
              {form.watch('isPlace') && (
                <FormField
                  control={form.control}
                  name="place"
                  render={({field}) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormControl>
                        <Input
                          placeholder="Entrez le lieu"
                          className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <FormControl>
                <Switch
                  checked={form.watch('isAddress')}
                  onCheckedChange={(checked) => form.setValue('isAddress', checked)}
                />
              </FormControl>
              <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                Adresse
              </FormLabel>
              {form.watch('isAddress') && (
                <FormField
                  control={form.control}
                  name="address"
                  render={({field}) => (
                    <FormItem className="flex w-full flex-col gap-2">
                      <FormControl>
                        <Input
                          placeholder="Entrez l'adresse"
                          className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="flex items-center gap-2">
              <FormControl>
                <Switch
                  checked={form.watch('isPeopleLimit')}
                  onCheckedChange={(checked) => form.setValue('isPeopleLimit', checked)}
                />
              </FormControl>
              <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                Limite de participants
              </FormLabel>
              {form.watch('isPeopleLimit') && (
                <FormField
                  control={form.control}
                  name="peopleLimit"
                  render={({field}) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="ex: 200"
                          className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[12px] leading-[16px] text-red-500"/>
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>
        </div>

        <div className="max-w-[850px] gap-3 pb-5 border-t border-gray-200">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-[14px] leading-[20px] w-full font-medium text-gray-700">
                Tarifs
              </AccordionTrigger>
              <AccordionContent>
                aaa aa aaaaaa aa aaaaaa
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-[14px] leading-[20px] w-full font-medium text-gray-700">
                Participants
              </AccordionTrigger>
              <AccordionContent>
                aaa aa aaaaaa aa aaaaaa
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
              "Enregistrer l'événement"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
