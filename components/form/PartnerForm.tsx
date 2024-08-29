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
import {Textarea} from "@/components/ui/textarea";
import {DisplayTypeDropdown} from "@/components/dropdown/DisplayTypeDropdown";
import {Switch} from "@/components/ui/switch";
import {PartnerFormProps} from "@/types";
import {createPartner, updatePartner} from "@/lib/actions/partner.actions";
import {PartnerTypeDropdown} from "@/components/dropdown/PartnerTypeDropdown";
import {SubPartnerTypeDropdown} from "@/components/dropdown/SubPartnerTypeDropdown";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const PartnerForm = ({partner, associationId}: PartnerFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    association: z.number().min(1, { message: "L'association n'est pas correctement définie" }),
    partnerType: z.number().min(1, { message: "Le type de partenaire n'est pas correctement défini" }),
    subPartnerType: z.number().min(1, { message: "Le sous-type de partenaire n'est pas correctement défini" }),
    displayType: z.number().min(1, { message: "Le type d'affichage n'est pas correctement défini" }),
    name: z.string().min(1, { message: "Le nom doit contenir au moins 1 caractère" }).max(50, { message: "Le nom doit contenir au maximum 50 caractères" }),
    description: z.string().min(1, { message: "La description doit contenir au moins 1 caractère" }).max(50, { message: "La description doit contenir au maximum 50 caractères" }),
    date: z.string().refine(value => {
      return !isNaN(Date.parse(value));
    }, { message: "Date invalide" }),
    isPublished: z.boolean(),
    place: z.string().min(1, { message: "Le lieu doit contenir au moins 1 caractère" }).max(50, { message: "Le lieu doit contenir au maximum 50 caractères" }),
    address: z.string().min(1, { message: "L'adresse doit contenir au moins 1 caractère" }).max(50, { message: "L'adresse doit contenir au maximum 50 caractères" }),
    firstname: z.string().min(1, { message: "Le prénom doit contenir au moins 1 caractère" }).max(50, { message: "Le prénom doit contenir au maximum 50 caractères" }),
    lastname: z.string().min(1, { message: "Le nom de famille doit contenir au moins 1 caractère" }).max(50, { message: "Le nom de famille doit contenir au maximum 50 caractères" }),
    role: z.string().min(1, { message: "Le rôle doit contenir au moins 1 caractère" }).max(50, { message: "Le rôle doit contenir au maximum 50 caractères" }),
    email: z.string().email(),
    phone: z.string().length(10, { message: "Le numéro de téléphone doit contenir 10 caractères" }),
    link: z.string().min(1, { message: "Le lien doit contenir au moins 1 caractère" }).max(150, { message: "Le lien doit contenir au maximum 150 caractères" }),
    price: z.string()
      .min(1, { message: "Le prix doit être au moins 1" })
      .max(4, { message: "Le prix ne peut pas excéder 9999" })
      .refine(value => {
        const numberValue = parseInt(value, 10);
        return !isNaN(numberValue) && numberValue >= 1 && numberValue <= 9999;
      }, { message: "Le nombre de personnes doit être un nombre valide entre 1 et 9999" }),
    percentage: z.string()
      .min(1, { message: "Le pourcentage doit être au moins 0%" })
      .max(3, { message: "Le pourcentage ne peut pas excéder 999" })
      .refine(value => {
        const numberValue = parseInt(value, 10);
        return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 100;
      }, { message: "Le pourcentage doit être un nombre valide entre 0% et 100%" }),
    reduction: z.string()
      .min(1, { message: "La réduction doit être au moins 0%" })
      .max(3, { message: "Le réduction ne peut pas excéder 999" })
      .refine(value => {
        const numberValue = parseInt(value, 10);
        return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 100;
      }, { message: "Le réduction doit être un nombre valide entre 0% et 100%" }),
    offerLimit: z.string()
      .min(1, { message: "La réduction doit être au moins 0%" })
      .max(3, { message: "Le réduction ne peut pas excéder 999" })
      .refine(value => {
        const numberValue = parseInt(value, 10);
        return !isNaN(numberValue) && numberValue >= 0 && numberValue <= 100;
      }, { message: "Le réduction doit être un nombre valide entre 0% et 100%" }),
    offerTemp: z.string().refine(value => {
      return !isNaN(Date.parse(value));
    }, { message: "Date d'offre invalide" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      association: partner ? partner.association.id : associationId,
      displayType: partner ? partner.displayType.id : 0,
      partnerType: partner ? partner.partnerType.id : 0,
      subPartnerType: partner ? partner.subPartnerType.id : 0,
      name: partner ? partner.name : "",
      description: partner ? partner.description : "",
      date: partner ? new Date(partner.date).toISOString().split('T')[0] : "",
      isPublished: partner ? partner.isPublished : false,
      place: partner?.place ? partner.place : undefined,
      address: partner?.address ? partner.address : undefined,
      firstname: partner?.firstname ? partner.firstname : undefined,
      lastname: partner?.lastname ? partner.lastname : undefined,
      role: partner?.role ? partner.role : undefined,
      email: partner?.email ? partner.email : undefined,
      phone: partner?.phone ? partner.phone : undefined,
      link: partner?.link ? partner.link : undefined,
      price: partner?.price ? partner.price.toString() : undefined,
      percentage: partner?.percentage ? partner.percentage.toString() : undefined,
      reduction: partner?.reduction ? partner.reduction.toString() : undefined,
      offerLimit: partner?.offerLimit ? partner.offerLimit.toString() : undefined,
      offerTemp: partner ? new Date(partner.offerTemp).toISOString().split('T')[0] : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const partnerData = {
        associationId: data.association,
        displayTypeId: data.displayType,
        partnerTypeId: data.partnerType,
        subPartnerTypeId: data.subPartnerType,
        isPublished: data.isPublished,
        name: data.name,
        description: data.description,
        date: new Date(data.date),
        place: data.place,
        firstname: data.firstname,
        lastname: data.lastname,
        role: data.role,
        address: data.address,
        email: data.email,
        phone: data.phone,
        link: data.link,
        price: parseInt(data.price),
        percentage: parseInt(data.percentage),
        reduction: parseInt(data.reduction),
        offerLimit: parseInt(data.offerLimit),
        offerTemp: new Date(data.date),
      };

      if (partner) {
        const updatedPartner = await updatePartner({id: partner.id, partner: partnerData});
        if (updatedPartner) {
          form.reset();
          router.push('/partenaire');
        }
      } else {
        const newPartner = await createPartner(partnerData);
        if (newPartner) {
          form.reset();
          router.push('/partenaire');
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
          name="partnerType"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Type de partenaire
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Sélectionnez le type de partenaire que vous souhaitez
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <PartnerTypeDropdown
                      setValue={form.setValue}
                      defaultValue={form.watch("partnerType").toString()}
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
          name="subPartnerType"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Sous-type de partenaire
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Sélectionnez le sous-type de partenaire que vous souhaitez
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <SubPartnerTypeDropdown
                      setValue={form.setValue}
                      defaultValue={form.watch("subPartnerType").toString()}
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
          name="place"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-5 pt-6">
                <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                  Lieu
                  <span className="text-destructive ml-1">*</span>
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
                  <span className="text-destructive ml-1">*</span>
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
          name="price"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-5 pt-6">
                <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                  Prix
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="ex: 4€"
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
                Contact
              </AccordionTrigger>
              <AccordionContent>

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
                  name="phone"
                  render={({field}) => (
                    <FormItem className="border-t border-gray-200">
                      <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-5 pt-6">
                        <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                          Téléphone
                          <span className="text-destructive ml-1">*</span>
                        </FormLabel>
                        <div className="flex w-full flex-col">
                          <FormControl>
                            <Input
                              placeholder="Entrez le téléphone"
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
                  name="role"
                  render={({field}) => (
                    <FormItem className="border-t border-gray-200">
                      <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-5 pt-6">
                        <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                          Rôle
                          <span className="text-destructive ml-1">*</span>
                        </FormLabel>
                        <div className="flex w-full flex-col">
                          <FormControl>
                            <Input
                              placeholder="Entrez le rôle"
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
                {partner ? "Éditer le partenaire" : "Enregistrer le partenaire"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PartnerForm;
