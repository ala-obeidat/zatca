const e = require('express');
var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }))
var http = require('http');
app.get("/", function(req, res){
	res.render('index.ejs'); 
});
app.get('/ping', (req, res) => {
    res.write('ZATCA QR-Code web portal');
  })
  app.post("/form", function(req, res){
    var data=req.body;
    data.date=data.date+':00Z';
    var qrcode=getQrcode(data.sellerName,data.vatNumber,data.date,data.total,data.vat);
    console.log('Request',data);

    res.redirect(getRedirectUrl(qrcode));
});

app.post("/api", function(req, res){
    console.log({requestBody: req.body});
    var qrcode=getQrcode(req.body.sellerName,req.body.vatNumber,req.body.date,req.body.total,req.body.vat);
    res.json({'QR-Text':qrcode,'Data':req.body});
});

var server = http.createServer(app);
let port=3000;
server.listen(process.env.PORT || port,() => console.log(`server is running at ${port}`));




function getValue(tagNum,tagValue){
    var tagBuf=Buffer.from([tagNum],'utf8');
    let length=tagValue.length;
    if (/[\u0600-\u06FF]/.test(tagValue))
    {
        length=0;
        for (var i = 0; i < tagValue.length; i++) {
            if (/[\u0600-\u06FF]/.test(tagValue.charAt(i)))
                length=length+2;
            else
                length=length+1;
          }
    }
    var tagValueLenBuf=Buffer.from([length],'utf8');
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
        console.log('Hexa',qr);
        var base64Code=qr.toString('base64');
        return base64Code;
    }
    function getRedirectUrl(code){
        return 'https://qrcode.alaobeidat.com?code='+code;
    }
