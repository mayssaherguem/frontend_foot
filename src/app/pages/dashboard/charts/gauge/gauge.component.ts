import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {

  
  option;
  @ViewChild('gauge') gauge: ElementRef ;

  @Input() title="";

  @Input() value;
  @Input() min;
  @Input() max;

  colorSet = {
      color: '#861eec'
  };

  constructor() { }

  

  ngOnInit(): void {
  }

  isViewInit = false;
  ngAfterViewInit(): void {
      this.drawChart()
  }

  
  drawChart()
  {
      var myChart;

      let thiss = this;
      myChart = echarts.init(this.gauge.nativeElement);
      // window.addEventListener('resize',function(){
      //     myChart.resize();
      // })
      
      this.option = {
        title:{text:this.title},
        tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
        },
        
        series: [{
            name: '',
            type: 'gauge',
            radius: '90%',
            center: ['50%', '60%'],
            min: this.min,
            max: this.max,
            splitNumber: 2,
            detail: {
                formatter: '{value}',
                fontSize: '20px',
                offsetCenter: [0, "70%"]
            },
            data: [{
                value: this.value,
                name: ''
            }],
            axisLine: {
                show: true,
                lineStyle: {
                    color: [
                        [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0.1,
                                color: "#f00"
                            },
                            {
                                offset: 0.6,
                                color: "#FFC600"
                            },
                            {
                                offset: 1,
                                color: "#0f0"
                            }
                        ])]
                    ]
    
                }
            }
    
        }]
    };

      myChart.setOption(this.option, true);
      window.addEventListener('resize', function () {
          myChart.resize();
      });
  }

}
