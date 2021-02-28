const https = require('https');

// function returns a Promise
const getPromise = (uid, page = 1) => {
    return new Promise((resolve, reject) => {
        https.get(`https://jsonmock.hackerrank.com/api/transactions/search?userId=${uid}&page=${page}`, response => {
            let chunks_of_data = [];

            response.on('data', fragments => {
                chunks_of_data.push(fragments);
            });
            response.on('end', () => {
                let data = Buffer.concat(chunks_of_data);
                resolve(JSON.parse(data));
            });
            response.on('error', error => {
                reject(error);
            });
        });
    });
};

// async function to make http request
const makeSynchronousRequest = async uid => {
    try {
        // making a req for number of pages
        let http_promise = getPromise(uid);
        let response_body = await http_promise;
        let transactions = [];
        for (let page_num = 1; page_num <= response_body.total_pages; page_num++) {
            // making a req for transactions by user id
            let http_promise = getPromise(uid, page_num);
            let response_body = await http_promise;
            // holds response from server that is passed when Promise is resolved
            response_body.data.forEach(item => {
                transactions.push(item);
            });
        }
        return transactions.sort();
    } catch (error) {
        // Promise rejected
        console.log(error);
    }
};

/*
 * Complete the 'getUserTransaction' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER uid
 *  2. STRING txnType
 *  3. STRING monthYear
 *
 *  https://jsonmock.hackerrank.com/api/transactions/search?userId=
 */
async function getUserTransaction(uid, txnType, monthYear) {
    var data = await makeSynchronousRequest(uid);
    var averageData = data.filter(e => (e.txnType == txnType) && (new Date(e.timestamp).toISOString().slice(5, 7) + '-' + new Date(e.timestamp).toISOString().slice(0, 4) == monthYear))
    var sum = 0
    for (let i = 0; i < averageData.length; i++) {
        //console.log(averageData[i], (new Date(averageData[i].timestamp).toISOString()))
        sum += parseFloat(averageData[i].amount.replace(/,/g, '').slice(1, averageData[i].amount.length))
    }
    var average = sum / averageData.length
    var idsGreaterThanAverage = averageData.filter(e => (parseFloat(e.amount.replace(/,/g, '').slice(1, e.amount.length)) > average) && (e.txnType) == txnType).map(e => e.id)
    console.log(idsGreaterThanAverage)
    return idsGreaterThanAverage
}

getUserTransaction(4, 'debit', '02-2019');