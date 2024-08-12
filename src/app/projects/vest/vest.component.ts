import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Dimension, shortLengthUnitOptions } from 'src/app/library/dimension';
import { Project, inches2cm } from 'src/app/library/project';
import { MeasurementComponent } from 'src/app/measurement/measurement.component';

/* Results of linear fit of Length to hips by Chest size:
     (Intercept)      Chest
     Baby     -6.50000 0.60000000
     Child   -23.85854 0.78042063
     Man      47.67266 0.17445286
     Woman    52.32509 0.06000826
     Youth    14.99031 0.38372093
     
     Looks like the baby line will cover up to 80cm,
     Then we will jump to the Man line
    */
const babyInt = -6.5;
const babySlope = 0.6;

const sBreak = 80.0; //cm

const manInt = 47.67266;
const manSlope = 0.17445286;

@Component({
  standalone: true,
  selector: 'app-vest',
  templateUrl: './vest.component.html',
  styleUrls: ['./vest.component.scss'],
  imports: [IonicModule, MeasurementComponent],
})
export class VestComponent extends Project implements OnInit {
  public chestDimension: Dimension = {
    value: 40,
    unitOptions: shortLengthUnitOptions,
    units: shortLengthUnitOptions[0].value,
  };

  ngOnInit() {
    this.calcYarn();
  }

  handleSizeChange(size: Dimension) {
    console.log(size);
    this.chestDimension = size;
    this.calcYarn();
  }

  // Calculate the yarn required for a vest, where the length is
  // 1.2 * chest size
  override calcYarn() {
    var width = this.chestDimension.value;
    if (this.chestDimension.units != 'cm') {
      width *= inches2cm;
    }
    let length: number;
    if (width < 80.0) {
      length = babyInt + babySlope * width;
    } else {
      length = manInt + manSlope * width;
    }
    const meters = this.calcYarnForArea(length, width)
    this.setYarnNeeded(meters)
    this.setBallsNeeded(meters)
  }
}
