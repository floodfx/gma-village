# Gma Village Import Data

Imports data from a given spreadsheet to a given google cloud datastore.

This script uses Google "[Application Default Credentials](https://developers.google.com/identity/protocols/application-default-credentials?hl=en_US)" to authorize script against the [Google Sheets API](https://developers.google.com/sheets/guides/concepts)

To run it:
```
node index.js --SPREADSHEET_ID='YOUR_SPREADSHEET_ID'
```
or
```
node index.js --SPREADSHEET_ID='YOUR_SPREADSHEET_ID' --SPREADSHEET_API_SCOPES='YOUR_SCOPES'
```

The default scope is:
```
https://www.googleapis.com/auth/spreadsheets.readonly
```
