import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300'>
      <div className='mx-auto w-full max-w-md bg-gray-800 rounded-xl p-6 md:p-10 border border-gray-700 shadow-lg'>
        <div className='mb-2 flex justify-center'>
          <span className='inline-block w-full max-w-[80px]'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-center text-xl md:text-3xl font-bold leading-tight text-white'>Sign in to your account</h2>
        <p className='mt-2 text-center text-base text-gray-400'>
          Don't have an account?&nbsp;
          <Link to='/signup' className='font-medium text-blue-400 transition-all duration-200 hover:underline'>
            Sign Up
          </Link>
        </p>
        {error && <p className='text-red-600 mt-4 md:mt-8 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-4 md:mt-8'>
          <div className='space-y-4'>
            <Input
              label='Email: '
              placeholder='Enter your email'
              type='email'
              {...register('email', {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email address must be a valid address',
                },
              })}
            />
            <Input
              label='Password: '
              type='password'
              placeholder='Enter your password'
              {...register('password', {
                required: true,
              })}
            />
            <Button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200'
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
