'use client';

import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {createEventPeople, updateEventPeople} from "@/lib/actions/eventPeople.actions";
import {EventPeopleFormProps} from "@/types";
import {EventTicketDropdown} from "@/components/dropdown/EventTicketDropdown";
import {PaymentDropdown} from "@/components/dropdown/PaymentDropdown";

const EventPeopleForm = ({eventPeople, eventId}: EventPeopleFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    event: z.number().min(1, { message: "L'événement n'est pas correctement définie" }),
    eventTicket: z.number().min(1, { message: "Le ticket n'est pas correctement définie" }),
    payment: z.number().min(1, { message: "Le paiement n'est pas correctement défini" }),
    firstname: z.string().min(1, { message: "Le prénom doit contenir au moins 1 caractère" }).max(30, { message: "Le prénom doit contenir au maximum 30 caractères" }),
    lastname: z.string().min(1, { message: "Le nom doit contenir au moins 1 caractère" }).max(30, { message: "Le nom doit contenir au maximum 30 caractères" }),
    email: z.string().email(),
    date: z.string().refine(value => {
      return !isNaN(Date.parse(value));
    }, { message: "Date invalide" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event: eventPeople ? eventPeople.event.id : eventId,
      eventTicket: eventPeople ? eventPeople.eventTicket.id : 0,
      payment: eventPeople ? eventPeople.payment.id : 0,
      firstname: eventPeople ? eventPeople.firstname : "",
      lastname: eventPeople ? eventPeople.lastname : "",
      email: eventPeople ? eventPeople.email : "",
      date: eventPeople ? new Date(eventPeople.date).toISOString().split('T')[0] : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const eventPeopleData = {
        eventId: data.event,
        eventTicketId: data.eventTicket,
        paymentId: data.payment,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        date: new Date(data.date),
      };

      if (eventPeople) {
        const updatedEventPeople = await updateEventPeople({id: eventPeople.id, eventPeople: eventPeopleData});
        if (updatedEventPeople) {
          form.reset();
          router.push('/evenement');
        }
      } else {
        const newEventPeople = await createEventPeople(eventPeopleData);
        if (newEventPeople) {
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
          name="firstname"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-5 pt-6">
                <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                  Prénom
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Entrez le prénom"
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
          name="lastname"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-5 pt-6">
                <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                  Nom
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Entrez le nom"
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
          name="email"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-5 pt-6">
                <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                  Email
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Entrez l'email"
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
          name="eventTicket"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Ticket
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Sélectionnez le ticket du participant
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <EventTicketDropdown
                      setValue={form.setValue}
                      defaultValue={form.watch("eventTicket").toString()}
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
          name="payment"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Paiement
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Sélectionnez le ticket du participant
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <PaymentDropdown
                      setValue={form.setValue}
                      defaultValue={form.watch("payment").toString()}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="mt-5 flex w-full max-w-[850px] gap-3 border-gray-200 py-5">
          <Button type="submit" className="text-[14px] leading-[20px] w-full bg-primary font-semibold text-white shadow-form !important">
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin"/> &nbsp; Envoie...
              </>
            ) : (
              <>
                {eventPeople ? "Éditer le participant" : "Enregistrer le participant"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventPeopleForm;
