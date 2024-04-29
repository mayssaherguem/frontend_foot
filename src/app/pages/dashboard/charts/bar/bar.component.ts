import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  
  option;
  @ViewChild('bar') bar: ElementRef ;

  @Input() title="";

  @Input() yaxis;
  @Input() data;
  @Input() color;
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
    var myColor = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6','#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6'];
      var myChart;

      let thiss = this;
      myChart = echarts.init(this.bar.nativeElement);
      // window.addEventListener('resize',function(){
      //     myChart.resize();
      // })
      
      this.option = {
        title:{text:this.title},
        backgroundColor: 'transparent',
        grid: {
            show: false,
            left: "22%",
            top:"1.5%",
            bottom:"1.5%"
        },
        tooltip:{
            show: true
        },
        xAxis: {
            show: false
        },
        yAxis: [{
            show: true,
            // data: this.yaxis,
            data: this.data.map( n=> { return n.xaxis } ),
            inverse: true,
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    color: function(value, index) {
                        var num = myColor.length;
                        return '#000'//myColor[index ]
                    }
                },
                formatter: function(value, index) {
                    return [
                        '{title|' + value + '} '
                    ].join('\n')
                },
                rich: {}
            },

        }],
        series: [{
            name: '',
            type: 'bar',
            yAxisIndex: 0,
            // data: this.data,
            data: this.data.map( n=> { return n.data.toFixed(2) } ),
            barWidth: 5,
            itemStyle: {
                normal: {
                    barBorderRadius: 30,
                    color: function(params) {
                        var num = myColor.length;
                        return thiss.color
                    },
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: '{c}'
                }
            },
        }]
    };

      myChart.setOption(this.option, true);
      window.addEventListener('resize', function () {
          myChart.resize();
      });
  }

}

