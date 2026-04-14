// This script helps set up the Google Sheet for call transfers
// Run this once to create the proper headers

const headers = [
  ['ID', 'Phone Number', 'Created At', 'Updated At', 'Is Active']
];

console.log('Call Transfers Sheet Setup:');
console.log('Create a new sheet tab named "CallTransfers" with the following headers:');
console.table(headers);

console.log('\nEnvironment Variables to set:');
console.log('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS=<your-service-account-json>');
console.log('CALL_TRANSFERS_SHEET_ID=<your-spreadsheet-id>');
console.log('(or use SHEET_ID if you want to use the same sheet)');

console.log('\nSheet structure:');
console.log('Column A: ID (unique identifier)');
console.log('Column B: Phone Number');
console.log('Column C: Created At (ISO timestamp)');
console.log('Column D: Updated At (ISO timestamp)');
console.log('Column E: Is Active (true/false)');
