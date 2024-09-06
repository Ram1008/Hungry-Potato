import './register.scss';
import { useState, useContext } from 'react';
import {
  Formik,
  Form,
  Field
} from 'formik';
import * as Yup from 'yup';
import {authContext} from '../../context';
import { SendOtpButton, TextInputField } from '../../component';
import { useNavigate } from 'react-router-dom'; 


const Register = () => {
    const [otpStatus, setOtpStatus] = useState(0);
    const context = useContext(authContext);
    const auth = context;
    const navigate = useNavigate();
    const initialValues = {
        name:'',
        type:'customer',
        mobileNumber: '',
        otp: ''
    };

    const getValidationSchema = () => {
        return Yup.object({
            name: Yup.string().required('Name is required'),
            type: Yup.mixed().oneOf(['customer', 'employee']).required('Type is required'),
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
            const response = await auth.register(values.name, values.type, values.mobileNumber, values.otp);
            if (response.status) {
              console.log(response);
              navigate('/');
            }
          } catch (error) {
            console.error('Registration  failed', error);
          }
        }
        setSubmitting(false);
    };

    const handleSendOtp = async (mobileNumber) => {
        const response = await auth.getOtp(mobileNumber);
        if (response.status) {
          setOtpStatus(1);
        }
        else{
          setOtpStatus(2);
        }
    };
  return (
    <div className="register_container">
      <header className='register_head'>
        <div className='head-background'></div>
        <div className='head-logo'></div>
        <div>
          <h1>Register</h1>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      </header>
      <div className='register_body'>
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema}
          onSubmit={handleSubmit}
        >
          {formik => (
            <Form className="register_form">
                <div className='user-type'>
                    <button type='button' className='register-type'>Customer</button>
                    <button type='button' className='register-type'>Employee</button>
              </div>
              <div className='form-field'>
                  <label htmlFor="mobileNumber">Enter your name</label>
                  <Field name="name">
                    {({ field }) => (
                      <div className='register_field-group'>
                        <div className='register_field'>
                          <TextInputField field = {field} />
                        </div>
                      </div>
                    )}
                  </Field>
                  {formik.touched.name && formik.errors.name ? (
                    <p style={{color:'red'}}>{formik.errors.name}</p>
                  ) : null}
              </div>
              <div className='form-field'>
                <label htmlFor="mobileNumber">Enter your phone number</label>
                <div >
                  <Field name="mobileNumber">
                    {({ field, form }) => (
                      <div className='register_field-group'>
                        <div className='register_field'>
                          <TextInputField field = {field} />
                        </div>
                        <div className='otp-button'>
                          <button  type='button' onClick={() => handleSendOtp(field.value)} >Send</button>
                        </div>
                        
                      </div>
                    )}
                  </Field>
                  {otpStatus == 1 && <p style={{color:'green'}}> Otp sent!</p>}
                  {otpStatus == 2 && <p style={{color:'red'}}> Resend Otp!</p>}
                  {formik.touched.mobileNumber && formik.errors.mobileNumber  ? (
                    <p style={{color:'red'}}>{formik.errors.mobileNumber}</p>
                  ) : null}
                </div>
              </div>
              <div className='form-field'>
                <label>Enter OTP</label>
                  <Field name="otp">
                    {({ field }) => (
                      <div className='register_field-group'>
                        <div className='register_field'>
                          <TextInputField field = {field} />
                        </div>
                      </div>
                    )}
                  </Field>
                  {formik.touched.otp && formik.errors.otp ? (
                    <p style={{color:'red'}}>{formik.errors.otp}</p>
                    ) : null}
                </div>
              
                <div className='register_submit'>
                  <button type='submit' disabled={formik.isSubmitting}>Submit</button>
                </div>
            </Form>
          )}
        </Formik>
        </div>
        <div className='register_footer'>
        By clicking, I accept the <span>Terms & conditions</span> and <span>Privacy Policy</span>!
        </div>
    </div>
  )
}

export default Register;