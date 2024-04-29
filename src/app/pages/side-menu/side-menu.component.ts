import { Component} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BSMenuService } from 'src/app/services/BSMenu.service';
import { ExcelService } from 'src/app/services/ExcelService.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  
  jsondata_fix = {};
  jsondata = {};
  databases=[]
  dates=[];
  players=[];
  months=[];
  selectedDate=""
  selectedPlayer=""
  selectedMonth=""

  isDashboard =  (this.router.url === '/dashboard') ;

  constructor( private excelService : ExcelService , private bSMenuService:BSMenuService , private router: Router )
  {
    

    this.excelService.getCSVData().subscribe((data) => {
      console.log( data );

      data.split( "\n" ).forEach(element => {

        if( element != null && element.trim().length>0  )
          this.databases.push(element.trim())

      });

    });
  }

  getDatabase( event )
  {
    this.excelService.readExcelFile( event.value ).then((data) => {

      // console.log(data); // Do something with the parsed data

      this.jsondata= this.excelService.transformListToNestedJSON( data );

      this.selectedDate=""
      this.selectedPlayer=""
      this.dates = Object.keys( this.jsondata ) ;

    }).catch((error) => {
      console.error('Error reading Excel file:', error);
    });
  }


  getDatabase_monthly( event )
  {
    this.excelService.readExcelFile( event.value ).then((data) => {

      // console.log(data); // Do something with the parsed data

      this.jsondata_fix= this.excelService.transformListToNestedJSON_Monthly( data );
      this.jsondata= this.excelService.transformListToNestedJSON_Monthly( data );


      console.log( this.jsondata );

      this.selectedDate=""
      this.selectedPlayer=""
      this. selectedMonth=""

      this.months = Object.keys( this.jsondata ) ;

    }).catch((error) => {
      console.error('Error reading Excel file:', error);
    });
    
  }

  chooseBD( event )
  {

    if( this.router.url === '/dashboard' )
    {
      this.getDatabase( event )
    }
    else
    {
      this.getDatabase_monthly( event )
    }

  }


  ngOnInit(): void {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route here
        const currentRoute = this.router.url;
        if (currentRoute === '/dashboard') {
          this.isDashboard = true
          // Do something when on the dashboard route
        }else
        {
          this.isDashboard = false
        }
      }
    });

  }

  getDates( event  )
  {
    this.bSMenuService.changeDate(  this.jsondata[ this.selectedDate ]  );
    
  }

  getMonth( event )
  {
    this.selectedDate=""
    this.selectedPlayer=""
    this.jsondata = this.jsondata_fix[ this.selectedMonth ]
    this.dates = Object.keys( this.jsondata );
    this.bSMenuService.changeMonth(  this.jsondata  );

    this.getPlayers()

  }

  


  getPlayers( )
  {
    this.selectedPlayer=""
    let mySet = new Set();

    Object.values( this.jsondata ).forEach(players => {

      Object.keys( players ).map( n=>{ mySet.add( n ) } ) ;
      
    });

    this.players =  Array.from(mySet);
  }
  
  setPlayers(event)
  {
    console.log(event);
    this.bSMenuService.changePlayer( { player:event.value , data:this.jsondata }  );
  }


  

  navigate( url )
  {
    this.selectedDate=""
    this.selectedPlayer=""
    this.selectedMonth=""
    this.router.navigate( [url] );

  }


}