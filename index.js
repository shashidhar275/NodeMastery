const http = require('http');
const fs = require('fs');
const url = require('url');
const myServer = http.createServer();

myServer.on('request',(req,res)=>{
    if(req.url === '/favicon.ico')
    {
        return res.end();
    }
    const myUrl = url.parse(req.url,true); //true => In orderr to parse query parameter string 
    const log = `${Date.now()} ${req.method} ${req.url} New request received\n`;
    fs.appendFile('log.txt',log,(err)=>{
        switch(myUrl.pathname){   //Supporting multiple routes using switch
            case '/': 
            if(req.method === 'GET'){
                res.end("Homepage");
            }
            break;
            case '/about': 
            const name=myUrl.query.name;
            res.end(`Hi!... ${name}`);
            break;
            case '/search': 
            const search = myUrl.query.search_query;
            res.end("Here are your results for "+ search);
            break;
            case '/signup':           //ROUTE
                if(req.method==='GET'){     //Like this every route can have 5 different http methods 
                    res.end('This is the form data');
                }
                if(req.method==='POST'){
                    // DB QUERY
                    res.end('Success');
                }
                break;
            default: res.end("404 Not Found");
            break;
        }
    })
});

myServer.listen(8000,()=>{console.log("Server started listening")});