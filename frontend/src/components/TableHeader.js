// TableComponent.js
import React, { useEffect, useState } from 'react';
import Form from './Form';
// import DataTable from 'react-data-table-component';

const TableHeader = (fetchData, handleSubmit) => {
  
  return (
    <>
    
    <div>
    <Form onSubmit={handleSubmit}/>Assingment</div>

    </>

  );
};

export default TableHeader;
