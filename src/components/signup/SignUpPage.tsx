'use client';

import { Button, CircularProgress, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { FormValues } from '../../interfaces';
import { useEnhancedDispatch } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
import { useRouter } from 'next/navigation';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const SignUpPage = () => {
  const dispatch = useEnhancedDispatch();
  const router = useRouter();

  interface LoginForm {
    userName: string;
    email: string;
    password: string;
  }

  const defaultValues: LoginForm = {
    userName: '',
    email: '',
    password: '',
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

  const handleRegisterForm = async (data: LoginForm) => {
    setError('');
    setIsLoading(false);
    try {
      setIsLoading(true);
      const response = await dispatch(Actions.registerAction(data.userName, data.email, data.password));

      if (response) throw response;

      setIsLoading(false);
      toast.success('Register Sucessfully');
      router.push('/');
    } catch (error: any) {
      setIsLoading(false);
      if (typeof error === 'string') {
        setError(error);
      } else {
        setError('Something went wrong, please try again later');
      }
    }
  };

  return (
    <>
      <div className="h-screen w-[100%] grid justify-items-center items-center bg-DARK_BACKGROUND_COLOR_MAIN">
        <div
          className="grid gap-y-4 h-fit w-fi justify-items-start border border-WARNING_COLOR  p-8 bg-[#FFFF]  text-[#000]"
          style={{ border: '2px solid white' }}
        >
          <h1 className="text-2xl font-bold">Register</h1>
          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="text"
            label="Name"
            variant="outlined"
            error={Boolean(errors.userName)}
            helperText={errors.userName ? errors.userName.message : ''}
            {...register('userName', {
              required: 'Please enter username',
            })}
          />
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

          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="password"
            label="Password"
            variant="outlined"
            error={Boolean(errors.password)}
            helperText={errors.password ? errors.password.message : ''}
            {...register('password', {
              required: 'Please enter password',
              pattern: {
                value: PASSWORD_REGEX,
                message: 'Please enter a valid password',
              },
            })}
          />

          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" sx={{ width: '100%' }} onClick={handleSubmit(handleRegisterForm)}>
              Submit
            </Button>
          )}

          <div>{Error}</div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
