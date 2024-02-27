// TableComponent.js
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import TableHeader from './TableHeader';
import './styles.css'

const Table = ({ columns, data, fetchData, handleSubmit, }) => {
 
  return (
    <div className='data-table-div'>
    {/* <TableHeader fetchData = {fetchData} handleSubmit = {handleSubmit}/> */}
    <DataTable
			columns={columns? columns : []}
			data={data? data: []} 
      
      
		/></div>
   
  );
};

export default Table;
