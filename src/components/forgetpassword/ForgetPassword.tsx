'use client';

import { Button, CircularProgress, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { FormValues } from '../../interfaces';
import { useEnhancedDispatch } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
import { useRouter } from 'next/navigation';
import { EMAIL_REGEX } from '../../constants';
import { useForm } from 'react-hook-form';

const ForgetPassword = () => {
  const dispatch = useEnhancedDispatch();
  const router = useRouter();

  interface LoginForm {
    email: string;
  }

  const defaultValues: LoginForm = {
    email: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues,
  });

  const [Error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleForgetPassword = async (data: LoginForm) => {
    setIsLoading(false);
    setError('');

    try {
      setIsLoading(true);
      const response = await dispatch(Actions.forgetPasswordAction(data.email));

      if (response) {
        throw response;
      }
      router.push('/verification');
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen w-[100%] grid justify-items-center items-center bg-DARK_BACKGROUND_COLOR_MAIN">
        <div
          className="grid gap-y-4 h-fit w-fi justify-items-start border border-WARNING_COLOR  p-8 bg-[#FFFF]  text-[#000]"
          style={{ border: '2px solid white' }}
        >
          <h1 className="text-2xl font-bold ">Forget Password</h1>
          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="email"
            label="Email"
            variant="outlined"
            error={Boolean(errors.email)}
            helperText={errors.email ? errors.email.message : ''}
            {...register('email', {
              required: 'Please enter email address',
              pattern: {
                value: EMAIL_REGEX,
                message: 'Please enter a valid email address',
              },
            })}
          />

          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" sx={{ width: '100%' }} onClick={handleSubmit(handleForgetPassword)}>
              Submit
            </Button>
          )}

          <div>{Error}</div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
