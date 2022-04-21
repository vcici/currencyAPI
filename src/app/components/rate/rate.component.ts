import { Component, OnInit } from '@angular/core';
import { Currency } from 'src/app/models/currency';
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
    }
  }

  public from:string = "";
  public to:string = "";
  public currencies:Currency[]=[];


  public isLoading:boolean=true;
  public isError:boolean=false;
  public isData:boolean = false;

  constructor(private rateService:RateService) { }

  ngOnInit(): void {
    this.rateService.loadCurrencies().subscribe((response)=>{
      this.currencies = this.rateService.getCurrencies();
    });
  }

  private loadRate(){
    this.rateService.loadRate(this.from, this.to).subscribe({
      next:(response) => {
        this.rate = response;
        this.isLoading=false;
        this.isData = true;
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
