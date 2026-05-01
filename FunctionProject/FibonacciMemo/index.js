var bigInt = require("big-integer");

// Cache global para memoization
let memo = {};

function fibonacciMemo(n) {
    if (n in memo) {
        return memo[n];
    }
    
    if (n === 0) {
        memo[n] = bigInt.zero;
        return bigInt.zero;
    }
    if (n === 1) {
        memo[n] = bigInt.one;
        return bigInt.one;
    }
    
    let result = fibonacciMemo(n - 1).add(fibonacciMemo(n - 2));
    memo[n] = result;
    return result;
}

module.exports = async function (context, req) {
    context.log('FibonacciMemo HTTP trigger function processed a request.');

    let nth = req.body.nth;

    if (nth < 0) {
        context.res = {
            status: 400,
            body: "must be greater than 0"
        };
        return;
    }

    try {
        let answer = fibonacciMemo(nth);
        context.res = {
            body: answer.toString()
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: "Error: " + error.message
        };
    }
};
