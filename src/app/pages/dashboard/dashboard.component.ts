import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { skip, timeout } from 'rxjs';
import { BSMenuService } from 'src/app/services/BSMenu.service';
import { ExcelService } from 'src/app/services/ExcelService.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  jsondata = {};
  databases=[]
  dates=[];
  players=[];
  selectedDate=""
  selectedPlayer=""
  isDone = false;

  data_name1 = "Total Distance (m)";
  data_name2 = "HSD Above 20 km/h";
  data_name3 = "Maximum Velocity (km/h)";
  data_name4 = "Acceleration B1-3 Total Efforts (Gen 2)";

  currentRoute
  constructor( private bSMenuService : BSMenuService, private route: ActivatedRoute)
  {

    this.route.url.subscribe(url => {
      console.log('URL:', url)
      this.currentRoute = url[0]?.path;
      console.log('Current Route:', this.currentRoute);
    })
    
    this.bSMenuService.date_changing.pipe(skip(1)).subscribe( (next:any) =>{

        if (next) {
          this.getDates( next );
        }
  
      } )

  }

  ngOnInit(): void {
  }

  getDates( event  )
  {
    this.isDone=false;

    this.initVals()

    this.yaxis = Object.keys( event ) ;
    let sum = 0;

    let data_day = Object.values( event );

    console.log(data_day);


    // data1
    this.data1 =  data_day.sort((a,b) => a[this.data_name1]-(b[this.data_name1])).map( (next : any)=>{

      return { xaxis: next.Name , data:next[ this.data_name1 ] }

    } )


    // data2

    this.data2 = data_day.sort((a,b) => a[this.data_name2]-(b[this.data_name2])).map( (next : any)=>{

      return { xaxis: next.Name , data:next[ this.data_name2 ] }

    } )

    // data3
    this.data3 = data_day.sort((a,b) => a[this.data_name3]-(b[this.data_name3])).map( (next : any)=>{

      return { xaxis: next.Name , data:next[ this.data_name3 ] }

    } )

    // data4
    this.data4 = data_day.sort((a,b) => a[ this.data_name4 ]-(b[ this.data_name4 ])).map( (next : any)=>{

      return { xaxis: next.Name , data:next[ this.data_name4 ] }

    } )

    this.yaxis.forEach(element => {

      let obj = event[element];

      sum++;
      this.value1["value"] = this.value1["value"]+obj[this.data_name1] ;
      this.value2["value"] = this.value2["value"]+obj[this.data_name2] ;
      this.value3["value"] = this.value3["value"]+obj[this.data_name3] ;
      this.value4["value"] = this.value4["value"]+obj[this.data_name4] ;

      this.value1["max"] = Math.max( this.value1["max"] , obj[this.data_name1] ) ;
      this.value1["min"] = Math.min( this.value1["min"] , obj[this.data_name1] ) ;

      this.value2["max"] = Math.max( this.value2["max"] , obj[this.data_name2] ) ;
      this.value2["min"] = Math.min( this.value2["min"] , obj[this.data_name2] ) ;

      this.value3["max"] = Math.max( this.value3["max"] , obj[this.data_name3] ) ;
      this.value3["min"] = Math.min( this.value3["min"] , obj[this.data_name3] ) ;

      this.value4["max"] = Math.max( this.value4["max"] , obj[this.data_name4] ) ;
      this.value4["min"] = Math.min( this.value4["min"] , obj[this.data_name4] ) ;


    });
    //this.data1 = Object.values(  )

    this.value1["value"] = Number( (this.value1["value"]/sum).toFixed(2)) ;
    this.value2["value"] = Number( (this.value2["value"]/sum).toFixed(2)) ;
    this.value3["value"] = Number( (this.value3["value"]/sum).toFixed(2)) ;
    this.value4["value"] = Number( (this.value4["value"]/sum).toFixed(2)) ;

    this.value1["max"] = Number( (this.value1["max"]).toFixed(0)) ;
    this.value2["max"] = Number( (this.value2["max"]).toFixed(0)) ;
    this.value3["max"] = Number( (this.value3["max"]).toFixed(0)) ;
    this.value4["max"] = Number( (this.value4["max"]).toFixed(0)) ;

    this.value1["min"] = Number( (this.value1["min"]).toFixed(0)) ;
    this.value2["min"] = Number( (this.value2["min"]).toFixed(0)) ;
    this.value3["min"] = Number( (this.value3["min"]).toFixed(0)) ;
    this.value4["min"] = Number( (this.value4["min"]).toFixed(0)) ;


    setTimeout(() => {
      this.isDone=true;
    }, 50);
  }


  initVals()
  {

    this.yaxis=[]
    this.data1=[]
    this.data2=[]
    this.data3=[]
    this.data4=[]

    this.value1={ value:0 , min:9999999999 , max:0 }
    this.value2={ value:0 , min:9999999999 , max:0 }
    this.value3={ value:0 , min:9999999999 , max:0 }
    this.value4={ value:0 , min:9999999999 , max:0 }

  }


  yaxis=[]

  data1=[]

  data2=[]

  data3=[]

  data4=[]


  value1={ value:0 , min:9999999999 , max:0 }
  value2={ value:0 , min:9999999999 , max:0 }
  value3={ value:0 , min:9999999999 , max:0 }
  value4={ value:0 , min:9999999999 , max:0 }

}

