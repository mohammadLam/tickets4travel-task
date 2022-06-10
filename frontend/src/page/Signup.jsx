import React from 'react'
import { Form, Field, Formik } from 'formik'
import { string, object } from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'

import Button from '../component/Button'
import Input from '../component/Input'
import Container from '../component/Container'

const Signup = () => {
  const initialValue = {
    name: '',
    email: '',
    password: '',
    repassword: ''
  }

  const validationSchema = object().shape({
    name: string().required().min(3).max(20),
    email: string().required().email(),
    password: string().required().min(8),
    repassword: string().required().min(8)
  })

  const signup = async values => {
    try {
      const { data, status } = await axios.post('/auth/signup', values)
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
        <h1 className='text-2xl md:text-3xl font-bold mb-5 text-gray-800'>Create an account</h1>
        <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={signup}>
          {({ handleBlur, errors, touched }) => (
            <Form>
              <Field
                as={Input}
                placeholder='Enter your name'
                name='name'
                onBlur={handleBlur}
                error={touched.name && errors.name}
              />
              <Field
                as={Input}
                placeholder='Enter your email'
                type='email'
                name='email'
                onBlur={handleBlur}
                error={touched.email && errors.email}
              />
              <Field
                as={Input}
                placeholder='Password'
                type='password'
                name='password'
                onBlur={handleBlur}
                error={touched.password && errors.password}
              />
              <Field
                as={Input}
                placeholder='Confirm password'
                type='password'
                name='repassword'
                onBlur={handleBlur}
                error={touched.repassword && errors.repassword}
              />
              <Button type='submit'>Signup</Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}

export default Signup
