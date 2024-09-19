import { useContext } from 'react';
import './SwitchButton.scss';
import { dishContext } from '../../context';


const SwitchButton = () => {
  const { handleVegMode } = useContext(dishContext);

  const handleChange = (e) => {
    handleVegMode(e.target.checked);
  };

  return (
    <>
      <div style={{ color: 'white' }}>NAHHHH!</div>
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
        <div style={{ color: 'white' }}>Veg Mode</div>
      </>
  );
};

export default SwitchButton;
