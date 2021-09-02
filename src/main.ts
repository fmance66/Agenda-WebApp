import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Request, Response, Express}  from 'express';
import { IpService } from './app/services/ip.service';
// import { Morgan } from 'morgan';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


/************************************************************************************
*************************************************************************************
************************************************************************************/

// const requestIp = require('request-ip');

// // inside middleware handler
// const ipMiddleware = function(req: any, res: any, next: () => void) {
//   const clientIp = requestIp.getClientIp(req);
//   console.log(clientIp);
//   next();
// };

// on localhost you'll see 127.0.0.1 if you're using IPv4
// or ::1, ::ffff:127.0.0.1 if you're using IPv6

//  var request = require('request');
//  var express = require('express');

//  var morgan = require('morgan');
/*

 var fs = require('fs');
 var path = require('path');
 var http = require('http');
 var uri = require('url');

 var app = express();

 var requestIp = require('request-ip');
 var proxy = require('express-http-proxy');

 var config = require('./server-config.json');

 // Constants
 var APP_PORT = config.listen;
 var SERVICE_HOST = config.servint;

 var SERVICE_URL = 'http://' + SERVICE_HOST;

 var DEINCO_SERVICE = "/secure/deinco/agenda";
 var IP_ENDPOINT = "/consulta.asp?i=";
 var CUIL_ENDPOINT = "/consulta.asp?c=";



 // Setup
 var port = process.env.PORT || APP_PORT;
 var logFilePath = path.join(__dirname, 'logs/agenda-web-access.log');

 // Log
 var accessLogStream = fs.createWriteStream(logFilePath, {flags: 'a'});
 var logger =  morgan('combined', {stream: accessLogStream});

 // setup the logger
 app.use(logger);

 // serve the webapp
 app.use('/app', express.static(__dirname + '/../app')); // serving the web app

 app.get('/api/me', function (req: Request, res: Response) {
     var ip = requestIp.getClientIp(req);
     if (ip == null || ip == undefined) ip = '';
     if (ip.substr(0, 7) == "::ffff:") {
         ip = ip.substr(7)
     }

     var path = DEINCO_SERVICE + IP_ENDPOINT + ip;

     var options = {
         host: SERVICE_HOST,
         path: path
     };

     http.request(options, function(res2: Response) {

         var body = '';

         res2.on('data', function(chunk: number){
             body += chunk;
         });

         res2.on('end', function(){
             try {
                 var ipResponse = JSON.parse(body);

                 if (ipResponse.Agentes != undefined) {
                     var f = ipResponse.Agentes[0].cuil;

                     var path2 = DEINCO_SERVICE + CUIL_ENDPOINT + f;
                     var options2 = {
                         host: SERVICE_HOST,
                         path: path2
                     };

                     http.request(options2, function(res3: Response) {
                         try {
                             res3.pipe(res);
                         } catch (e3) {
                             res3.sendStatus(500);
                         }
                     }).on('error', function(e: any, res3: Response) {
                         res3.sendStatus(500);
                     }).end();
                     return
                 }
             } catch (e2) {
             }
             res2.pipe(res);
         });

     }).on('error', function(e: any) {
         res.sendStatus(500);
     }).end();
 });

 // api for servint
 app.use('/api/agenda', proxy(SERVICE_URL, {
     forwardPath: function(req: Request, res: Response) {
         return DEINCO_SERVICE + uri.parse(req.url).path;
     }
 }));

 // start
 app.listen(port, function () {
     console.log('Agenda - WebApp running on port ' + port);
 });
*/
