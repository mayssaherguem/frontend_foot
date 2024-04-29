import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-round-borders',
  templateUrl: './round-borders.component.html',
  styleUrls: ['./round-borders.component.scss']
})
export class RoundBordersComponent implements OnInit {

  constructor() { }
  @Input() nom : any;
  @Input() ic : any;
  ngOnInit(): void {
  }

}
