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
import { createEvent } from "@/lib/actions/event.actions";
import { SubEventTypeDropdown } from "@/components/dropdown/SubEventTypeDropdown";
import { DisplayTypeDropdown } from "@/components/dropdown/DisplayTypeDropdown";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EventFormProps } from "@/types";

const formSchema = z.object({
  association: z.number(),
  displayType: z.string(),
  eventType: z.string(),
  subEventType: z.string(),
  title: z.string(),
  description: z.string(),
  logo: z.string(),
  date: z.string(),
  isPublished: z.boolean(),
  isPlace: z.boolean(),
  place: z.string(),
  isEndDate: z.boolean(),
  endDate: z.string(),
  isHour: z.boolean(),
  hour: z.string(),
  isEndHour: z.boolean(),
  endHour: z.string(),
  isAddress: z.boolean(),
  address: z.string(),
  isPeopleLimit: z.boolean(),
  peopleLimit: z.number().optional(),
});

const EventForm = ({ event }: EventFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      association: event ? event.associationId : 1,
      displayType: event ? event.displayType.id : "0",
      eventType: event ? event.eventType.id : "0",
      subEventType: event ? event.subEventType.id : "0",
      title: event ? event.title : "",
      description: event ? event.description : "",
      logo: event ? event.logo : "",
      date: event ? event.date : "",
      isPublished: event ? event.isPublished === "true" : false,
      isPlace: event ? event.isPlace : false,
      place: event ? event.place : "",
      isEndDate: event ? event.isEndDate : false,
      endDate: event ? event.endDate : "",
      isHour: event ? event.isHour : false,
      hour: event ? event.hour : "",
      isEndHour: event ? event.isEndHour : false,
      endHour: event ? event.endHour : "",
      isAddress: event ? event.isAddress : false,
      address: event ? event.address : "",
      isPeopleLimit: event ? event.isPeopleLimit : false,
      peopleLimit: event ? event.peopleLimit : undefined,
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const eventPayload = {
        associationId: data.association,
        displayTypeId: data.displayType,
        eventTypeId: data.eventType,
        subEventTypeId: data.subEventType,
        title: data.title,
        description: data.description,
        logo: data.logo || "",
        date: new Date(data.date),
        isPublished: data.isPublished,
        isPlace: data.isPlace,
        place: data.place || "",
        isEndDate: data.isEndDate,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        isHour: data.isHour,
        hour: data.hour ? new Date(data.hour) : undefined,
        isEndHour: data.isEndHour,
        endHour: data.endHour ? new Date(data.endHour) : undefined,
        isAddress: data.isAddress,
        address: data.address || "",
        isPeopleLimit: data.isPeopleLimit,
        peopleLimit: data.peopleLimit ? data.peopleLimit : undefined,
      };

      const newEvent = await createEvent(eventPayload);

      if (newEvent) {
        form.reset();
        router.push("/evenement");
      }
    } catch (error) {
      console.error("Submitting create event request failed: ", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">

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
                    Entrez la description de l&apos;événement
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

        <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 py-5">
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
          <Accordion type="multiple"  className="w-full">
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
              "Envoyer l'événement"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
