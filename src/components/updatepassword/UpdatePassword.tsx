'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import * as Actions from '../../store/actions';
import { useEnhancedDispatch, useEnhancedSelector } from '../../Helpers/reduxHooks';
import { PASSWORD_REGEX } from '../../constants';
import { useRouter } from 'next/navigation';
import { FormValues } from '../../interfaces';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

const UpdatePassword = () => {
  const router = useRouter();
  const dispatch = useEnhancedDispatch();

  interface LoginForm {
    password: string;
    rePassword: string;
  }

  const defaultValues: LoginForm = {
    password: '',
    rePassword: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues,
  });

  const email = useEnhancedSelector((state) => state.user.email);
  const otp = useEnhancedSelector((state) => state.user.otp) ?? null;

  const [Error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleUpdatePassword = async (data: LoginForm) => {
    setError('');
    setIsLoading(false);

    try {
      setIsLoading(true);
      const response = await dispatch(Actions.updatePasswordAction(email, otp, data.password));

      if (response) {
        throw response;
      }

      setIsLoading(false);
      toast.success('password updated successfully');
      router.push('/');
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
          {' '}
          <TextField
            fullWidth
            label="Password"
            style={{ marginTop: '25px' }}
            type={showPassword ? 'text' : 'password'}
            error={Boolean(errors.password)}
            helperText={errors.password ? errors.password.message : ''}
            {...register('password', {
              required: 'Please enter password',
              pattern: {
                value: PASSWORD_REGEX,
                message: 'Please enter a valid password',
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            style={{ marginTop: '15px' }}
            type={showPassword ? 'text' : 'password'}
            error={Boolean(errors.rePassword)}
            helperText={errors.rePassword ? errors.rePassword.message : ''}
            {...register('rePassword', {
              required: 'Please enter password',
              pattern: {
                value: PASSWORD_REGEX,
                message: 'Please enter a valid password',
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <br />
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" onClick={handleSubmit(handleUpdatePassword)}>
              Submit
            </Button>
          )}
          <div>{Error}</div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
