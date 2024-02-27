export const ParseApiResponse = (apiResponse) => {
    let dataTableSouce = {};
    let cols = [];
    let data = [];
    if(apiResponse){
        if(apiResponse[0]){
          apiResponse[0].map((header, index) => (
            cols.push({
              name: header,
              selector: row => row[header],
              sortable: true
            })  
        ))}
      //setColumns(cols);
      if(apiResponse && apiResponse.length > 1){
        for (let index = 1; index < apiResponse.length; index++) {
          let row = {};
          apiResponse[index].map((value, colIndex) => {
            row[cols[colIndex].name] = value
          }
            
          )
          data.push(row);
        }
        //setTableData(data);
        }
  
      }
      dataTableSouce.columns = cols;
      dataTableSouce.data = data;

      return dataTableSouce;
}