'use client';

import { Button, CircularProgress, TextField } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FormValues } from '../../interfaces';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import * as Actions from '../../store/actions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const EmailVerification = () => {
  const dispatch = useEnhancedDispatch();

  const email = useEnhancedSelector((state) => state.user.email);

  console.log('email is', email);

  // let email ="hmzsattar99@gmail.com"

  const router = useRouter();
  const [Error, setError] = useState('');

  interface LoginForm {
    otp: string;
  }

  const defaultValues: LoginForm = {
    otp: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues,
  });

  const [otp, setOtp] = useState('');
  const [IsLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(59);

  const handleVerification = async (data: LoginForm) => {
    setError('');
    setIsLoading(false);

    try {
      setIsLoading(true);
      const response = await dispatch(Actions.VerifyOtpAction(email, data.otp));
      if (response) {
        throw response;
      }
      router.push('/update-password');
      setIsLoading(false);
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const invalidData = setInterval(() => {
      setSeconds((prev) => (prev === 0 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(invalidData);
  }, [seconds]);

  useEffect(() => {
    if (!email) {
      router.push('/forgot-password');
    }
  }, [email]);

  const SendOtpCode = async () => {
    setError('');
    try {
      const errorFromAction = await dispatch(Actions.forgetPasswordAction(email));

      if (errorFromAction) throw errorFromAction;
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <>
      <div className="h-screen w-[100%] grid justify-items-center items-center bg-DARK_BACKGROUND_COLOR_MAIN">
        <div
          className="grid gap-y-4 h-fit w-fi justify-items-start border border-WARNING_COLOR  p-8 bg-[#FFFF]  text-[#000]"
          style={{ border: '2px solid white' }}
        >
          <h1 className="text-2xl font-bold ">Verify Otp</h1>
          <TextField
            style={{ width: '100%', margin: '5px' }}
            type="number"
            label="Otp"
            variant="outlined"
            error={Boolean(errors.otp)}
            helperText={errors.otp ? errors.otp.message : ''}
            {...register('otp', {
              required: 'Please enter Otp',
            })}
          />

          {IsLoading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" sx={{ width: '100%' }} onClick={handleSubmit(handleVerification)}>
              Submit
            </Button>
          )}
          <div className=" gap-x-5">
            <span>{seconds === 0 ? `00` : `Resend OTP in ${seconds} seconds`}</span>
            <span
              className="hover:text-INFO_COLOR hover:cursor-pointer"
              onClick={() => {
                if (seconds !== 0) return;
                SendOtpCode();
                toast.success('Otp sent Succesfully');
                setSeconds(59);
              }}
            >
              Resent Otp
            </span>
          </div>
          <div>{Error}</div>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
