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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public latestService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.callApi();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  callApi() {
    this.latestService.gethistoricalrateTodaysapi().subscribe(res => {   
      let resObj = res.json();
      this.today = resObj;

      this.latestService.gethistoricalratesYesterdayapi().subscribe(res => {   
        let resObj = res.json();
        this.yesterday = resObj;
  
        Object.keys(this.today['rates']).forEach(key => {
          let increaseDecrease = 'fa fa-ellipsis-h';
          if(this.today['rates'][key] == this.yesterday['rates'][key]) {
            increaseDecrease = 'fa fa-align-justify';
          } else if(this.today['rates'][key] > this.yesterday['rates'][key]) {
            increaseDecrease = 'fa fa-arrow-up';
          } else if(this.today['rates'][key] < this.yesterday['rates'][key]) {
            increaseDecrease = 'fa fa-arrow-down';
          } else {
            increaseDecrease = 'fa fa-ellipsis-h';
          }
          this.items.push({'Currency':key, 'Spot':this.today['rates'][key], 'increaseDecrease': increaseDecrease, 'Chart': ''});
        })
        console.log("this.items---", this.items);
        this.dataSource = new MatTableDataSource(this.items);
        this.dataSource.paginator = this.paginator;
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

  onClickRow(val) {
    console.log(val);
    this.latestService.changeMessage(val);
    this.router.navigate(['/historical-data']);
  }
}