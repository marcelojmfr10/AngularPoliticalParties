import { Component } from '@angular/core';
import { ChartFormRow } from "../chart-form-row/chart-form-row";

@Component({
  selector: 'chart-form',
  imports: [ChartFormRow],
  templateUrl: './chart-form.html',
  styleUrls: ['./chart-form.css']
})
export class ChartForm { }
