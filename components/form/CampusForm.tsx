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
import {createCampus, updateCampus} from "@/lib/actions/campus.actions";
import {CampusFormProps} from "@/types";
import {CampusTypeDropdown} from "@/components/dropdown/CampusTypeDropdown";
import {NbStudentDropdown} from "@/components/dropdown/NbStudentDropdown";
import {Textarea} from "@/components/ui/textarea";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const CampusForm = ({campus}: CampusFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    campusType: z.number().min(1, { message: "Le type de campus n'est pas correctement défini" }),
    nbStudent: z.number().min(1, { message: "Le nombre d'étudiant n'est pas correctement défini" }),
    name: z.string().min(1, { message: "Le nom doit contenir au moins 1 caractère" }).max(50, { message: "Le nom doit contenir au maximum 50 caractères" }),
    description: z.string().min(1, { message: "La descrption doit contenir au moins 1 caractère" }).max(500, { message: "La description doit contenir au maximum 500 caractères" }),
    city: z.string().min(1, { message: "La ville doit contenir au moins 1 caractère" }).max(50, { message: "La ville doit contenir au maximum 50 caractères" }),
    address: z.string().min(1, { message: "L'adresse doit contenir au moins 1 caractère" }).max(50, { message: "L'adresse doit contenir au maximum 50 caractères" }),
    image: z.instanceof(File).optional(),
    firstname: z.string().min(1, { message: "Le prénom doit contenir au moins 1 caractère" }).max(50, { message: "Le prénom doit contenir au maximum 50 caractères" }),
    lastname: z.string().min(1, { message: "Le nom de famille doit contenir au moins 1 caractère" }).max(50, { message: "Le nom de famille doit contenir au maximum 50 caractères" }),
    role: z.string().min(1, { message: "Le rôle doit contenir au moins 1 caractère" }).max(50, { message: "Le rôle doit contenir au maximum 50 caractères" }),
    email: z.string().email(),
    phone: z.string().length(10, { message: "Le numéro de téléphone doit contenir 10 caractères" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campusType: campus ? campus.campusType.id : 0,
      nbStudent: campus ? campus.nbStudent.id : 0,
      name: campus ? campus.name : "",
      description: campus ? campus.description : "",
      city: campus ? campus.city : "",
      address: campus ? campus.address : "",
      image: undefined,
      firstname: campus ? campus.firstname : "",
      lastname: campus ? campus.lastname : "",
      email: campus ? campus.email : "",
      phone: campus ? campus.phone : "",
      role: campus ? campus.role : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const campusData = {
        campusTypeId: data.campusType,
        nbStudentId: data.nbStudent,
        name: data.name,
        description: data.description,
        city: data.city,
        address: data.address,
        image: data.image ? URL.createObjectURL(data.image) : undefined,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        role: data.role,
      };

      if (campus) {
        const updatedCampus = await updateCampus({id: campus.id, campus: campusData});
        if (updatedCampus) {
          form.reset();
          router.push('/admin/campus');
        }
      } else {
        const newCampus = await createCampus(campusData);
        if (newCampus) {
          form.reset();
          router.push('/admin/campus');
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
          name="image"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Image
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
          name="city"
          render={({field}) => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-5 pt-6">
                <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
                  Ville
                  <span className="text-destructive ml-1">*</span>
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Entrez la ville"
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
          name="campusType"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Type de campus
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Sélectionnez le type de campus que vous souhaitez
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <CampusTypeDropdown
                      setValue={form.setValue}
                      defaultValue={form.watch("campusType").toString()}
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
          name="nbStudent"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Nombre d&apos;étudiants
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Sélectionnez le nombre d&apos;étudiants du campus
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <NbStudentDropdown
                      setValue={form.setValue}
                      defaultValue={form.watch("nbStudent").toString()}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500"/>
                </div>
              </div>
            </FormItem>
          )}
        />

        {/*<div className="flex flex-col gap-1 border-t border-gray-200 pb-5 pt-6">*/}
        {/*  <h2 className="text-[18px] leading-[22px] font-semibold text-gray-900">*/}
        {/*    Contact*/}
        {/*  </h2>*/}
        {/*  <p className="text-[16px] leading-[24px] font-normal text-gray-600">*/}
        {/*    Remplissez les informations concernant le contact du campus*/}
        {/*  </p>*/}
        {/*</div>*/}

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
                {campus ? "Éditer le campus" : "Enregistrer le campus"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CampusForm;
