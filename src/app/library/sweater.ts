import { Dimension, shortLengthUnits, ShortLengthUnits } from "./dimension"
import { inches2cm, Project } from "./project"

// This class defines the parameters and performs the calculations for a sweater project
class Sweater extends Project {
    // chest size
    sizeDimension: Dimension<ShortLengthUnits> = { value: 40, unitOptions: Object.keys(shortLengthUnits), units: 'in' }
    get size(): number {
        return this.sizeDimension.value
    }
    set size(value: number) {
        this.sizeDimension!.value = value
    }

    // Units for chest size
    get sizeUnits(): ShortLengthUnits {
        return this.sizeDimension!.units
    }
    set sizeUnits(value) {
        this.sizeDimension!.units = value
    }


    // provide a means of defining a project name and image
    constructor() {
        super()
        this.calcYarn()
    }

    // Calculate the yarn required for an adult size sweater.  Based on calculating the area
    // of a basic t-shaped sweater using a loose fit and standard body measurements from
    // YarnStandards.com.  The area is fairly linear with respect to finished chest measurement,
    // although Men's sweaters are about 10% larger due to men having longer torsos and arms
    // than women.  The linear equation used here includes a 10% increase in the value to account
    // for this, so the estimate should still be high enough for men while not being way too much
    // for women.
    calcYarn() {
        let chest = this.size
        if (this.sizeUnits == shortLengthUnits.inches) {
            chest *= inches2cm
        }
        let intercept = -5559.8 // cm
        let slope = 162.1 // cm^2
        let area = intercept + slope * chest
        // let the sleeves be a trapezoid with max width 0.5 * width, and min width being 0.25 * width
        // let the length match the body length (which are really long sleeves), and add the average width
        // of the two sleeves to the body width
        let width = chest * 1.75
        let length = area / width

        this.calcYarnForArea(length, width)
    }
}
