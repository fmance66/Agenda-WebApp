import { Component, OnInit } from '@angular/core';
import { IpService } from './services/ip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'Agenda-WebApp';
  ipAddress: string = "";

  constructor(private ip: IpService) {}

  ngOnInit()
  {
    this.getIP();
  }

  getIP()
  {
    this.ip.getIpAdress().subscribe((res:any)=>{
      this.ipAddress=res.ip;
      console.log('ip: ', this.ipAddress);
    });
  }

}
