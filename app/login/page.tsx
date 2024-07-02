import { login, signup } from "./action";
import React from "react";

const Page = () => {
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='mt-20 ml-10 w-fit h-fit bg-white rounded-2xl drop-shadow-xl p-6'>
        <form method='post'>
          <label className='input input-bordered flex items-center gap-2 mb-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='h-4 w-4 opacity-70'
            >
              <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
            </svg>
            <input
              name='email'
              type='text'
              className='grow'
              placeholder='Email'
            />
          </label>
          <label className='input input-bordered flex items-center gap-2 mb-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 16 16'
              fill='currentColor'
              className='h-4 w-4 opacity-70'
            >
              <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
            </svg>
            <input
              name='password'
              type='password'
              className='grow'
              placeholder='Password'
            />
          </label>
          <div className='flex justify-between'>
            <button className='btn btn-success btn-sm' formAction={login}>
              Log in
            </button>
            <button className='btn btn-success btn-sm' formAction={signup}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
