import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger('menuState', [
      state(
        'in',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      state(
        'out',
        style({
          transform: 'rotate(180deg)',
        })
      ),
      transition('in => out', animate('300ms ease-in')),
      transition('out => in', animate('300ms ease-out')),
    ]),
  ],
  
})
export class NavBarComponent implements OnInit {

  constructor(public authservice: AuthenticationService) { }

  ngOnInit(): void {
  }
  @Input() title;

  @Output() emitStat = new EventEmitter();

  menuState:string = 'out';

  toggleMenu(){
    this.menuState = this.menuState === 'out' ? 'in' : 'out';

    this.emitStat.emit( this.menuState )
  }

  logout()
  {
    this.authservice.logout();
  }

}
