export type UnitOptions = { label: string, value: string }

export type Dimension = {
    readonly?: boolean
    value: number
    unitOptions: UnitOptions[]
    units: string
}

export const longLengthUnitOptions: UnitOptions[] = [{ value: 'yards', label: 'yd'}, {value: 'meters', label: 'm' }]
export const shortLengthUnitOptions: UnitOptions[] = [{ value: 'inches', label: 'in'}, {value: 'cm', label: 'cm' }]
export const wholePartialUnitOptions: UnitOptions[] = [{ value: 'whole', label: 'whole'},{ value: 'partial', label: 'partial' }]
export const gaugeUnitOptions: UnitOptions[] = [{ value: 'stsPer4in', label: 'sts/4in'}, {value: 'stsPerInch', label: 'sts/in'}, {value: 'stsPer10cm', label: 'sts/10cm' }]

const longLengthValues = longLengthUnitOptions.map((u: UnitOptions) => u.value)
const shortLengthValues = shortLengthUnitOptions.map((u: UnitOptions) => u.value)
const wholePartialValues = wholePartialUnitOptions.map((u: UnitOptions) => u.value)
const gaugeValues = gaugeUnitOptions.map((u: UnitOptions) => u.value)
export type LongLengthUnits = typeof longLengthValues[number]
export type ShortLengthUnits = typeof shortLengthValues[number]
export type WholePartialUnits = typeof wholePartialValues[number]
export type GaugeUnits = typeof gaugeValues[number]