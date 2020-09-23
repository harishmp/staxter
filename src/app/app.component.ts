import { Component } from '@angular/core';
import {DataService} from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'staxter';
  result = [];
  Base;

  constructor(public latestService: DataService) { }

  ngOnInit(): void {
    this.latestService.currentMessage.subscribe(message => this.Base = message);
    this.callApi();
  }

  callApi() {
    // get base list
    this.latestService.getLatestExchangeratesapi(this.Base).subscribe(res => {   
      let resObj = res.json();
      this.result = resObj.rates;
    },
    err => {
      console.log('In Error Block');
      console.log(typeof (err));
    });
  }

  // change and subscribe to the base value throughout the application
  onChange(val) {
    console.log(val);
    this.Base = val;
    this.latestService.changeMessage(this.Base);
  }
}
