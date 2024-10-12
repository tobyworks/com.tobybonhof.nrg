'use strict';

export default class IthoCveStatus {

  temp: number;
  hum: number;
  ppmw: number;
  ventilationSetpoint: number;
  fanSetpoint: number;
  fanSpeed: number;
  error: number;
  selection: number;
  startupCounter: number;
  totalOperationHours: number;
  absenceMinutes: number;
  highestCO2Concentration: string;
  highestRHConcentration: number;
  relativeHumidity: number;
  temperature: number;
  speedInt: number;

  constructor(
    temp: number,
    hum: number,
    ppmw: number,
    ventilationSetpoint: number,
    fanSetpoint: number,
    fanSpeed: number,
    error: number,
    selection: number,
    startupCounter: number,
    totalOperationHours: number,
    absenceMinutes: number,
    highestCO2Concentration: string,
    highestRHConcentration: number,
    relativeHumidity: number,
    temperature: number,
    speedInt: number,
  ) {
    this.temp = temp;
    this.hum = hum;
    this.ppmw = ppmw;
    this.ventilationSetpoint = ventilationSetpoint;
    this.fanSetpoint = fanSetpoint;
    this.fanSpeed = fanSpeed;
    this.error = error;
    this.selection = selection;
    this.startupCounter = startupCounter;
    this.totalOperationHours = totalOperationHours;
    this.absenceMinutes = absenceMinutes;
    this.highestCO2Concentration = highestCO2Concentration;
    this.highestRHConcentration = highestRHConcentration;
    this.relativeHumidity = relativeHumidity;
    this.temperature = temperature;
    this.speedInt = speedInt;
  }

  static fromJSON(json: any): IthoCveStatus {
    return new IthoCveStatus(
      json.temp,
      json.hum,
      json.ppmw,
      json['Ventilation setpoint (%)'],
      json['Fan setpoint (rpm)'],
      json['Fan speed (rpm)'],
      json.Error,
      json.Selection,
      json['Startup counter'],
      json['Total operation (hours)'],
      json['Absence (min)'],
      json['Highest CO2 concentration (ppm)'],
      json['Highest RH concentration (%)'],
      json.RelativeHumidity,
      json.Temperature,
      -1, // Set later
    );
  }

}
