import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { skip, timeout } from 'rxjs';
import { BSMenuService } from 'src/app/services/BSMenu.service';

@Component({
  selector: 'app-time-variation',
  templateUrl: './time-variation.component.html',
  styleUrls: ['./time-variation.component.scss']
})
export class TimeVariationComponent implements OnInit {

  isDone = false;

  data_name1 = "Total Distance (m)";
  data_name2 = "HSD Above 20 km/h";
  data_name3 = "Maximum Velocity (km/h)";
  data_name4 = "Acceleration B1-3 Total Efforts (Gen 2)";
  data_name5 = "High Intensity Distance (m)_>15";
  data_name6 = "ACC+DEC";
  data_name7 = "Deceleration B1-3 Total Efforts (Gen 2)";
  data_name8 = "Velocity Zone 6 (25 + Km/h) (m)";

  data = { 
    "Total Distance (m)":[] ,
    "HSD Above 20 km/h":[] ,
    "Maximum Velocity (km/h)":[] ,
    "Acceleration B1-3 Total Efforts (Gen 2)":[] ,
    "High Intensity Distance (m)_>15":[] ,
    "ACC+DEC":[] ,
    "Deceleration B1-3 Total Efforts (Gen 2)":[] ,
    "Velocity Zone 6 (25 + Km/h) (m)":[] ,
  }

  color1 = {
    "Total Distance (m)": "#0000ff",
    "HSD Above 20 km/h":"#00ff00" ,
    "Maximum Velocity (km/h)": "#fdf100",
    "Acceleration B1-3 Total Efforts (Gen 2)": "#ff0000",
    "High Intensity Distance (m)_>15":"#2196f3" ,
    "ACC+DEC":"#ff7043" ,
    "Deceleration B1-3 Total Efforts (Gen 2)" : "#ff7043",
    "Velocity Zone 6 (25 + Km/h) (m)":"#9ccc65" ,
  }

  color2 = {
    "Total Distance (m)": "#0000ffaa",
    "HSD Above 20 km/h":"#00ff00aa" ,
    "Maximum Velocity (km/h)": "#fdf100aa",
    "Acceleration B1-3 Total Efforts (Gen 2)": "#ff0000aa",
    "High Intensity Distance (m)_>15":"#2196f3aa" ,
    "ACC+DEC":"#ff7043aa" ,
    "Deceleration B1-3 Total Efforts (Gen 2)" : "#ff7043",
    "Velocity Zone 6 (25 + Km/h) (m)":"#9ccc65aa" ,
  }


  currentRoute
  @Output() emitTitle = new EventEmitter();
  
  constructor(private bSMenuService : BSMenuService, private route: ActivatedRoute)
  {

    
    this.route.url.subscribe(url => {
      console.log('URL:', url)
      this.currentRoute = url[0]?.path;
      console.log('Current Route:', this.currentRoute);
      this.emitTitle.emit(this.currentRoute)
    })

    this.bSMenuService.month_changing.pipe(skip(1)).subscribe( (next:any) =>{

      console.log( next );
      this.isDone = false;

      this.xaxis = Object.keys( next );
      let i  = 0
      this.xaxis.forEach(date => {


        Object.keys( this.data ).forEach(column => {
          this.data[ column ][i] = 0;
        });

        
        Object.values( next[ date ] ).forEach(player => {
          
          Object.keys( this.data ).forEach(column => {
            this.data[ column ][i] += player[ column ] ;
          });

        });

        i++

      });

      Object.keys( this.data ).forEach(column => {

        this.data[ column ] = this.data[ column ].map( n =>{ return (n/i).toFixed(2) } )  ;

      });
      console.log( this.data );
      

      setTimeout(() => {
        this.isDone = true;
      }, 50);

    } )


    
    this.bSMenuService.player_changing.pipe(skip(1)).subscribe( (next:any) =>{

      console.log( next );
      let next_data = next.data;

      this.isDone = false;

      this.xaxis = Object.keys( next_data );
      let i  = 0
      this.xaxis.forEach(date => {


        Object.keys( this.data ).forEach(column => {
          this.data[ column ][i] = 0;
        });

        
        let player = next_data[ date ][next.player]
        Object.keys( this.data ).forEach(column => {
          this.data[ column ][i] =  player ? player[ column ].toFixed(2) : 0 ;
        });

        i++

      });

      console.log( this.data );
      

      setTimeout(() => {
        this.isDone = true;
      }, 50);


    } )

  }

  ngOnInit(): void 
  {
    
  }

  xaxis = []

  
  getDataBar( type )
  {
    let j = {};
    j = {
      series: {
        xaxis: this.xaxis,
        title: type,
        data:this.data[type ],
        // data2:[25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
        // data3:[30,30,30,30,30,30,30,30,30,30],
        color1: this.color1[type],
        color2 : this.color2[type]
      }
    }
    return j ;
  }

  getDataBar2()
  {
    let j = {};
    j = {
      series: {
        xaxis: ["10/07/2023" ,"11/07/2023" ,"12/07/2023" ,"13/07/2023" ,"14/07/2023" ,"15/07/2023" ,"16/07/2023" ,"18/07/2023"],
        data:[30, 70, 30, 80, 38, 68, 37, 50, 62, 76],
        data2:[30, 35, 83, 50, 68, 45, 50, 70, 42, 70],
        // data2:[35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
        // data3:[30,30,30,30,30,30,30,30,30,30],
        color1: "#19b25f",
        color2 : "#0c74be"
      }
    }
    return j ;
  }

}