const stripe = require('stripe')('sk_test_51MsDgLAlSphatrSrZF0FCPNsjzXoee2NBiIdTsbtCj99etvWARd4ydiFBmM1gbRHniOYPaApw4n3NYzWqYXrAevI00eMiD4jaO');

[
    "acct_1N7msCPA5CnGJhRm",
    "acct_1N0Ut4PFz8PhUZC2",
    "acct_1MzP75PLxhMkqxKU"

].map(async (i)=>{
    const deleted = await stripe.accounts.del(
      i
    );
    console.log(deleted)
})
