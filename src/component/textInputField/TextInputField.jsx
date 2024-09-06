import './textInput.scss';

const TextInputField = ({field}) => {
  return (
    <input className='textInput-container' type="text" {...field}/>
  )
}

export default TextInputField;