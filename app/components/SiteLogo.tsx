import Link from "next/link";

interface Props {
  variant: string;
}

const SiteLogo = ({ variant }: Props) => {
  if (variant == "light") {
    return (
      <div>
        <Link href='/'>
          <div className='flex flex-row'>
            <div>
              <h1 className='text-xl font-light text-white shadow-2xl'>cafe</h1>
            </div>
            <div>
              <h1 className='text-xl font-bold text-white shadow-2xl'>scape</h1>
            </div>
          </div>
        </Link>
      </div>
    );
  } else if (variant == "dark") {
    return (
      <div>
        <Link href='/'>
          <div className='flex flex-row'>
            <div>
              <h1 className='text-xl font-light text-black/80 shadow-2xl'>
                cafe
              </h1>
            </div>
            <div>
              <h1 className='text-xl font-bold text-black/80 shadow-2xl'>
                scape
              </h1>
            </div>
          </div>
        </Link>
      </div>
    );
  }
};

export default SiteLogo;
