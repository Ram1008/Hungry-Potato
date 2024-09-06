import './submitButton.scss';

const SubmitButton = ({disabled}) => {
  return (
    <button className='submitButton-container' type='submit' disabled={disabled}>Submit</button>
  )
}

export default SubmitButton;