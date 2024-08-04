import { gaugeUnits, GaugeUnits, longLengthUnits, LongLengthUnits, shortLengthUnits, wholePartialUnits, WholePartialUnits, type Dimension } from "./dimension";
export const inches2cm: number = 2.54;
export const yards2meters: number = 0.9144;

export class Project {

    protected name: String = "Project"

    public gaugeDimension: Dimension<GaugeUnits> = { value: 40, unitOptions: Object.keys(gaugeUnits), units: 'sts/4in' }
    public ballSizeDimension: Dimension<LongLengthUnits> = { value: 120, unitOptions: Object.keys(longLengthUnits), units: 'm' }
    public yarnDimension: Dimension<LongLengthUnits> = { value: 0, unitOptions: Object.keys(longLengthUnits), units: 'yd' }
    public ballsDimension: Dimension<WholePartialUnits> = { value: 0, unitOptions: Object.keys(wholePartialUnits), units: 'whole' }

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
    public get ballsNeeded(): number {
        return this.ballsDimension.value
    }
    public set ballsNeeded(value: number) {
        this.ballsDimension.value = value
    }

    // Calculate the yarn required for a piece of knitted fabric with length and width in cm
    // and guage in sts/10cm
    calcYarnForArea = (siLength: number, siWidth: number): void => {
        const gauge = this.gaugeDimension.value

        if (gauge <= 0) {
            return
        }

        let siGauge = gauge
        // First, put values into SI units
        if (this.gaugeDimension.units == gaugeUnits.stsPerInch) {
            siGauge *= 4;
        }
        // Change to stitches per cm
        siGauge = gauge / 10

        let ballSizeUnits = this.ballSizeDimension.units
        let siballSize: number = this.ballsDimension.value
        if (ballSizeUnits == longLengthUnits.yards) {
            siballSize *= yards2meters;
        }
        let stitches: number = Number(Math.ceil(siGauge * siWidth));
        let rowGauge: number = siGauge * 1.5;
        let rows: number = Number(Math.ceil(rowGauge * siLength));

        let totalStitches: number = stitches * (rows + 2); // 2 for cast on and bind off.

        // calculate meters and add 20%
        let meters = this.getStitchLength(siGauge) * Number(totalStitches) * 1.2

        // Now convert the yarn required into the desired units
        if (this.yarnDimension.units != longLengthUnits.meters) {
            this.yarnNeeded = Number(Math.ceil(meters / yards2meters));
        }
        else {
            this.yarnNeeded = Number(Math.ceil(meters));
        }

        this.ballsDimension.value = meters / siballSize

        if (this.ballsDimension.units == wholePartialUnits.whole) {
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
            let yarn: number = (this.yarnDimension.units == longLengthUnits.meters) ? Number(this.yarnNeeded) :
                Number(this.yarnNeeded) * yards2meters
            let ballMeters: number = (this.ballSizeDimension.units == longLengthUnits.meters) ? Number(this.ballSize) :
                Number(this.ballSize) * yards2meters
            this.ballsNeeded = yarn / ballMeters
        }

        if (this.ballsDimension.units == wholePartialUnits.whole) {
            this.ballsNeeded = Math.ceil(this.ballsNeeded)
        }
    }
}