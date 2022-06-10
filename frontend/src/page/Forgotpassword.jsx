import React from 'react'
import { Form, Field, Formik } from 'formik'
import { string, object } from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'

import Button from '../component/Button'
import Input from '../component/Input'
import Container from '../component/Container'

const ForgotPassword = () => {
  const initialValue = {
    email: ''
  }

  const validationSchema = object().shape({
    email: string().required().email()
  })

  const forgotPassword = async values => {
    try {
      const { data, status } = await axios.post('/auth/forgot-password', values, {
        withCredentials: true
      })
      if (status === 200) {
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <Container>
      <div className='w-full md:w-[400px] px-8 py-5 border rounded-xl mx-auto mt-10 md:mt-32 bg-white'>
        <h1 className='text-2xl md:text-3xl font-bold mb-5'>Recover password</h1>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={forgotPassword}
        >
          {({ handleBlur, touched, errors }) => (
            <Form>
              <Field
                as={Input}
                placeholder='Enter your email'
                type='email'
                name='email'
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
              <Button type='submit'>Forgot Password</Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}

export default ForgotPassword
