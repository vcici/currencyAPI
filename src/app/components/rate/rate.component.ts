import { Component, OnInit } from '@angular/core';
import { DataResponse, Rates } from 'src/app/models/rate';
import { RateService } from 'src/app/services/rate.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  public rate:DataResponse = {
    amount: 0,
    base: '',
    date: '',
    rates: {
      USD: 0
    }
  }
  public isLoading:boolean=true;
  public isError:boolean=false;

  constructor(private rateService:RateService) { }

  ngOnInit(): void {
    this.loadRate();
  }

  private loadRate(){
    this.rateService.loadRate().subscribe({
      next:(response) => {
        this.rate = response;
        this.isLoading=false;
      },
      error:(error)=>{
        this.isLoading=false;
        this.isError=true;
      }
    });
  }

  refreshRate(){
    this.loadRate();
  }

}
