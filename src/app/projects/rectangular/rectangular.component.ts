import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Dimension, shortLengthUnitOptions } from 'src/app/library/dimension';
import { inches2cm, Project } from 'src/app/library/project';
import { MeasurementComponent } from 'src/app/measurement/measurement.component';

@Component({
  standalone: true,
  selector: 'app-rectangular',
  templateUrl: './rectangular.component.html',
  styleUrls: ['./rectangular.component.scss'],
  imports: [IonicModule, MeasurementComponent],
})
export class RectangularComponent extends Project implements OnInit {
  @Input() override name = 'Scarf';

  public widthDimension: Dimension = {
    value: 12,
    unitOptions: shortLengthUnitOptions,
    units: shortLengthUnitOptions[0].value,
  };
  public heightDimension: Dimension = {
    value: 72,
    unitOptions: shortLengthUnitOptions,
    units: shortLengthUnitOptions[0].value,
  };

  ngOnInit() {
    this.calcYarn();
  }

  handleWidthChange(size: Dimension) {
    this.widthDimension = size;
    this.calcYarn();
  }

  handleHeightChange(size: Dimension) {
    this.heightDimension = size;
    this.calcYarn();
  }

  override calcYarn() {
    let width = this.widthDimension.value;
    if (this.widthDimension.units == 'inches') {
      width *= inches2cm;
    }
    let height = this.heightDimension.value;
    if (this.heightDimension.units == 'inches') {
      height *= inches2cm;
    }

    const meters = this.calcYarnForArea(height, width);
    this.setYarnNeeded(meters);
    this.setBallsNeeded(meters);
  }
}
