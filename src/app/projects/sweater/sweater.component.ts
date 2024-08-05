import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  Dimension,
  shortLengthUnitOptions,
  ShortLengthUnits,
} from 'src/app/library/dimension';
import { inches2cm, Project } from 'src/app/library/project';
import { MeasurementComponent } from 'src/app/measurement/measurement.component';

@Component({
  standalone: true,
  selector: 'app-sweater',
  templateUrl: './sweater.component.html',
  styleUrls: ['./sweater.component.scss'],
  imports: [IonicModule, MeasurementComponent],
})
export class SweaterComponent extends Project implements OnInit {
  override name = 'sweater';
  public chestDimension: Dimension = {
    value: 40,
    unitOptions: shortLengthUnitOptions,
    units: shortLengthUnitOptions[0].value,
  };

  get chest(): number {
    return this.chestDimension.value;
  }
  set chest(value) {
    this.chestDimension.value = value;
  }
  get chestUnits(): ShortLengthUnits {
    return this.chestDimension.units;
  }
  set chestUnits(value) {
    this.chestDimension.units = value;
  }

  // constructor() {
  //   super()
  //   this.calcYarn()
  // }

  ngOnInit() {
    this.calcYarn()
  }

  handleSizeChange(size: Dimension) {
    console.log(size)
    this.chestDimension = size
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
    let chest = this.chest;
    if (this.chestUnits == 'inches') {
      chest *= inches2cm;
    }
    let intercept = -5559.8; // cm
    let slope = 162.1; // cm^2
    let area = intercept + slope * chest;
    // let the sleeves be a trapezoid with max width 0.5 * width, and min width being 0.25 * width
    // let the length match the body length (which are really long sleeves), and add the average width
    // of the two sleeves to the body width
    let width = chest * 1.75;
    let length = area / width;

    const meters = this.calcYarnForArea(length, width)
    this.setYarnNeeded(meters)
    this.setBallsNeeded(meters)
  }
}
