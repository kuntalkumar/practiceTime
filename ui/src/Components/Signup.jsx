import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SignUp.css'; // Import CSS file

const Signup = () => {
  const [isOnline, setIsOnline] = useState(true); // Assume online initially
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  if(isOnline){
    
  }

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine); // Update online status
    };

    window.addEventListener('online', handleOnlineStatus); // Listen for online event
    window.addEventListener('offline', handleOnlineStatus); // Listen for offline event

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update form data
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (isOnline) {
      // If online, send data to server
      try {
        const response = await axios.post('https://fine-cyan-butterfly-cuff.cyclic.app/signup', {
          name,
          email,
          password,
        });
  
        if (response.status === 201) {
          console.log(response.data); // Log response data
          alert("Signup Successfully !");
          // Display success message or redirect
        } else {
          alert("Signup Failed !");
          console.error('Error:', response.statusText);
          // Display error message
        }
      } catch (error) {
        alert("Signup Failed!!!!!");
        console.error(error); // Log error
        // Display error message
      }
    } else {
      // If offline, store data locally for later submission
      localStorage.setItem('offlineFormData', JSON.stringify(formData)); // Store form data in local storage
      alert("Data is stored Locally");
      // Display message indicating offline mode
    }
  };
  
  return (
    <div className='parent'  >

    <div  className={isOnline ? 'online' : 'offline'}>

      <h1>Schrodinger's Signup</h1>
      <form onSubmit={handleSubmit}>
      
      <label htmlFor="">Name</label>  
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required/>
     
      <label htmlFor="">Email</label>  
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
       
        <label htmlFor="">Password</label>  
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">{isOnline ? 'Sign Up' : 'Save Offline'}</button>
      </form>
    </div>
    </div>

  );
};

export default Signup;
