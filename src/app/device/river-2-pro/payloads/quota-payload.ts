export interface QuotaPayload<T extends TypeCode> {
  id: number;
  version: string;
  time: number;
  needAck: number;
  moduleType: number;
  typeCode: TypeCode;
  params: ParamsMap[T];
}

export type TypeCode = 'pdStatus' | 'bmsStatus' | 'emsStatus' | 'mpptStatus' | 'invStatus';

export interface PowerDeliveryParams {
  carWatts: number;
  bpPowerSoc: number;
  soc: number;
  watchIsConfig: number;
  usb1Watts: number;
  wattsOutSum: number;
  remainTime: number;
  carState: number;
  typec1Watts: number;
  typecChaWatts: number;
}
export interface BatteryManagementSystemParams { }
export interface EnergyManagementSystemParams { }
export interface MaxPowerPointTrackingParams { }
export interface InverterParams { }

export interface ParamsMap {
  pdStatus: PowerDeliveryParams;
  bmsStatus: BatteryManagementSystemParams;
  emsStatus: EnergyManagementSystemParams;
  mpptStatus: MaxPowerPointTrackingParams;
  invStatus: InverterParams;
}
