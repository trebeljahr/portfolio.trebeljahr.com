import { motion } from 'framer-motion'

import { EsaLogo } from 'components/logos/EsaLogo'
import { FlowkeyLogo } from 'components/logos/FlowkeyLogo'
import { HenkelLogo } from 'components/logos/HenkelLogo'
import { IronhackLogo } from 'components/logos/IronhackLogo'
import { KlarnaLogo } from 'components/logos/KlarnaLogo'
import { SoftgamesLogo } from 'components/logos/SoftgamesLogo'

const logoCardClasses =
  'flex items-center justify-center px-5 py-1 mb-5 border rounded-lg shadow-lg bg-secondary-light border-ternary-light dark:border-ternary-dark'

export function AboutClients() {
  return (
    <section className='py-5 mt-5 sm:py-10 sm:mt-10'>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='container mx-auto'>
        <div className='text-center'>
          <h2 className='mb-1 text-2xl font-general-medium sm:text-4xl text-ternary-dark dark:text-ternary-light'>
            Previous clients
          </h2>
        </div>
        <div className='mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 sm:mt-5 gap-2'>
          <div className={logoCardClasses}>
            <EsaLogo />
          </div>
          <div className={logoCardClasses}>
            <KlarnaLogo />
          </div>
          <div className={logoCardClasses}>
            <HenkelLogo />
          </div>
          <div className={logoCardClasses}>
            <FlowkeyLogo />
          </div>
          <div className={logoCardClasses}>
            <IronhackLogo />
          </div>
          <div className={logoCardClasses}>
            <SoftgamesLogo />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
