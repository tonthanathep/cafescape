import Link from "next/link";

const SiteLogo = () => {
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
};

export default SiteLogo;
