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
import {AssociationFormProps} from "@/types";
import {createAssociation, updateAssociation} from "@/lib/actions/association.actions";
import {CampusDropdown} from "@/components/dropdown/CampusDropdown";
import Link from "next/link";
import {AssociationTypeDropdown} from "@/components/dropdown/AssociationTypeDropdown";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Textarea} from "@/components/ui/textarea";

const AssociationForm = ({association}: AssociationFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    associationType: z.number().min(1, { message: "Le type d'association n'est pas correctement défini" }),
    campus: z.number().min(1, { message: "Le campus n'est pas correctement défini" }),
    name: z.string().min(1, { message: "Le nom doit contenir au moins 1 caractère" }).max(50, { message: "Le nom doit contenir au maximum 50 caractères" }),
    image: z.instanceof(File).optional(),
    title: z.string().min(1, { message: "Le titre de la note doit contenir au moins 1 caractère" }).max(50, { message: "Le titre de la note doit contenir au maximum 50 caractères" }),
    description: z.string().min(1, { message: "La description de la note doit contenir au moins 1 caractère" }).max(50, { message: "La description de la note doit contenir au maximum 50 caractères" }),
    firstname: z.string().min(1, { message: "Le prénom doit contenir au moins 1 caractère" }).max(50, { message: "Le prénom doit contenir au maximum 50 caractères" }),
    lastname: z.string().min(1, { message: "Le nom de famille doit contenir au moins 1 caractère" }).max(50, { message: "Le nom de famille doit contenir au maximum 50 caractères" }),
    role: z.string().min(1, { message: "Le rôle doit contenir au moins 1 caractère" }).max(50, { message: "Le rôle doit contenir au maximum 50 caractères" }),
    email: z.string().email(),
    phone: z.string().length(10, { message: "Le numéro de téléphone doit contenir 10 caractères" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      associationType: association ? association.associationType.id : 0,
      campus: association ? association.campus.id : 0,
      name: association ? association.name : "",
      image: undefined,
      title: association ? association.title : "",
      description: association ? association.description : "",
      firstname: association ? association.firstname : "",
      lastname: association ? association.lastname : "",
      email: association ? association.email : "",
      phone: association ? association.phone : "",
      role: association ? association.role : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const associationData = {
        associationTypeId: data.associationType,
        campusId: data.campus,
        name: data.name,
        title: data.title,
        description: data.description,
        image: data.image ? URL.createObjectURL(data.image) : undefined,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        role: data.role,
      };

      if (association) {
        const updatedAssociation = await updateAssociation({id: association.id, association: associationData});
        if (updatedAssociation) {
          form.reset();
          router.push('/admin/association');
        }
      } else {
        const newAssociation = await createAssociation(associationData);
        if (newAssociation) {
          form.reset();
          router.push('/admin/association');
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
          name="associationType"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Type d&apos;association
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Sélectionnez le type d&apos;association que vous souhaitez
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <AssociationTypeDropdown
                      setValue={form.setValue}
                      defaultValue={form.watch("associationType").toString()}
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
          name="campus"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8 pb-6 pt-5">
                <div className="flex w-full max-w-[280px] flex-col gap-2">
                  <FormLabel className="text-[14px] leading-[20px] font-medium text-gray-700">
                    Campus
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormDescription className="text-[12px] leading-[16px] font-normal text-gray-600">
                    Sélectionnez le campus a associer
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col m-auto">
                  <FormControl>
                    <CampusDropdown
                      setValue={form.setValue}
                      defaultValue={form.watch("campus").toString()}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500"/>
                </div>
                <Link
                  href={"/admin/campus/ajout"}
                  className="text-[14px] leading-[20px] rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 w-full text-center"
                >
                  Ajouter un campus
                </Link>
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

        <div className="max-w-[850px] gap-3 pb-5 border-t border-gray-200">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-[14px] leading-[20px] w-full font-medium text-gray-700">
                Notes
              </AccordionTrigger>
              <AccordionContent>

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

              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
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
                {association ? "Éditer l'association" : "Enregistrer l'association"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AssociationForm;
