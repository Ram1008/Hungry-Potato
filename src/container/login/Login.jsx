import { useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {authContext} from '../../context';
import './login.scss';
import { TextInputField } from '../../component';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [otpStatus, setOtpStatus] = useState(0);
  const context = useContext(authContext);
  const auth = context;
  const navigate = useNavigate();

  const initialValues = {
    mobileNumber: '',
    otp: ''
  };

  const getValidationSchema = () => {
    return Yup.object({
      mobileNumber: Yup.string()
        .matches(/^\d{10}$/, 'Must be a valid 10-digit mobile number')
        .required('Mobile number is required'),
      otp: otpStatus === 1 ? Yup.string().required('OTP is required') : Yup.string()
    });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    if (otpStatus === 1) {
      try {
        const response = await auth.login(values.mobileNumber, values.otp);
        if (response.status) {
          console.log(response.data);
          navigate('/');
        }
      } catch (error) {
        console.error('Invali credentials', error);
      }
    }
    setSubmitting(false);
  };

  const handleSendOtp = async (mobileNumber) => {
    try {
      const response = await auth.getOtp(mobileNumber);
      if (response.status) {
        setOtpStatus(1);
      } else {
        setOtpStatus(2);
      }
    } catch (error) {
      console.error('Failed to send OTP', error);
    }
  };

  return (
    <div className= 'login_container'>

      <header className='login_head'>
        <div className='head-background'></div>
        <div className='head-logo'></div>
        <div>
          <h1>Login</h1>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      </header>
      <div className='login_body'>
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema}
          onSubmit={handleSubmit}
          
        >
          {formik => (
            <Form className="login_form">
              
                <div className='form-field'>
                  <label htmlFor="mobileNumber">Enter your phone number</label>
                  <Field name="mobileNumber">
                    {({ field }) => (
                      <div className='login_otp'>
                        <div className='otp-field'>
                          <TextInputField field={field} />
                        </div>
                        <div className='otp-button'>
                          <button  type='button' onClick={() => handleSendOtp(field.value)} >Send</button>
                        </div>
                      </div>
                    )}
                  </Field>
                  {otpStatus === 1 && <p style={{color: 'green'}}> OTP sent!</p>}
                  {otpStatus === 2 && <p style={{color: 'red'}}> Resend OTP!</p>}
                  {formik.touched.mobileNumber && formik.errors.mobileNumber && (
                    <p >{formik.errors.mobileNumber}</p>
                  )}
                </div>
                <div className='form-field'>
                  <label>Enter OTP</label>
                  <Field name="otp">
                    {({ field }) => (
                      <div className='login-otp'>
                        <div className='otp-field'>
                          <TextInputField field={field} />
                        </div>
                      </div>
                    )}
                  </Field>
                  {formik.touched.otp && formik.errors.otp && (
                    <p style={{color: 'red'}}>{formik.errors.otp}</p>
                  )}

                </div>
                <div className='login_submit'>
                  <button type='submit' disabled={formik.isSubmitting}>Submit</button>
                </div>
              
            </Form>
          )}
        </Formik>
      </div>
      <div className='login_footer'>
        By clicking, I accept the <span>Terms & conditions</span> and <span>Privacy Policy</span>!
      </div>
    </div>
  );
};

export default Login;
