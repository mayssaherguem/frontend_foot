import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BSMenuService
{
  constructor() { }
  //############################################
  // Month
  private change_month = new BehaviorSubject(null);

  month_changing = this.change_month.asObservable();

  changeMonth( data)
  {
    this.change_month.next( data );
  }

  //############################################
  // Date
  private change_date = new BehaviorSubject(null);

  date_changing = this.change_date.asObservable();

  changeDate( data)
  {
    this.change_date.next( data );
  }


  //############################################
  // Player
  private change_player = new BehaviorSubject(null);

  player_changing = this.change_player.asObservable();

  changePlayer( data)
  {
    this.change_player.next( data );
  }



}