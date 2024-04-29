import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit, AfterViewInit {

  option;
  @ViewChild('bar') bar: ElementRef ;

  @Input() json; 

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.drawChart(this.json)
}


drawChart(json)
{
    var myChart;

    let thiss = this;
    myChart = echarts.init(this.bar.nativeElement);
    
    this.option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: [],
            align: 'right',
            right: 10,
            textStyle: {
                color: "#fff"
            },
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 35
        },
        grid: {
            left: '2%',
            right: '3%',
            top: '10%',
            bottom: '10%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: json.series.xaxis,
            
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#063374",
                    width: 1,
                    type: "solid"
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
                interval: 0,
                rotate: 30,
                textStyle: {
                    color: "#261e1c",
                }
            },
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
                formatter: '{value} ',
                textStyle: {
                    color: "#261e1c",
                }
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: "#00c7ff",
                    width: 1,
                    type: "solid"
                },
            },
            splitLine: {
                lineStyle: {
                    color: "#eee",
                }
            }
        }],
        dataZoom: {
            type: "inside",
            show: true,
            height: 15,
            start: 0,
            //end: 35
        },
        series: [{
            name: json.series.title,
            type: 'bar',
            data: json.series.data,
            barWidth: 10, 
            //barGap: 1, 
            label:
            {
                show:true,
                align: "center",
                position: "top",
                // lineHeight: 0,
                color:'#111',
                fontSize: "11px"
                // backgroundColor: "#fff",
                // borderColor:"#111",
                // borderWidth: 2.5,
                // borderType: "solid",
                // borderRadius: [50, 50, 50, 50],
                // width: 20,
                // height: 20
            },
            
            // itemStyle: {
            //     normal: {
            //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //             offset: 0,
            //             color: '#fdf100'
            //         }, {
            //             offset: 1,
            //             color: '#fdf100aa'
            //         }]),
            //         opacity: 1,
            //     }
            // }
            
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [
                        {
                            offset: 0,
                            color: json.series.color1, //'#01d46d'
                        },
                        {
                            offset: 1,
                            color: json.series.color2, //'#01d46daa',
                        },
                    ]),
                    opacity: 0.8,
                },
            },
        }, 
        {
            data: [1, 1, 1, 1, 1, 1, 1, 1],
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbolOffset: [0, '50%'],
            symbolSize: [10, 5],
            label:
            {
                show:false,
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: json.series.color2
                    }, {
                        offset: 1,
                        color: json.series.color2
                    }]),
                    opacity: 1,
                }
            }
        },
        {
            data: json.series.data,
            type: 'pictorialBar',
            barMaxWidth: '20',
            symbolPosition: 'end',
            symbolOffset: [0, '-50%'],
            symbolSize: [10, 5],
            zlevel: 2,
            label:
            {
                show:false,
            },
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: json.series.color1
                    }, {
                        offset: 1,
                        color: json.series.color1
                    }]),
                    opacity: 1,
                }
            }
        }
        // {
        //     name: '',
        //     type: 'bar',
        //     stack:'a',
        //     data: json.series.data2,
        //     barWidth: 30, 
        //     //barGap: 1, 
        //     label:
        //     {
        //         show:true,
        //         align: "top-centre",
        //         lineHeight: 0,
        //         color:'#111',
        //         backgroundColor: "#fff",
        //         borderColor:"#111",
        //         borderWidth: 2.5,
        //         borderType: "solid",
        //         borderRadius: [50, 50, 50, 50],
        //         width: 20,
        //         height: 20
        //     },
            
        //     itemStyle: {
        //         normal: {
        //             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                 offset: 0,
        //                 color: 'transparent'
        //             }, {
        //                 offset: 1,
        //                 color: 'transparent'
        //             }]),
        //             opacity: 1,
        //         }
        //     }
        // },
        // {
        //     name:'',
        //     type:'line',
        //     data:json.series.data3,
        //     symbol: "none",
        //     lineStyle: {
        //     color:json.series.color1,
        //     type: "dashed",
        //     width: 2.5,
        //     }
            
        // },

        // {
        //     name:'',
        //     type:'line',
        //     data:json.series.data4,
        //     symbol: "none",
        //     lineStyle: {
        //     color:json.series.color2,
        //     type: "dashed",
        //     width: 2.5,
        //     }
            
        // },
        ]

    }

    myChart.setOption(this.option, true)
  }

}
