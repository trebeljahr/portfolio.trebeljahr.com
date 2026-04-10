import Link from 'next/link'

function AppFooterCopyright() {
  return (
    <div className='flex flex-col items-center justify-center text-center font-general-regular gap-2'>
      <div className='text-lg text-ternary-dark dark:text-ternary-light'>
        &copy; {new Date().getFullYear()}.{' '}
        <a
          href='https://trebeljahr.com'
          target='__blank'
          className='ml-1 font-medium uppercase text-secondary-dark dark:text-secondary-light hover:underline hover:text-indigo-600 dark:hover:text-indigo-300 duration-500'>
          Rico Trebeljahr
        </a>
      </div>
      <div className='text-sm text-ternary-dark dark:text-ternary-light'>
        <Link
          href='/imprint'
          className='hover:underline hover:text-indigo-600 dark:hover:text-indigo-300 duration-500'>
          Imprint
        </Link>
      </div>
    </div>
  )
}

export default AppFooterCopyright
