## userView
1) Populate the data by executing following Api.
    - POST method - http://localhost:3000/userview/populateData   

2) Execute following Api. to receive the desired output
    - POST method - http://localhost:3000/userView/getReport

    - Please pass appropriate options as payload from the following:
        - {"optionType" : 1} to fetch data for current day
        - {"optionType" : 2} to fetch data for past week
        - {"optionType" : 3} to fetch data for past month
        - {"optionType":4,"startDate":"2019-11-27","endDate":"2019-11-28"} to fetch data using custom date filter.



# Installation
npm install
npm run start