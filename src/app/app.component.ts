import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class AppComponent implements OnInit{

  currentRoute: string ;
  current;
  curr
  constructor(private route: ActivatedRoute, private router: Router){
   
    // this.current = this.router.url;
    // console.log(this.router);
    
    this.route.url.subscribe(url => {
      console.log('URL:', url)
      this.currentRoute = url[0]?.path;
      console.log('Current Route:', this.currentRoute);
    })
    // this.shouldShow()
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.curr = event.urlAfterRedirects; // Get entire activated route path
        if(this.curr.includes('gestion'))
        {
          this.current = " Gestion Joueurs"
        }
        else if(this.curr.includes('timeline'))
        {
          this.current = "Historique"
        }
        else if(this.curr.includes('dashboard'))
        {
          this.current = "Dashboard"
        }
      }
    });
  }

  menuState:string = 'in';

  toggleMenu(event){
    this.menuState = event;
  }

  shouldShow(): boolean {
    const currentRoute = this.route.snapshot.firstChild?.routeConfig?.path;
    return currentRoute !== '';
  }

  getTitle(event)
  {
    console.log(event);
    
    //this.current = event;
  }
  
}
