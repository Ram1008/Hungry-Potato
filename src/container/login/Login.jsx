import { useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { authContext } from '../../context';
import './Login.scss';
import { TextInputField } from '../../component';
import { useNavigate, useLocation } from 'react-router-dom'; 

const Login = () => {
  const [otpStatus, setOtpStatus] = useState(0);
  const { login, getOtp } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    mobileNumber: '',
    otp: ''
  };

  const validationSchema = Yup.object({
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, 'Must be a valid 10-digit mobile number')
      .required('Mobile number is required'),
    otp: otpStatus === 1 ? Yup.string().required('OTP is required') : Yup.string()
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      if (otpStatus === 1) {
        const response = await login(values.mobileNumber, values.otp);
        if (response.status) {
          const redirectPath = location.state?.from || '/'; 
          navigate(redirectPath);
        }
      }
    } catch (error) {
      console.error('Invalid credentials', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendOtp = async (mobileNumber) => {
    try {
      const response = await getOtp(mobileNumber);
      setOtpStatus(response.status ? 1 : 2);
    } catch (error) {
      console.error('Failed to send OTP', error);
    }
  };

  return (
    <div className='login_container'>
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
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
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
                        <button type='button' onClick={() => handleSendOtp(field.value)}>Send</button>
                      </div>
                    </div>
                  )}
                </Field>
                {otpStatus === 1 && <p style={{ color: 'green' }}>OTP sent!</p>}
                {otpStatus === 2 && <p style={{ color: 'red' }}>Resend OTP!</p>}
                {touched.mobileNumber && errors.mobileNumber && (
                  <p style={{ color: 'red' }}>{errors.mobileNumber}</p>
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
                {touched.otp && errors.otp && (
                  <p style={{ color: 'red' }}>{errors.otp}</p>
                )}
              </div>
              <div className='login_submit'>
                <button type='submit' disabled={isSubmitting}>Submit</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className='login_footer'>
        By clicking, I accept the <span>Terms & Conditions</span> and <span>Privacy Policy</span>!
      </div>
    </div>
  );
};

export default Login;
