export type Dimension<Type> {
    value: number
    unitOptions: Type[]
    units: Type
}

export const longLengthUnits = { yards: 'yd', meters: 'm' }
export const shortLengthUnits = { inches: 'in', cm: 'cm' }
export const wholePartialUnits = { whole: 'whole', partial: 'partial' }
export const gaugeUnits = { stsPer4in: 'sts/4in', stsPerInch: 'sts/in', stsPer10cm: 'sts/10cm' }

export type LongLengthUnits = typeof longLengthUnits[keyof typeof longLengthUnits]
export type ShortLengthUnits = typeof shortLengthUnits[keyof typeof shortLengthUnits]
export type WholePartialUnits = typeof wholePartialUnits[keyof typeof wholePartialUnits]
export type GaugeUnits = typeof gaugeUnits[keyof typeof gaugeUnits]