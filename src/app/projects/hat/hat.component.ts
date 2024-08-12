import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Dimension, shortLengthUnitOptions } from 'src/app/library/dimension';
import { inches2cm, Project } from 'src/app/library/project';
import { MeasurementComponent } from 'src/app/measurement/measurement.component';

@Component({
  standalone: true,
  selector: 'app-hat',
  templateUrl: './hat.component.html',
  styleUrls: ['./hat.component.scss'],
  imports: [IonicModule, MeasurementComponent],
})
export class HatComponent extends Project implements OnInit {
  override name = 'Hat';
  public bandDimension: Dimension = {
    value: 40,
    unitOptions: shortLengthUnitOptions,
    units: shortLengthUnitOptions[0].value,
  };

  ngOnInit() {
    this.calcYarn()
  }

  handleSizeChange(size: Dimension) {
    console.log(size)
    this.bandDimension = size
    this.calcYarn()
  }

  // Calculate the yarn required for an adult size sweater.  Based on calculating the area
  // of a basic t-shaped sweater using a loose fit and standard body measurements from
  // YarnStandards.com.  The area is fairly linear with respect to finished chest measurement,
  // although Men's sweaters are about 10% larger due to men having longer torsos and arms
  // than women.  The linear equation used here includes a 10% increase in the value to account
  // for this, so the estimate should still be high enough for men while not being way too much
  // for women.
  override calcYarn() {
    let tightness = 0.8
    let lengthCylF = 0.15
    let coneheightF = 0.5
    let width = this.bandDimension.value
    if (this.bandDimension.units != 'cm')
    {
        width *= inches2cm
    }
    let lengthCyl = width * lengthCylF
    // apply tightness factor
    width *= tightness
    let rad = width / Math.PI / 2.0
    let coneHeight = coneheightF * width
    // calculate cone area
    let coneArea = Math.PI * rad * (rad + Math.sqrt(coneHeight * coneHeight + rad * rad))
    // calculate cylinder area
    let cylinderArea = lengthCyl * width
    // calculate relative length
    let length = (coneArea + cylinderArea) / width
    // use this relative length to calculate yarn
    const meters = this.calcYarnForArea(length, width)
    this.setYarnNeeded(meters)
    this.setBallsNeeded(meters)
  }
}
