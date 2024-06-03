'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, {useState} from 'react'
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {Form,} from "@/components/ui/form"
import CustomInput from '../CustomInput';
import {authFormSchema} from '@/lib/utils';
import {Loader2} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {login, signUp} from '@/lib/actions/user.actions';

const AuthForm = ({type}: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === 'sign-up') {
        const userData = {
          firstname: data.firstname!,
          lastname: data.lastname!,
          address: data.address!,
          city: data.city!,
          postalCode: data.postalCode!,
          email: data.email,
          password: data.password
        }
        const newUser = await signUp(userData);
        setUser(newUser);

        if (newUser) router.push('/')
      }

      if (type === 'sign-in') {
        const response = await login({
          email: data.email,
          password: data.password,
        })

        if (response) router.push('/')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="MaVieEtudiante logo"
          />
          <h1 className="text-[26px] leading-[32px] font-ibm-plex-serif font-bold text-black-1">MaVieEtudiante</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-[24px] leading-[30px] lg:text-[36px] lg:leading-[44px] font-semibold text-gray-900">
            {user
              ? 'Link Account'
              : type === 'sign-in'
                ? 'Connexion'
                : 'Inscription'
            }
            <p className="text-[16px] leading-[24px] font-normal text-gray-600">
              {user
                ? 'Créez votre compte pour commencer'
                : 'Veuillez entrer vos informations'
              }
            </p>
          </h1>
        </div>
      </header>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {type === 'sign-up' && (
            <>
              <div className="flex gap-4">
                <CustomInput control={form.control} name='firstname' label="Prénom" placeholder='Entrez votre prénom'/>
                <CustomInput control={form.control} name='lastname' label="Nom" placeholder='Entrez votre nom'/>
              </div>
              <CustomInput control={form.control} name='address' label="Adresse" placeholder='Entrez votre adresse'/>
              <div className="flex gap-4">
                <CustomInput control={form.control} name='postalCode' label="Code postal" placeholder='Exemple: 75000'/>
                <CustomInput control={form.control} name='city' label="Ville" placeholder='Entrez votre ville'/>
              </div>
            </>
          )}
          <CustomInput control={form.control} name='email' label="Email" placeholder='Entrez votre email'/>
          <CustomInput control={form.control} name='password' label="Mot de passe" placeholder='Entrez votre mot de passe'/>
          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={isLoading} className="text-[16px] leading-[24px] rounded-lg border border-primary/50 bg-primary font-semibold text-white shadow-form">
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin"/> &nbsp;
                  Loading...
                </>
              ) : type === 'sign-in' ? 'Connexion' : 'Inscription'}
            </Button>
          </div>
        </form>
      </Form>
      <footer className="flex justify-center gap-1">
        <p className="text-[14px] leading-[20px] font-normal text-gray-600">
          {type === 'sign-in' ? "Vous n’avez pas de compte ?" : "Vous avez déjà un compte ?"}
        </p>
        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="text-[14px] leading-[20px] cursor-pointer font-medium">
          {type === 'sign-in' ? 'Inscription' : 'Connexion'}
        </Link>
      </footer>
    </section>
  )
}

export default AuthForm