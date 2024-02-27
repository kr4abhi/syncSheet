import './styles.css'
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Form = ({ onSubmit , onCancel}) => {
  const [formData, setFormData] = useState({ AvatarName: '', PerformanceScore: '' });
  //const [isAdding, setIsAdding] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.AvatarName || !formData.PerformanceScore) {
      toast.error('Please fill in all fields');
      return; // Exit early if any field is empty
    }
    if (isNaN(parseFloat(formData.PerformanceScore))) {
      toast.error('Performance Score must be a number');
      return; // Exit early if PerformanceScore is not a number
    }

    onSubmit(formData);
    setFormData({ AvatarName: '', PerformanceScore: '' }); // Clear form after submission
  };

  return (
    <>
    <div className="formcontainer">
        <form onSubmit={handleSubmit} className='add-form'>
          <input type="text" name="AvatarName" value={formData.AvatarName} onChange={handleChange} placeholder="Avatar Name" />
          <input type="text" name="PerformanceScore" value={formData.PerformanceScore} onChange={handleChange} placeholder="Performance Score" />
          <button type="submit">Submit</button>
          <button onClick={() => onCancel()}>Cancel</button>
        </form>
      </div>
    </>
  );
};

export default Form;
