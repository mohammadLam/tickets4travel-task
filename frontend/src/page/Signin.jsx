import React from 'react'
import { Form, Field, Formik } from 'formik'
import { string, object } from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'

import Button from '../component/Button'
import Input from '../component/Input'
import Container from '../component/Container'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth'

const SignIn = () => {
  const { dispatch } = useContext(AuthContext)

  const initialValue = {
    email: '',
    password: ''
  }

  // yup validation schema
  const validationSchema = object().shape({
    email: string().required().email(),
    password: string().required().min(8)
  })

  // signin function
  const signin = async values => {
    try {
      const { data, status } = await axios.post('/auth/signin', values, {
        withCredentials: true
      })

      // if signin success
      if (status === 200) {
        dispatch({
          type: 'authenticated',
          payload: {
            name: data.name,
            email: data.email
          }
        })
        toast.success('Signin Success')
      }
    } catch (error) {
      // if signin failed
      toast.error(error.response.data.message)
    }
  }

  return (
    <Container>
      <div className='w-full md:w-[400px] px-8 py-5 border rounded-xl mx-auto mt-10 md:mt-32 bg-white'>
        <h1 className='text-2xl md:text-3xl font-bold mb-5'>Login to your account</h1>
        <Formik initialValues={initialValue} validationSchema={validationSchema} onSubmit={signin}>
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
              <Field
                as={Input}
                placeholder='Password'
                type='password'
                name='password'
                onBlur={handleBlur}
                error={touched.password && errors.password}
              />
              <div className='text-sm text-blue-500 mb-3'>
                <Link to='/forgot-password'>Forgot Password?</Link>
              </div>
              <Button type='submit'>Signin</Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}

export default SignIn
