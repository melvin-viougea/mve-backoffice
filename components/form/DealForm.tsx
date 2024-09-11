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
import {DealFormProps} from "@/types";
import {createDeal, updateDeal} from "@/lib/actions/deal.actions";
import {DealCategoryDropdown} from "@/components/dropdown/DealCategoryDropdown";
import {SubDealCategoryDropdown} from "@/components/dropdown/SubDealCategoryDropdown";
import {DealTypeDropdown} from "@/components/dropdown/DealTypeDropdown";
import {OfferTypeDropdown} from "@/components/dropdown/OfferTypeDropdown";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const DealForm = ({deal, associationId}: DealFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    association: z.number().min(1, { message: "L'association n'est pas correctement définie" }),
    dealCategory: z.number().min(1, { message: "La catégorie de bon plan n'est pas correctement défini" }),
    //subDealCategory: z.number().min(1, { message: "La sous-catégorie de bon plan n'est pas correctement défini" }),
    dealType: z.number().min(1, { message: "Le type de bon plan n'est pas correctement défini" }),
    offerType: z.number().min(1, { message: "Le type d'offre du bon plan n'est pas correctement défini" }),
    displayType: z.number().min(1, { message: "Le type d'affichage n'est pas correctement défini" }),
    title: z.string().min(1, { message: "Le titre doit contenir au moins 1 caractère" }).max(50, { message: "Le titre doit contenir au maximum 50 caractères" }),
    description: z.string().min(1, { message: "La description doit contenir au moins 1 caractère" }).max(50, { message: "La description doit contenir au maximum 50 caractères" }),
    isPublished: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      association: deal ? deal.association.id : associationId,
      displayType: deal ? deal.displayType.id : 0,
      dealCategory: deal ? deal.dealCategory.id : 0,
      //subDealCategory: deal ? deal.subDealCategory.id : 0,
      dealType: deal ? deal.dealType.id : 0,
      offerType: deal ? deal.offerType.id : 0,
      title: deal ? deal.title : "",
      description: deal ? deal.description : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const dealData = {
        associationId: data.association,
        displayTypeId: data.displayType,
        dealCategoryId: data.dealCategory,
        //subDealCategoryId: data.subDealCategory,
        dealTypeId: data.dealType,
        offerTypeId: data.offerType,
        isPublished: data.isPublished,
        title: data.title,
        description: data.description,
      };

      if (deal) {
        const updatedDeal = await updateDeal({id: deal.id, deal: dealData});
        if (updatedDeal) {
          form.reset();
          router.push('/bon-plans');
        }
      } else {
        const newDeal = await createDeal(dealData);
        if (newDeal) {
          form.reset();
          router.push('/bon-plans');
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
          name="dealCategory"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Catégorie de bon plan
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Sélectionnez la catégorie de bon plan que vous souhaitez
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <DealCategoryDropdown
                      setValue={form.setValue}
                      defaultValue={form.watch("dealCategory").toString()}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        {/*<FormField*/}
        {/*  control={form.control}*/}
        {/*  name="subDealCategory"*/}
        {/*  render={() => (*/}
        {/*    <FormItem className="border-t border-gray-200">*/}
        {/*      <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">*/}
        {/*        <div className="flex w-full max-w-[280px] flex-col gap-2">*/}
        {/*          <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">*/}
        {/*            Sous-catégorie de bon plan*/}
        {/*            <span className="text-destructive ml-1">*</span>*/}
        {/*          </FormLabel>*/}
        {/*          <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">*/}
        {/*            Sélectionnez la sous-catégorie de bon plan que vous souhaitez*/}
        {/*          </FormDescription>*/}
        {/*        </div>*/}
        {/*        <div className="flex w-full flex-col">*/}
        {/*          <FormControl>*/}
        {/*            <SubDealCategoryDropdown*/}
        {/*              setValue={form.setValue}*/}
        {/*              defaultValue={form.watch("subDealCategory").toString()}*/}
        {/*              otherStyles="!w-full"*/}
        {/*            />*/}
        {/*          </FormControl>*/}
        {/*          <FormMessage className="text-12 text-red-500"/>*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}

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
                  TItre
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

        <div className="max-w-[850px] gap-3 pb-5 border-t border-gray-200">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-[14px] leading-[20px] w-full font-medium text-gray-700">
                Type de bon plan
              </AccordionTrigger>
              <AccordionContent>

                <FormField
                  control={form.control}
                  name="dealType"
                  render={() => (
                    <FormItem className="border-t border-gray-200">
                      <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                        <div className="flex w-full max-w-[280px] flex-col gap-2">
                          <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                            Type de bon plan
                            <span className="text-destructive ml-1">*</span>
                          </FormLabel>
                          <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                            Sélectionnez le type de bon plan que vous souhaitez
                          </FormDescription>
                        </div>
                        <div className="flex w-full flex-col">
                          <FormControl>
                            <DealTypeDropdown
                              setValue={form.setValue}
                              defaultValue={form.watch("dealType").toString()}
                              otherStyles="!w-full"
                            />
                          </FormControl>
                          <FormMessage className="text-12 text-red-500"/>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

              </AccordionContent>
            </AccordionItem>



            <AccordionItem value="item-2">
              <AccordionTrigger className="text-[14px] leading-[20px] w-full font-medium text-gray-700">
                Type d&apos;offre
              </AccordionTrigger>
              <AccordionContent>

                <FormField
                  control={form.control}
                  name="offerType"
                  render={() => (
                    <FormItem className="border-t border-gray-200">
                      <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                        <div className="flex w-full max-w-[280px] flex-col gap-2">
                          <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                            Type d&apos;offre du bon plan
                            <span className="text-destructive ml-1">*</span>
                          </FormLabel>
                          <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                            Sélectionnez le type d&apos;offre du bon plan que vous souhaitez
                          </FormDescription>
                        </div>
                        <div className="flex w-full flex-col">
                          <FormControl>
                            <OfferTypeDropdown
                              setValue={form.setValue}
                              defaultValue={form.watch("offerType").toString()}
                              otherStyles="!w-full"
                            />
                          </FormControl>
                          <FormMessage className="text-12 text-red-500"/>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

              </AccordionContent>
            </AccordionItem>



            <AccordionItem value="item-3">
              <AccordionTrigger className="text-[14px] leading-[20px] w-full font-medium text-gray-700">
                Entreprise
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



            <AccordionItem value="item-4">
              <AccordionTrigger className="text-[14px] leading-[20px] w-full font-medium text-gray-700">
                Format
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
                {deal ? "Éditer le bon plan" : "Enregistrer le bon plan"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DealForm;
