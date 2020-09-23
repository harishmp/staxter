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
    this.latestService.currentMessage.subscribe(message => this.Base = message);
    this.callApi();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // get difference
  diff (num1, num2) {
    return num1 - num2
  }

  // get percentage
  diffPercentage (num1, num2) {
    return ((num1 / num2)*100)
  }

  callApi() {
    this.latestService.gethistoricalrateTodaysapi().subscribe(res => {   
      let resObj = res.json();
      this.today = resObj;

      this.latestService.gethistoricalratesYesterdayapi().subscribe(res => {   
        let resObj = res.json();
        this.yesterday = resObj;
  
        Object.keys(this.today['rates']).forEach(key => {
          let difresult = this.diff(this.today['rates'][key], this.yesterday['rates'][key]);
          let difPercentageresult = this.diffPercentage(this.today['rates'][key], this.yesterday['rates'][key]);
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