import React from 'react'
import {FormControl, FormField, FormLabel, FormMessage} from './ui/form'
import {Input} from './ui/input'

import {Control, FieldPath} from 'react-hook-form'
import {z} from 'zod'
import {authFormSchema} from '@/lib/utils'

const formSchema = authFormSchema('sign-up')

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string
}

const CustomInput = ({control, name, label, placeholder}: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <div className="flex flex-col gap-1.5">
          <FormLabel className="text-[14px] leading-[20px] w-full max-w-[280px] font-medium text-gray-700">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="text-[16px] leading-[24px] placeholder:text-[16px] placeholder:leading-[24px] rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500"
                type={name === 'password' ? 'password' : 'text'}
                {...field}
              />
            </FormControl>
            <FormMessage className="text-[12px] leading-[16px] text-red-500 mt-2"/>
          </div>
        </div>
      )}
    />
  )
}

export default CustomInput