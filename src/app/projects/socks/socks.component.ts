import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Dimension, shortLengthUnitOptions } from 'src/app/library/dimension';
import { Project } from 'src/app/library/project';
import { MeasurementComponent } from 'src/app/measurement/measurement.component';

const usChild: Record<number, number> = {
  // Infant sizes
  0: 7.9,
  1: 8.9,
  2: 9.5,
  3: 10.5,
  // Toddler sizes
  4: 11.4,
  5: 12.1,
  6: 13,
  7: 14,
  8: 14.6,
  9: 15.9,
  10: 15.5,
};
// US youth sizes
const usYouth: Record<number, number> = {
  10: 15.5,
  11: 17.1,
  12: 18.1,
  13: 19.4,
  // Size wrap
  1: 19.7,
  2: 20.6,
  3: 21.6,
  4: 22.2,
  5: 23.2,
  6: 24.1,
  7: 24.8,
};

// EU shoe size to cm conversion from https://www.shoeshow.com/shoe-sizes.asp
const eu: Record<number, number> = {
  15: 7.9,
  16: 8.9,
  17: 9.2,
  18: 10.2,
  // Toddler sizes
  19: 10.8,
  20: 12.1,
  21: 12.7,
  22: 13,
  23: 14,
  24: 14.6,
  25: 15.2,
  26: 15.9,
  27: 16.5,
  // Kid sizes
  28: 17.1,
  29: 17.8,
  30: 18.1,
  31: 19.1,
  32: 19.7,
  33: 20.3,
  34: 21,
  35: 21.9,
  36: 22.2,
  37: 23.2,
  38: 24.1,
  39: 24.8,
  // Mens sizes
  40: 24.8,
  41: 25.5,
  42: 26,
  43: 27,
  44: 27.9,
  45: 28.6,
  46: 29.4,
  47: 30.2,
  48: 31,
  49: 31.8,
};

// US Mens sizes
const usMen: Record<number, number> = {
  6: 23.5,
  7: 24.4,
  8: 25.4,
  9: 26,
  10: 27,
  11: 27.9,
  12: 28.6,
  14: 30.2,
  15: 31,
  16: 31.8,
};
// US Wemens sizes
const usWomen: Record<number, number> = {
  4: 20.8,
  5: 21.6,
  6: 22.5,
  7: 23.5,
  8: 24.1,
  9: 25.1,
  10: 25.9,
  11: 26.7,
  12: 27.6,
};

@Component({
  standalone: true,
  selector: 'app-socks',
  templateUrl: './socks.component.html',
  styleUrls: ['./socks.component.scss'],
  imports: [IonicModule, MeasurementComponent],
})
export class SocksComponent extends Project implements OnInit {
  override name = 'Socks';
  public sizeDimension: Dimension = {
    value: 8,
    unitOptions: [
      { label: 'US Women', value: 'women' },
      { label: 'US Men', value: 'men' },
      { label: 'US Youth', value: 'youth' },
      { label: 'US Child', value: 'child' },
      { label: 'EU', value: 'euro' },
    ],
    units: 'women',
  };

  ngOnInit() {
    this.calcYarn();
  }

  handleSizeChange(size: Dimension) {
    this.sizeDimension = size;
    this.calcYarn();
  }
  // Calculate the yarn required for a pair of mittens, where the length is
  // 1.3 * hand circumference
  override calcYarn() {
    const length = this.getLengthFromSize();

    // I calculated a least-squares fit of foot length to circumference,
    // with a decent result for most sizes, although the really big feet
    // are underestimated a bit
    let intercept = 4.825;
    let slope = 0.6263;
    let width = intercept + length * slope;

    // We'll approximate the length of the sock as 1.75 times the length of the foot,
    // and add 0.5 * width for the the heel turn
    // and there are 2 feet, so multiply width by 2
    const meters = this.calcYarnForArea(length, width);
    this.setYarnNeeded(meters);
    this.setBallsNeeded(meters);
  }

  getLengthFromSize() {
    const sizeUnits = this.sizeDimension.units;
    const size = this.sizeDimension.value;
    switch (sizeUnits) {
      case 'child':
        return this.getLength(usChild, size)!;
      case 'youth':
        return this.getLength(usYouth, size)!;
      case 'women':
        return this.getLength(usWomen, size)!;
      case 'men':
        return this.getLength(usMen, size)!;
      case 'euro':
        return this.getLength(eu, size)!;
    }
    return this.getLength(usWomen, 8);
  }
  // Perform a linear interpolation between the input size and the next
  // highest to get foot length in cm
  getLength(table: Record<number, number>, size: number): number {
    const sizeUnits = this.sizeDimension.units;
    let lowSize = Math.floor(size);

    if (lowSize == size && table[lowSize]) {
      return table[lowSize]!;
    }
    var highSize = lowSize + 1;
    // Check for the US youth size rollover from 13 to 1
    if (sizeUnits == 'youth' && lowSize == 13) {
      highSize = 1;
    }
    const lowLength = table[lowSize];
    const highLength = table[highSize];
    // This is a simple linear interpolation that is simplified a bit
    // because the difference in sizes is always 1
    let length = (size - lowSize) * (highLength - lowLength) + lowLength;
    return length;
  }
}
