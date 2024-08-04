import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class MeasurementComponent  implements OnInit {
  @Input() name: string = 'size';
  @Input() value: number = 40;
  @Input() unitOptions: string[] = ['in', 'cm'];
  @Input() units: string = 'in';

  constructor() { }

  ngOnInit() {}

}
