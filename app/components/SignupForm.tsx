import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch } from "react";
import { signup } from "../(auth)/login/action";

interface Props {
  setState: Dispatch<boolean>;
}

const SignupForm = ({ setState }: Props) => {
  return (
    <div className='flex flex-col justify-between h-full'>
      <div>cafescape</div>
      <div>
        <div className='mb-5 justify-center flex flex-col'>
          <h1 className='text-md font-semibold'>☕️ First time here?</h1>
          <h1 className='text-xs font-light'>let's get you started!</h1>
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
            <button className='btn btn-outline btn-mda' formAction={signup}>
              Sign up
            </button>
          </div>
        </form>
        <div className='flex flex-row gap-1 mt-4 items-center'>
          <p className='text-sm font-light'> Been here before? </p>
          <p
            className='text-sm font-semibold text-orange-400 cursor-pointer'
            onClick={() => {
              setState(false);
            }}
          >
            Login
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

export default SignupForm;
