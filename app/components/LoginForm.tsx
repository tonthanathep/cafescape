import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch } from "react";
import { login } from "../(auth)/login/action";
import SiteLogo from "./SiteLogo";

interface Props {
  setState: Dispatch<boolean>;
}

const LoginForm = ({ setState }: Props) => {
  return (
    <div className='flex flex-col justify-between h-full'>
      <SiteLogo variant='dark' />
      <div>
        <div className='mb-5 justify-center flex flex-col'>
          <h1 className='text-xl font-semibold'>☕️ Welcome back</h1>
          <h1 className='text-sm font-light'>
            are you ready to be productive?
          </h1>
        </div>
        <form method='post'>
          <label className='input bg-black/5 flex items-center gap-4 mb-4'>
            <FontAwesomeIcon icon={fas.faEnvelope} className='opacity-70' />
            <input
              name='email'
              type='text'
              className='grow'
              placeholder='Email'
            />
          </label>
          <label className='input bg-black/5 flex items-center gap-4 mb-4'>
            <FontAwesomeIcon icon={fas.faKey} className='opacity-70' />
            <input
              name='password'
              type='password'
              className='grow'
              placeholder='Password'
            />
          </label>
          <div className='flex flex-col'>
            <button className='btn btn-outline btn-mda' formAction={login}>
              Log in
            </button>
          </div>
        </form>
        <div className='flex flex-row gap-1 mt-4 items-center'>
          <p className='text-sm font-light'> Don't have account yet? </p>
          <p
            className='text-sm font-semibold text-orange-400 cursor-pointer'
            onClick={() => {
              setState(true);
            }}
          >
            {" "}
            Sign up
          </p>
        </div>
      </div>
      <div className='flex flex-row gap-1'>
        <p className='text-xs font-light text-slate-400'> Made with ❤️ by </p>
        <p className='text-xs font-light text-orange-400'> Thanathep.T </p>
      </div>
    </div>
  );
};

export default LoginForm;
