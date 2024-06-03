'use client';

import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {useForm} from "react-hook-form";
import * as z from "zod";
import {EventTypeDropdown} from "../dropdown/EventTypeDropdown";
import {Button} from "../ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {Input} from "../ui/input";
import {Textarea} from "../ui/textarea";
import {createEvent} from "@/lib/actions/event.actions";
import {SubEventTypeDropdown} from "@/components/dropdown/SubEventTypeDropdown";
import {DisplayTypeDropdown} from "@/components/dropdown/DisplayTypeDropdown";
import {Switch} from "../ui/switch";

const formSchema = z.object({
  association: z.number(),
  displayType: z.number(),
  eventType: z.number(),
  subEventType: z.number(),
  title: z.string().min(4, "Event name is too short"),
  description: z.string().min(4, "Description is too short"),
  logo: z.string().optional(),
  isPublished: z.boolean(),
  isPlace: z.boolean(),
  place: z.string().optional(),
  isDate: z.boolean(),
  date: z.string().optional(),
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

const EventForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      association: 1,
      displayType: 0,
      eventType: 0,
      subEventType: 0,
      title: "",
      description: "",
      logo: "",
      isPublished: false,
      isPlace: false,
      isDate: false,
      isEndDate: false,
      isHour: false,
      isEndHour: false,
      isAddress: false,
      isPeopleLimit: false,
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const event = {
        associationId: data.association,
        displayTypeId: data.displayType,
        eventTypeId: data.eventType,
        subEventTypeId: data.subEventType,
        title: data.title,
        description: data.description,
        logo: data.logo,
        isPublished: data.isPublished,
        isPlace: data.isPlace,
        place: data.place,
        isDate: data.isDate,
        date: data.date,
        isEndDate: data.isEndDate,
        endDate: data.endDate,
        isHour: data.isHour,
        hour: data.hour,
        isEndHour: data.isEndHour,
        endHour: data.endHour,
        isAddress: data.isAddress,
        address: data.address,
        isPeopleLimit: data.isPeopleLimit,
        peopleLimit: data.peopleLimit ? parseInt(data.peopleLimit, 10) : undefined,
      };
      const newEvent = await createEvent(event);

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
                      placeholder="Entrez le titre de l'événement"
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
                      placeholder="Description de l'événement"
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

        {/*<div className="flex flex-col gap-1 border-t border-gray-200 pb-5 pt-6">*/}
        {/*  <h2 className="text-[18px] leading-[22px] font-semibold text-gray-900">*/}
        {/*    Bank account details*/}
        {/*  </h2>*/}
        {/*  <p className="text-[16px] leading-[24px] font-normal text-gray-600">*/}
        {/*    Enter the bank account details of the recipient*/}
        {/*  </p>*/}
        {/*</div>*/}

        <FormField
          control={form.control}
          name="peopleLimit"
          render={({field}) => (
            <FormItem className="border-y border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 py-5">
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

        <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 py-5">
          <div className="flex flex-col gap-5 w-full">
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
            </div>
            <div className="flex items-center gap-2">
              <FormControl>
                <Switch
                  checked={form.watch('isDate')}
                  onCheckedChange={(checked) => form.setValue('isDate', checked)}
                />
              </FormControl>
              <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                Date
              </FormLabel>
            </div>
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
              <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                Lieu
              </FormLabel>
            </div>
            <div className="flex items-center gap-2">
              <FormControl>
                <Switch
                  checked={form.watch('isAddress')}
                  onCheckedChange={(checked) => form.setValue('isAddress', checked)}
                />
              </FormControl>
              <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                Adresse
              </FormLabel>
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
            </div>
          </div>
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
