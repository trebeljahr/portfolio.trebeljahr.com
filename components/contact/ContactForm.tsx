import { MouseEvent, useEffect, useRef, useState } from 'react'
import { BsFillSendFill } from 'react-icons/bs'
import { toast, ToastOptions } from 'react-toastify'
import FormInput from '../reusable/FormInput'

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [emailIsSending, setEmailIsSending] = useState(false)
  const form = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const unsubscribe = toast.onChange((change) => {
      if (change.status === 'removed') setEmailIsSending(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const submitForm = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()

    if (emailIsSending) return

    setEmailIsSending(true)

    async function postData() {
      const theme = window.document.documentElement.className as 'light' | 'dark'

      const toastOptions: ToastOptions = {
        position: 'top-right' as 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: false,
        theme,
      }
      if (!form.current) return
      const allInputs = form?.current?.querySelectorAll('input')
      const anyInputFails = [...allInputs].some(() => {
        return !form.current.checkValidity()
      })
      if (anyInputFails) {
        return toast.error('Your form still has errors in it 😔', toastOptions)
      }
      try {
        const data = {
          name: formState.name,
          from: formState.email,
          subject: formState.subject,
          text: formState.message,
        }

        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error)
        }

        setFormState({ name: '', email: '', subject: '', message: '' })
        toast("🦄 Your message is on it's way", toastOptions)
      } catch (error) {
        toast.error('Oops, something broke there. Maybe, try again?', toastOptions)
        setEmailIsSending(false)
      }
    }
    postData()
  }

  function updateFormState(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormState((old) => {
      const newState = {
        ...old,
        [event.target.name]: event.target.value,
      }
      return newState
    })
  }

  return (
    <div id='contact-form' className='w-full lg:w-1/2'>
      <div className='leading-loose'>
        <form
          ref={form}
          className='max-w-xl p-6 m-4 text-left shadow-xl sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl'>
          <p className='mb-8 text-2xl font-general-medium text-primary-dark dark:text-primary-light'>Contact Form</p>

          <FormInput
            inputLabel='Full Name'
            labelFor='name'
            inputType='text'
            inputId='name'
            inputName='name'
            placeholderText='Your Name'
            ariaLabelName='Name'
            value={formState.name}
            onChange={updateFormState}>
            <p className='hidden peer-invalid:block text-red-700 font-light'>Please enter a name.</p>
          </FormInput>
          <FormInput
            inputLabel='Email'
            labelFor='email'
            inputType='email'
            inputId='email'
            inputName='email'
            value={formState.email}
            placeholderText='Your email'
            ariaLabelName='Email'
            onChange={updateFormState}>
            <p className='hidden peer-invalid:block text-red-700 font-light'>Please enter a valid email.</p>
          </FormInput>
          <FormInput
            inputLabel='Subject'
            labelFor='subject'
            inputType='text'
            value={formState.subject}
            inputId='subject'
            inputName='subject'
            placeholderText='Subject'
            ariaLabelName='Subject'
            onChange={updateFormState}>
            <p className='hidden peer-invalid:block text-red-700 font-light'>Please enter a subject.</p>
          </FormInput>

          <div className='mt-6'>
            <label className='block mb-2 text-lg text-primary-dark dark:text-primary-light' htmlFor='message'>
              Message
            </label>
            <textarea
              className='w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md'
              id='message'
              name='message'
              cols={14}
              rows={6}
              value={formState.message}
              aria-label='Message'
              onChange={updateFormState}
            />
          </div>

          <div className='mt-3'>
            <button
              onClick={submitForm}
              className='flex items-center justify-center mt-8 mb-6 text-lg text-gray-600 border border-indigo-200 rounded-lg shadow-lg font-general-medium w-36 sm:w-48 sm:mb-0 dark:border-ternary-dark py-2.5 sm:py-3  bg-indigo-50 focus:ring-1 focus:ring-indigo-900 hover:ring-darkblue hover:border-darkblue hover:bg-darkblue hover:text-white duration-500'>
              <BsFillSendFill className='w-5 h-5 ml-0 mr-2 sm:ml-1 sm:mr-3 sn:w-6 sm:h-6 duration-100' />
              <span className='text-sm sm:text-lg duration-100'>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
