export interface NTChartInterface{
  "ntChartRegionInterface" : NtChartRegionInterface[]
}

export interface NtChartRegionInterface {
  "labels": string[],
  "real": number[],
  "target": number[]
}
