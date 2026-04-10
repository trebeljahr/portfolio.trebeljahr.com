import Link from 'next/link'
import PagesMetaHead from '../components/PagesMetaHead'

export default function ImprintPage() {
  return (
    <>
      <PagesMetaHead title='Imprint | Rico Trebeljahr' />
      <div className='container mx-auto max-w-3xl px-4 py-20 font-general-regular'>
        <p className='mb-6'>
          <Link
            href='/'
            className='text-secondary-dark dark:text-secondary-light hover:text-indigo-600 dark:hover:text-indigo-300 hover:underline'>
            &larr; Back to Portfolio
          </Link>
        </p>
        <h1 className='text-3xl sm:text-4xl font-general-medium text-primary-dark dark:text-primary-light mb-8'>
          Imprint
        </h1>

        <p className='text-lg text-ternary-dark dark:text-ternary-light mb-8'>
          Information pursuant to § 5 DDG (German Digital Services Act) and
          § 18 (2) MStV (Interstate Media Treaty).
        </p>

        <section className='mb-8'>
          <h2 className='text-xl sm:text-2xl font-general-medium text-primary-dark dark:text-primary-light mb-3'>
            Service Provider
          </h2>
          <p className='text-lg text-ternary-dark dark:text-ternary-light leading-relaxed'>
            Rico Trebeljahr
            <br />
            c/o Block Services
            <br />
            Stuttgarter Str. 106
            <br />
            70736 Fellbach
            <br />
            Germany
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-xl sm:text-2xl font-general-medium text-primary-dark dark:text-primary-light mb-3'>
            Contact
          </h2>
          <p className='text-lg text-ternary-dark dark:text-ternary-light leading-relaxed'>
            Email:{' '}
            <a
              href='mailto:imprint+portfolio@trebeljahr.com'
              className='text-secondary-dark dark:text-secondary-light hover:text-indigo-600 dark:hover:text-indigo-300 hover:underline'
            >
              imprint+portfolio@trebeljahr.com
            </a>
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-xl sm:text-2xl font-general-medium text-primary-dark dark:text-primary-light mb-3'>
            Person Responsible for Content (§ 18 (2) MStV)
          </h2>
          <p className='text-lg text-ternary-dark dark:text-ternary-light leading-relaxed'>
            Rico Trebeljahr
            <br />
            c/o Block Services
            <br />
            Stuttgarter Str. 106
            <br />
            70736 Fellbach
            <br />
            Germany
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-xl sm:text-2xl font-general-medium text-primary-dark dark:text-primary-light mb-3'>
            Liability for Content
          </h2>
          <p className='text-lg text-ternary-dark dark:text-ternary-light leading-relaxed mb-3'>
            As a service provider, I am responsible for my own content on
            these pages in accordance with § 7 (1) DDG and general laws.
            However, pursuant to §§ 8 to 10 DDG, I am not obligated as a
            service provider to monitor transmitted or stored third-party
            information or to investigate circumstances that indicate illegal
            activity.
          </p>
          <p className='text-lg text-ternary-dark dark:text-ternary-light leading-relaxed'>
            Obligations to remove or block the use of information under
            general laws remain unaffected. However, liability in this regard
            is only possible from the point in time at which a specific legal
            violation becomes known. Upon becoming aware of such violations,
            I will remove this content immediately.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-xl sm:text-2xl font-general-medium text-primary-dark dark:text-primary-light mb-3'>
            Liability for Links
          </h2>
          <p className='text-lg text-ternary-dark dark:text-ternary-light leading-relaxed'>
            This site contains links to external websites of third parties
            over whose content I have no influence. Therefore, I cannot
            assume any liability for these third-party contents. The
            respective provider or operator of the pages is always
            responsible for the content of the linked pages.
          </p>
        </section>

        <section>
          <h2 className='text-xl sm:text-2xl font-general-medium text-primary-dark dark:text-primary-light mb-3'>
            Copyright
          </h2>
          <p className='text-lg text-ternary-dark dark:text-ternary-light leading-relaxed'>
            The content and works created by the site operator on these
            pages are subject to German copyright law. Duplication,
            processing, distribution, and any kind of use outside the limits
            of copyright require the written consent of the respective
            author or creator.
          </p>
        </section>
      </div>
    </>
  )
}
