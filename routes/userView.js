/**
 * Import node modules
 */
const express = require('express');
const Router = express.Router();
const User = require('../models/userView');
const moment = require('moment');
/**
 * Authenticate router
 */
Router.post('/populateData', (req, res, next) => {
    let arr = [
        {
            "UserId": "6151164178",
            "ViewDate": moment().toISOString(),
            "ProductId": "001"
        },
        {
            "UserId": "1655904096", "ViewDate": moment().toISOString(), "ProductId": "002"
        },
        {
            "UserId": "5332972455",
            "ViewDate": moment().subtract(1, 'd').toISOString(),
            "ProductId": "003"
        },
        {
            "UserId": "7290802899",
            "ViewDate": moment().subtract(35, 'd').toISOString(),
            "ProductId": "004"
        },
        {
            "UserId": "9123918569",
            "ViewDate": moment().subtract(27, 'd').toISOString(),
            "ProductId": "005"
        },
        {
            "UserId": "7763971640",
            "ViewDate": moment().subtract(17, 'd').toISOString(),
            "ProductId": "006"
        },
        {
            "UserId": "4583646426",
            "ViewDate": moment().subtract(5, 'd').toISOString(),
            "ProductId": "007"
        },
        {
            "UserId": "6576323600",
            "ViewDate": moment().subtract(9, 'd').toISOString(),
            "ProductId": "008"
        },
        {
            "UserId": "1111200786",
            "ViewDate": moment().subtract(3, 'd').toISOString(),
            "ProductId": "009"
        },
        {
            "UserId": "5675352998",
            "ViewDate": moment().subtract(21, 'd').toISOString(),
            "ProductId": "010"
        },
        {
            "UserId": "4784962865",
            "ViewDate": moment().subtract(23, 'd').toISOString(),
            "ProductId": "011"
        },
        {
            "UserId": "5025334021",
            "ViewDate": moment().subtract(30, 'd').toISOString(),
            "ProductId": "012"
        },
        {
            "UserId": "9264434437",
            "ViewDate": moment().subtract(16, 'd').toISOString(),
            "ProductId": "013"
        },
        {
            "UserId": "1052579114",
            "ViewDate": moment().subtract(11, 'd').toISOString(),
            "ProductId": "014"
        },
        {
            "UserId": "5874075497",
            "ViewDate": moment().subtract(25, 'd').toISOString(),
            "ProductId": "015"
        },
    ];
    // arr.forEach(element =>  {
    // console.log("ELEment",element);
    User.adduserViewData(arr, (err, user) => {
        if (err) {
            console.log("Error", err);
            res.json({
                'success': false,
                'message': `Failed to register user.`
            });
        } else {
            console.log("user", user);
            res.json({
                'success': true,
                'message': `User registered.`
            });
        }
    });
    // });




});


Router.post('/getReport', (req, res, next) => {
    User.getTotalUser((err, total_count) => {
        console.log("total_count", total_count)

        let query = {};
        let isInputValid = 1;
        switch (req.body.optionType) {
            case 1:
                // crrent day
                query = { $and: [{ ViewDate: { $gte: moment().format("YYYYMMDD") } }] };
                break;
            case 2:
                // past 7 days
                let week_date = moment().subtract(7, 'd').toDate();
                query = { $and: [{ ViewDate: { $lte: moment().endOf('day') } }, { ViewDate: { $gte: week_date } }] };
                break;
            case 3:
                // past 1 month
                let month_date = moment().subtract(1, 'months').toDate();
                query = { $and: [{ ViewDate: { $lte: moment().endOf('day') } }, { ViewDate: { $gte: month_date } }] };
                break;
            case 4:
                // custom date filter
                let start_date = moment(req.body.startDate).toDate();
                let end_date = moment(req.body.endDate).toDate();
                if (start_date && end_date && end_date >= start_date) {
                    query = { $and: [{ ViewDate: { $lte: end_date } }, { ViewDate: { $gte: start_date } }] };
                    break;
                } else {
                    isInputValid = 0;
                    break;
                }
            default:
                query = {};
        }
        if (isInputValid) {
            User.getUniqueUser(query, (err, unique_data) => {
                res.json({ "success": true, "data": { "total_view_count":total_count, "unique_data": unique_data } })
            })
        }
        else {
            res.json({ "success": false, "message": "Invalid Input." })
        }

    })
});
/** POST requests ends here */

module.exports = Router;