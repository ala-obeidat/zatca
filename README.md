# zatca QR code generatore

An unofficial package to help developers implement ZATCA (Fatoora) QR code easily which is required for e-invoicing in Saudi Arabia.

✨ You could use it in both frontend and backend Nodejs projects.

✅ Validated to have the same output as ZATCA's SDK as of 30 November 2021.

## demo:
* [Web portal](https://zatca.alaobeidat.com) 
* API: `HTTP POST` [https://zatca-sa.herokuapp.com/api](https://zatca-sa.herokuapp.com/api)
```json
   {
     "sellerName":"علاء alaa",
     "vatNumber":"123456789",
     "date":"2021-11-30T13:12:53Z",
     "total":"11500",
     "vat":"1500"
   }
```
