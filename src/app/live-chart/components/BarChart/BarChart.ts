import { Component, effect, ElementRef, input, OnDestroy, OnInit, viewChild } from '@angular/core';
import { Chart, ChartData } from 'chart.js';

@Component({
  selector: 'bar-chart',
  imports: [],
  templateUrl: './BarChart.html',
})
export class BarChart implements OnInit, OnDestroy {
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('chart');
  private chartInstance: Chart | null = null;
  public chartData = input.required<ChartData<'bar'>>();

  private updateCharData = effect(() => {
    if (!this.chartInstance) return;
    // console.log('updated data', this.chartData());

    // this.chartInstance.data = this.chartData();

    this.chartInstance.data.labels = this.chartData().labels;
    this.chartInstance.data.datasets[0].data = this.chartData().datasets[0].data;
    this.chartInstance.data.datasets[0].backgroundColor =
      this.chartData().datasets[0].backgroundColor;
    this.chartInstance.data.datasets[0].borderColor = this.chartData().datasets[0].borderColor;
    this.chartInstance.update();
  });

  ngOnInit(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) throw new Error(`CanvasElement not found`);

    this.chartInstance = new Chart(canvas, {
      type: 'bar',
      data: this.chartData(),
      options: {
        // animation: {
        //   duration: 0,
        // },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chartInstance?.destroy();
    this.chartInstance = null;
  }
}
