import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Dimension, shortLengthUnitOptions } from 'src/app/library/dimension';
import { inches2cm, Project } from 'src/app/library/project';
import { MeasurementComponent } from 'src/app/measurement/measurement.component';

@Component({
  standalone: true,
  selector: 'app-gloves',
  templateUrl: './gloves.component.html',
  styleUrls: ['./gloves.component.scss'],
  imports: [IonicModule, MeasurementComponent],
})
export class GlovesComponent extends Project implements OnInit {
  override name = 'Gloves';
  public palmDimension: Dimension = {
    value: 6,
    unitOptions: shortLengthUnitOptions,
    units: shortLengthUnitOptions[0].value,
  };

  ngOnInit() {
    this.calcYarn();
  }

  handleSizeChange(size: Dimension) {
    this.palmDimension = size;
    this.calcYarn();
  }
  // Calculate the yarn required for a pair of mittens, where the length is
  // 1.3 * hand circumference
  override calcYarn() {
    let width = this.palmDimension.value;
    if (this.palmDimension.units != 'cm') {
      width *= inches2cm;
    }
    let length = width * 1.33;
    width *= 2;
    const meters = this.calcYarnForArea(length, width)
    this.setYarnNeeded(meters)
    this.setBallsNeeded(meters)
  }

}
