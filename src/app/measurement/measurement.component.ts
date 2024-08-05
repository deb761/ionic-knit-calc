import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Dimension } from '../library/dimension';

@Component({
  standalone: true,
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class MeasurementComponent implements OnInit {
  @Input() name: string = 'size';
  @Input() dimension: Dimension = {
    value: 0,
    unitOptions: [],
    units: ''
  }

  @Output() change = new EventEmitter<Dimension>()

  get label() {
    return this.name
  }

  constructor() { }

  ngOnInit() {}

  handleValueChange(value: string | number | null | undefined) {
    console.log(value)
    this.dimension.value = Number(value)
    this.change.emit(this.dimension)
  }

  handleUnitChange(event: string | undefined) {
    console.log(event)
    this.dimension.units = event ?? ''
    this.change.emit(this.dimension)
  }

}
