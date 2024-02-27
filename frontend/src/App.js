// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {RotatingLines} from "react-loader-spinner"
import Table from './components/Table';
import Form from './components/Form';
import {ParseApiResponse} from "./components/data-helper";
import './App.css';

const App = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isNewDataFormOpen , setIsNewDataFormOpen] = useState(false);
  const [isLoading , setIsLoading] = useState(true);
  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/sync');
      setDataSource(ParseApiResponse(response.data));
      console.log("res",response);
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
    
  };

  // Function to handle form submission
  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setIsNewDataFormOpen(false);
      await axios.post('/api/addRow', formData);
      fetchData(); // Refresh data after adding new entry
    } catch (error) {
      console.error('Error adding data:', error);
      setIsLoading(false);
    }
    setIsNewDataFormOpen(false);
  };

  // Effect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <div style={{ display: 'flex', marginTop: '10px' , width:'100%'}}>
      <div style={{ width:'40%', marginBottom: '10px',paddingLeft:'10px'}}>Assingment</div>
      <div style={{ width:'30%'}}></div>
      <div style={{ width:'30%', paddingRight:'20px'}}>
        <button style={{ float: "right"}} onClick={fetchData}>Sync Sheet</button>
        <button style={{ float: "right", marginRight:'20px'}} onClick={() => setIsNewDataFormOpen(true)}>Add New</button>
      </div>
      {/* <Form onSubmit={handleSubmit}/> */}
    </div>
      {isLoading && <div style={{height:'100%', width:'100%', textAlign: 'center', display: 'block', zIndex:100}}><RotatingLines height={'25%'} width={'25%'}></RotatingLines></div>}
      <div style={{display: 'block'}}>
        {isNewDataFormOpen && <Form onSubmit={handleSubmit} onCancel={() => setIsNewDataFormOpen(false)}/>}
        {!isNewDataFormOpen && !isLoading && <Table columns={dataSource.columns} data={dataSource.data} fetchData = {fetchData} handleSubmit = {handleSubmit} />}
      </div>
      
      
      
      </>
  );
};

export default App;
