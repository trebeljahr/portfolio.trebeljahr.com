import { motion } from 'framer-motion'
import Image from 'next/image'
import { BsFillSendFill } from 'react-icons/bs'
import useThemeSwitcher from '../../hooks/useThemeSwitcher'

function ContactMeButton() {
  const scrollToContactForm = () => {
    const contactForm = document.getElementById('contact-form')
    contactForm?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: 'easeInOut',
        duration: 0.9,
        delay: 0.3,
      }}
      className='flex justify-center sm:block'>
      <button
        onClick={scrollToContactForm}
        className='flex items-center justify-center mt-12 mb-6 text-lg text-gray-600 border border-indigo-200 rounded-lg shadow-lg font-general-medium w-36 sm:w-48 sm:mb-0 dark:border-ternary-dark py-2.5 sm:py-3 bg-indigo-50 focus:ring-1 focus:ring-indigo-900 hover:ring-darkblue hover:border-darkblue hover:bg-darkblue hover:text-white duration-500'>
        <BsFillSendFill className='w-5 h-5 ml-0 mr-2 sm:ml-1 sm:mr-3 sn:w-6 sm:h-6 duration-100' />
        <span className='text-sm sm:text-lg duration-100'>Contact Me</span>
      </button>
    </motion.div>
  )
}

function AppBanner() {
  const [activeTheme] = useThemeSwitcher()

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
      className='flex flex-col items-center mt-5 sm:justify-between sm:flex-row md:mt-2'>
      <div className='w-full text-left md:w-1/3'>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.9,
            delay: 0.1,
          }}
          className='text-2xl text-center font-general-semibold lg:text-3xl xl:text-4xl sm:text-left text-ternary-dark dark:text-primary-light'>
          Hi, I&apos;m Rico.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.9,
            delay: 0.2,
          }}
          className='mt-4 text-sm leading-normal text-center text-gray-500 font-general-medium md:text-md lg:text-l xl:text-xl sm:text-left dark:text-gray-200'>
          I&apos;m a fullstack engineer who builds things fast and ships them.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.9,
            delay: 0.3,
          }}
          className='mt-2 text-xs leading-normal text-center text-gray-400 font-general-regular md:text-sm lg:text-md sm:text-left dark:text-gray-400'>
          ESA &middot; Klarna &middot; Henkel &middot; Open for work
        </motion.p>
        <ContactMeButton />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -180 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
        className='flex justify-center float-right w-full h-full mt-8 text-right sm:w-2/3 sm:mt-0'>
        <Image
          src={activeTheme === 'dark' ? '/images/developer.svg' : '/images/developer-dark.svg'}
          width='0'
          height='0'
          sizes='(min-width: 1540px) 853px, (min-width: 1280px) 725px, (min-width: 1040px) 576px, (min-width: 780px) 469px, (min-width: 640px) 230px, calc(100vw - 32px)'
          className='w-6/12 h-auto border-none rounded-t-xl'
          loading='eager'
          alt='Developer'
        />
      </motion.div>
    </motion.section>
  )
}

export default AppBanner
