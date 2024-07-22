'use client';

import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {createEventTicket, updateEventTicket} from "@/lib/actions/eventTicket.actions";
import {EventTicketFormProps} from "@/types";

const EventTicketForm = ({eventTicket, eventId}: EventTicketFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    event: z.number().min(1, { message: "L'événement n'est pas correctement définie" }),
    name: z.string().min(1, { message: "Le nom doit contenir au moins 1 caractère" }).max(50, { message: "Le nom doit contenir au maximum 50 caractères" }),
    price: z.string()
      .min(1, { message: "Le prix doit être au moins 1" })
      .max(4, { message: "Le prix ne peut pas excéder 9999" })
      .refine(value => {
        const numberValue = parseInt(value, 10);
        return !isNaN(numberValue) && numberValue >= 1 && numberValue <= 9999;
      }, { message: "Le nombre de personnes doit être un nombre valide entre 1 et 9999" })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      event: eventTicket ? eventTicket.event.id : eventId,
      name: eventTicket ? eventTicket.name : "",
      price: eventTicket?.price ? eventTicket.price.toString() : undefined
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const eventTicketData = {
        eventId: data.event,
        name: data.name,
        price: data.price ? parseInt(data.price) : undefined,
      };

      if (eventTicket) {
        const updatedEventTicket = await updateEventTicket({id: eventTicket.id, eventTicket: eventTicketData});
        if (updatedEventTicket) {
          form.reset();
          router.push('/evenement');
        }
      } else {
        const newEventTicket = await createEventTicket(eventTicketData);
        if (newEventTicket) {
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
          name="name"
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
          name="price"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-5 pt-6">
                <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                  Prix
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="ex: 10"
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

        <div className="mt-5 flex w-full max-w-[850px] gap-3 border-gray-200 py-5">
          <Button type="submit" className="text-[14px] leading-[20px] w-full bg-primary font-semibold text-white shadow-form !important">
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin"/> &nbsp; Envoie...
              </>
            ) : (
              <>
                {eventTicket ? "Éditer le ticket" : "Enregistrer le ticket"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventTicketForm;
