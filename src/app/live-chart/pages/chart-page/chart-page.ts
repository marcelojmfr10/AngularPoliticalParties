import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BarChart } from "../../components/BarChart/BarChart";
import { ChartForm } from "../../components/chart-form/chart-form";
import { WebSocketConnectionService } from '../../../web-sockets/services/web-socket-connection.service';

@Component({
  selector: 'app-chart-page',
  imports: [BarChart, ChartForm],
  templateUrl: './chart-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPage {

  public webSocketService = inject(WebSocketConnectionService);

  chartData = computed(() => ({
    labels: ['label 1', 'label 2', 'label 3', 'label 4', 'label 5'],
    datasets: [
      {
        label: 'votos',
        data: [10, 20, 30, 4, 5]
      }
    ]
  }));

}
