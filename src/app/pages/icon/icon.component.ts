import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SafeHtml } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() iconName: string = "";

  svgIcon: SafeHtml
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}


  ngOnInit() {
    // Load the SVG file from the assets folder
    this.http.get('assets/icons/'+this.iconName, { responseType: 'text' }).subscribe((data) => {

      this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(data);

    });
  }
}