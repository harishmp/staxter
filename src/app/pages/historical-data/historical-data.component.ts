import { Component, OnInit, ViewChild  } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.css']
})
export class HistoricalDataComponent implements OnInit {
  Base: string;
  result = [];
  start_at = '2020-01-01';
  end_at = '2020-01-31';

  constructor(public latestService: DataService) { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {
      data: [], 
      label: 'Historical Data'
    }
  ];

  ngOnInit(): void {
    // subscribe to the latest base value and trigger graph
    this.latestService.currentMessage.subscribe(message => 
      {
        this.Base = message;
        if(this.result[0] != undefined) {
          this.barChartLabels = new Array;
          this.barChartData[0].data = new Array;
          this.getSelectedBasegraph();
        }
      });
      this.callApi();
  }

  // get bar graph from selected base value
  getSelectedBasegraph() {
    Object.keys(this.result[0]).forEach(key => {
      this.barChartLabels.push(key);
      let newbase = this.Base;
      this.barChartData[0].data.push(this.result[0][key][newbase]);
      this.barChartData[0].label = 'Historical Data - ' + this.Base;
    })
  }

  callApi() {
    // get historical data between two dates of last 30 days based on base 'EUR' using startEndApi
    this.latestService.getHistoricalDataapi(this.start_at, this.end_at, 'EUR').subscribe(res => {   
      let resObj = res.json();
      this.result = [resObj.rates];
      this.getSelectedBasegraph();
    },
    err => {
      console.log('In Error Block');
      console.log(typeof (err));
    });
  }

}
