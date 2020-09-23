import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {DataService} from '../../services/data.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  increaseDecrease: string;
  Currency: number;
  Spot: number;
  Chart: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['Currency', 'Spot', 'increaseDecrease', 'Chart'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  today = [];
  yesterday = [];
  items=[];
  result = [];
  Base;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public latestService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.latestService.currentMessage.subscribe(message => 
      {
        this.Base = message;
        if(this.result[0] != undefined) {
          this.items = [];
          this.callApi();
        }
      });
    this.callApi();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  callApi() {
    // get data of 2020-01-20 (today), 2020-01-16(yesterday) based on base using startEndApi
    this.latestService.getHistoricalDataapi('2020-01-16', '2020-01-20', this.Base).subscribe(res => {   
      let resObj = res.json();
      this.result = [resObj.rates];
      this.today = this.result[0]['2020-01-20'];
      this.yesterday = this.result[0]['2020-01-16'];

      Object.keys(this.today).forEach(key => {
        let increaseDecrease = 'fa fa-ellipsis-h';
        if(this.today[key] == this.yesterday[key]) {
          increaseDecrease = 'fa fa-align-justify';
        } else if(this.today[key] > this.yesterday[key]) {
          increaseDecrease = 'fa fa-arrow-up';
        } else if(this.today[key] < this.yesterday[key]) {
          increaseDecrease = 'fa fa-arrow-down';
        } else {
          increaseDecrease = 'fa fa-ellipsis-h';
        }
        this.items.push({'Currency':key, 'Spot':this.today[key], 'increaseDecrease': increaseDecrease, 'Chart': ''});
      })
      // console.log("this.items---", this.items);
      this.dataSource = new MatTableDataSource(this.items);
      this.dataSource.paginator = this.paginator;
    },
    err => {
      console.log('In Error Block');
      console.log(typeof (err));
    });
  }

  onClickRow(val) {
    console.log(val);
    this.latestService.changeMessage(val);
    this.router.navigate(['/historical-data']);
  }
}