const express = require("express");
const {google} = require("googleapis");
const dotenv = require("dotenv");
// const cors = require("cors");

dotenv.config();
const app = express();
PORT = process.env.PORT || 6000;

app.use(express.json());
// app.use(cors());

// Create authentication client
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

// Get client instance for auth
const getClient = async () => {
  return await auth.getClient();
};

// Instance of Google Sheets API
const getGoogleSheetsInstance = async () => {
  const client = await getClient();
  return google.sheets({ version: 'v4', auth: client });
};

// POST route to handle form submissions
app.post('/api/addRow', async (req, res) => {
  try {
    // Get Google Sheets instance
    const googleSheets = await getGoogleSheetsInstance();

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "Sheet1",
      });

      const rows = getRows.data.values || [];
      const serialNumber = rows.length; 
      const {AvatarName, PerformanceScore} = req.body;

      if (isNaN(PerformanceScore)) {
        throw new Error('Number must be a valid number.');
      }
    
      // Write row(s) to spreadsheet
      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "Sheet1!A:C",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[serialNumber, AvatarName, PerformanceScore]],
        },
      });

    res.sendStatus(200);
  } catch (error) {
    console.error('Error handling form submission:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET route to sync with spreadsheet
app.get('/api/sync', async (req, res) => {
  try {
    // Get Google Sheets instance
    const googleSheets = await getGoogleSheetsInstance();

    // Example: Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1',
    });

    // Process the retrieved data as needed
    const rows = getRows.data.values;

    console.log('Synced data:', rows);
    

    res.send(rows);
  } catch (error) {
    console.error('Error syncing with spreadsheet:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, (req, res)=>{
    console.log(`running on ${PORT}`);
})