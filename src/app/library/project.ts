import { gaugeUnitOptions, GaugeUnits, longLengthUnitOptions, LongLengthUnits, wholePartialUnitOptions, WholePartialUnits, type Dimension } from "./dimension";
export const inches2cm: number = 2.54;
export const yards2meters: number = 0.9144;

export abstract class Project {

    protected name: String = "Project"

    public gaugeDimension: Dimension = { value: 20, unitOptions: gaugeUnitOptions, units: gaugeUnitOptions[0].value }
    public ballSizeDimension: Dimension = { value: 120, unitOptions: longLengthUnitOptions, units: longLengthUnitOptions[0].value }
    public yarnDimension: Dimension = { readonly: true, value: 0, unitOptions: longLengthUnitOptions, units: longLengthUnitOptions[0].value }
    public ballsDimension: Dimension = { readonly: true, value: 0, unitOptions: wholePartialUnitOptions, units: wholePartialUnitOptions[0].value }

    public get gauge(): number {
        return this.gaugeDimension.value
    }
    public set gauge(value) {   
        this.gaugeDimension.value = value
    }
    public get gaugeUnits(): GaugeUnits {
        return this.gaugeDimension.units
    }
    public set gaugeUnits(value) {
        this.gaugeDimension.units = value
    }
    public get gaugeOptions() {
        return this.gaugeDimension.unitOptions
    }
    public get yarnNeeded(): number {
        return this.yarnDimension.value
    }
    public set yarnNeeded(value) {
        this.yarnDimension.value = value
    }
    public get ballSize(): number {
        return this.ballSizeDimension.value
    }
    public set ballSize(value: number) {
        this.ballSizeDimension.value = value
    }
    public get ballSizeUnits(): LongLengthUnits {
        return this.ballSizeDimension.units
    }
    public set ballSizeUnits(value) {
        this.ballSizeDimension.units = value
    }
    public get ballCount(): number {
        return this.ballsDimension.value
    }
    public set ballCount(value: number) {
        this.ballsDimension.value = value
    }
    public get ballCountUnits(): WholePartialUnits {
        return this.ballsDimension.units
    }
    public set ballCountUnits(value) {
        this.ballsDimension.units = value
    }

    handleGaugeChange(dimension: Dimension) {
        this.gaugeDimension = dimension
        this.calcYarn()
    }

    handleBallSizeChange(dimension: Dimension) {
        this.ballSizeDimension = dimension
        this.calcYarn()
    }

    handleYarnChange(dimension: Dimension) {
        this.yarnDimension.units = dimension.units
        this.calcYarn()
    }

    handleBallSplitChange(dimension: Dimension) {
        this.ballsDimension.units = dimension.units
        this.calcYarn()
    }

    calcYarn() {}

    // Calculate the yarn required for a piece of knitted fabric with length and width in cm
    // and guage in sts/10cm
    calcYarnForArea = (siLength: number, siWidth: number): number => {
        const gauge = this.gaugeDimension.value

        if (gauge <= 0) {
            return 0
        }

        let siGauge = gauge
        // First, put values into SI units
        if (this.gaugeDimension.units == 'stsPerInch') {
            siGauge *= 4;
        }
        // Change to stitches per cm
        siGauge = gauge / 10

        let stitches: number = Number(Math.ceil(siGauge * siWidth));
        let rowGauge: number = siGauge * 1.5;
        let rows: number = Number(Math.ceil(rowGauge * siLength));

        let totalStitches: number = stitches * (rows + 2); // 2 for cast on and bind off.

        // calculate meters and add 20%
        let meters = this.getStitchLength(siGauge) * Number(totalStitches) * 1.2
        return meters
    }

    // convert the yarn required into the desired units
    public setYarnNeeded(meters: number) {
        if (this.yarnDimension.units != 'meters') {
            this.yarnNeeded = Number(Math.ceil(meters / yards2meters));
        }
        else {
            this.yarnNeeded = Number(Math.ceil(meters));
        }
    }

    // Calculate the number of balls needed
    public setBallsNeeded(meters: number) {
        let ballSizeUnits = this.ballSizeDimension.units
        let siballSize: number = this.ballSizeDimension.value
        if (ballSizeUnits == 'yards') {
            siballSize *= yards2meters;
        }
  
        this.ballsDimension.value = meters / siballSize
        if (this.ballsDimension.units == 'whole') {
            this.ballsDimension.value = Math.ceil(this.ballsDimension.value)
        }
   }

    // Compute the length of a stitch in m, treating the row of stitches as a helix
    public getStitchLength = (cmGauge: number): number => {
        let stitchWidth = 1.0 / cmGauge
        let stitchCir = Math.PI * stitchWidth
        // The stitch actually goes halfway into the neighboring stitch on each side
        let span = 2 * stitchWidth
        // use equation to calculate helical length, where the diameter is the stitchWidth and the
        // length is twice the stitchWidth, and convert to meters
        return Math.sqrt(span * span + stitchCir * stitchCir) / 100.0
    }

    // Calculate the number of balls needed, taking into account the selected units
    public calcballsNeeded = () => {
        if (this.yarnDimension.units == this.ballsDimension.units) {
            this.ballsDimension.value = Number(this.yarnNeeded) / Number(this.ballsDimension.value)
        }
        else {
            let yarn: number = (this.yarnDimension.units == 'meters') ? Number(this.yarnNeeded) :
                Number(this.yarnNeeded) * yards2meters
            let ballMeters: number = (this.ballSizeDimension.units == 'meters') ? Number(this.ballSize) :
                Number(this.ballSize) * yards2meters
            this.ballCount = yarn / ballMeters
        }

        if (this.ballsDimension.units == 'whole') {
            this.ballCount = Math.ceil(this.ballCount)
        }
    }
}