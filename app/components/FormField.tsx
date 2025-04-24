import React from 'react'
import { Controller, Control, Field,FieldValues, Path  } from 'react-hook-form'
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { FormFieldProps } from '../types/form'

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'file';
  }

const FormField = ({control,name,label,placeholder,type = "text"}: FormFieldProps<T>) => (
    <Controller 
    name = {name}
    control = {control} render = {({ field }) =>(
          <FormItem>
              <FormLabel className='lable'>{label}</FormLabel>
              <FormControl>
                <Input className='input' type={type} placeholder={placeholder} {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
            
    )}/>
            
          
);

export default FormField
