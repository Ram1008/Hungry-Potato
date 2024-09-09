import './switchButton.scss';

const SwitchButton = ({ onToggle }) => {

  const handleChange = (e) => {
    onToggle(e.target.onToggle);
  };

  return (
    <div className="switch-container">
      <input 
        type="checkbox" 
        className="switch-checkbox" 
        id="checkbox" 
        onChange={handleChange} 
      />
      <label className="switch-switch" htmlFor="checkbox">
        <span className="switch-slider"></span>
      </label>
    </div>
  );
};

export default SwitchButton;
