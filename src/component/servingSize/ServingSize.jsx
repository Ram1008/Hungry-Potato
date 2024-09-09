import './ServingSize.scss';

const ServingSize = ({ dish, servingSize, setServingSize }) => {
  const handleChange = (e) => {
    setServingSize(e.target.value);
  };

  if (!dish.servingSize || dish.servingSize.length === 0) {
    return <></>;
  }

  return (
    <div className='servingSize_container'>
      <div>
        Serving size
      </div>
      <hr />
      <div className="servingSize_sizes">
        {dish.servingSize.map(sizeItem => {
          return(
          <div key={sizeItem._id}>
            <input
              id={sizeItem._id} 
              type="radio"
              name="servingSize"
              value={sizeItem._id}
              checked={sizeItem._id === servingSize}
              onChange={handleChange}
            />
            <label htmlFor={sizeItem._id}>{sizeItem.size}</label>
          </div>
        )})}
      </div>
    </div>
  );
};

export default ServingSize;
