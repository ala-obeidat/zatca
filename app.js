var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }))
var http = require('http');
app.get("/", function(req, res){
	res.render('index.ejs');
    //res.sendFile(__dirname,'',"index.html");
});
app.post('/test', (req, res) => {
    res.write('ZATCA QR-Code Web portal')  // <==== req.body will be a parsed JSON object
  })
  app.post("/form", function(req, res){
    var qrcode=getQrcode(req.body.sellerName,req.body.vatNumber,req.body.date+':00Z',req.body.total,req.body.vat);
    res.redirect(getRedirectUrl(qrcode));
});
app.post("/api", function(req, res){
    console.log({requestBody: req.body});
    var qrcode=getQrcode(req.body.sellerName,req.body.vatNumber,req.body.date,req.body.total,req.body.vat);
    res.json({'QR-Text':qrcode});
});

var server = http.createServer(app);
let port=3000;
server.listen(process.env.PORT || port,() => console.log(`server is running at ${port}`));




function getValue(tagNum,tagValue){
    var tagBuf=Buffer.from([tagNum],'utf8');
    var tagValueLenBuf=Buffer.from([tagValue.length],'utf8');
    var tagValueBuf=Buffer.from(tagValue,'utf8');
    var bufsArray = [tagBuf,tagValueLenBuf, tagValueBuf];
    return Buffer.concat(bufsArray);
    }
    function getQrcode(sellerName,vatNumber,date,total,vat){
        let data1=getValue('1',sellerName);
        let data2=getValue('2',vatNumber);
        let data3=getValue('3',date);
        let data4=getValue('4',total);
        let data5=getValue('5',vat);
        var tags=[data1,data2,data3,data4,data5];
        var qr=Buffer.concat(tags);
        var base64Code=qr.toString('base64');
        return base64Code;
    }
    function getRedirectUrl(code){
        return 'https://qrcode.alaobeidat.com?code='+code;
    }
