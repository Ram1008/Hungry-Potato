import './SendOtpButton.scss';

const SendOtpButton = ({ onClick }) => {
  return (
    <button
      className='sendOtpButton-container'
      type='button'
      onClick={onClick}
    >
      Send OTP
    </button>
  );
};

export default SendOtpButton;
