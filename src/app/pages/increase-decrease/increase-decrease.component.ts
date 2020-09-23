import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DataService} from '../../services/data.service';

export interface PeriodicElement {
  percentage: number;
  Currency: number;
  Difference: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-increase-decrease',
  templateUrl: './increase-decrease.component.html',
  styleUrls: ['./increase-decrease.component.css']
})
export class IncreaseDecreaseComponent implements AfterViewInit {
  displayedColumns: string[] = ['Currency', 'Difference', 'percentage'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  result = [];
  today = [];
  yesterday = [];
  increase = [];
  decrease = [];
  increasedecrease = 'increase';
  items=[];
  Base;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public latestService: DataService) { }

  ngOnInit(): void {
    this.latestService.currentMessage.subscribe(message => 
      {
        this.Base = message;
        this.callApi();
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // get difference
  diff (num1, num2) {
    let num = num1 - num2
    return num.toFixed(4)
  }

  // get percentage
  diffPercentage (num1, num2) {
    let num = ((num1 / num2)*100)
    return num.toFixed(4)
  }

  callApi() {
    // get data of 2020-01-20 (today), 2020-01-16(yesterday) based on base using startEndApi
    this.latestService.getHistoricalDataapi('2020-01-16', '2020-01-20', this.Base).subscribe(res => {   
      let resObj = res.json();
      this.result = [resObj.rates];
      this.today = this.result[0]['2020-01-20'];
      this.yesterday = this.result[0]['2020-01-16'];

      Object.keys(this.today).forEach(key => {
        let difresult = this.diff(this.today[key], this.yesterday[key]);
        let difPercentageresult = this.diffPercentage(this.today[key], this.yesterday[key]);
        this.items.push({'Currency':key, 'Difference':difresult, 'percentage': difPercentageresult});
      })

      this.increase = this.items.sort(function(a, b) { return a.Difference < b.Difference ? 1 : -1; }).slice(0, 5);
      console.log("increase-top5--", this.increase);

      this.decrease = this.items.sort(function(a, b) { return a.Difference > b.Difference ? 1 : -1; }).slice(0, 5);
      console.log("decrease-top5--", this.decrease);

      this.onIncreasedecrease(this.increasedecrease);
    },
    err => {
      console.log('In Error Block');
      console.log(typeof (err));
    });
  }

  // get top 5 “Increase” currencies between today and yesterday.
  onIncreasedecrease(val) {
    this.increasedecrease = val;
    this.items = this.increase;
      this.dataSource = new MatTableDataSource(this.items);
      this.dataSource.paginator = this.paginator;
  }

  // get top 5 “Decrease” currencies between today and yesterday.
  onIncreasedecrease1(val) {
    this.increasedecrease = val;
    this.items = this.decrease;
      this.dataSource = new MatTableDataSource(this.items);
      this.dataSource.paginator = this.paginator;
  }
}