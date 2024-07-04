'use client';

import { Button, CircularProgress, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FormValues } from '../../interfaces';
import { useEnhancedDispatch } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
import { useRouter } from 'next/navigation';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  interface LoginForm {
    email: string;
    password: string;
  }

  const defaultValues: LoginForm = {
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

  const dispatch = useEnhancedDispatch();
  const router = useRouter();

  const [Errors, setErrors] = useState('');
  // const [serverError, setServerError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleLoginForm = async (data: LoginForm) => {
    setErrors('');
    setIsLoading(false);

    try {
      setIsLoading(true);
      const response = await dispatch(Actions.loginAction(data.email, data.password));

      if (response) {
        throw response;
      }

      setIsLoading(false);
      router.push('/');
    } catch (error: any) {
      setErrors(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-[100%] grid justify-items-center items-center bg-DARK_BACKGROUND_COLOR_MAIN">
      <div
        className="grid gap-y-4 h-fit w-fi justify-items-start border border-WARNING_COLOR  p-8 bg-[#FFFF]  text-[#000]"
        style={{ border: '2px solid white' }}
      >
        <h1 className="text-2xl font-bold ">Login Form</h1>
        <TextField
          style={{ width: '100%', margin: '5px' }}
          type="email"
          label="Email"
          variant="outlined"
          error={Boolean(errors.email)}
          helperText={errors.email ? errors.email.message : ''}
          {...register('email', {
            required: 'Please enter email address',
            // pattern: {
            //   value: EMAIL_REGEX,
            //   message: 'Please enter a valid email address',
            // },
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
        <p>
          Create Account <Link href="/sign-up">Register</Link>
        </p>

        <p>
          Forget Password <Link href="/forgot-password">Forget Password</Link>
        </p>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button type="submit" sx={{ width: '100%' }} onClick={handleSubmit(handleLoginForm)}>
            Submit
          </Button>
        )}

        <div>{Errors}</div>
      </div>
    </div>
  );
};

export default LoginPage;
