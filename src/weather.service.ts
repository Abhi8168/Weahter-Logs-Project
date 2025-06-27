import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class WeatherService {
  private textPath = path.join(__dirname, '..', 'weather-log.txt');
  private jsonPath = path.join(__dirname, '..', 'weather-log.json');

  constructor() {
    this.ensureLogFilesExist();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getWeather() {
    const city = 'London';
    const url = `https://wttr.in/${city}?format=j1`;
    console.log('Fetching weather...');

    try {
      const response = await axios.get(url);
      const currentData = response.data.current_condition[0];

      const report = {
        city,
        Temperature: currentData.temp_C,
        Weather: currentData.weatherDesc[0].value,
        Humidity: currentData.humidity,
        windSpeed: currentData.windspeedKmph,
        timestamp: new Date().toISOString(),
      };

      await this.createTextLog(report);
      await this.createJsonLog(report);

      // Optional console output for visibility
      console.log('Weather JSON:', JSON.stringify(report, null, 2));
    } catch (err) {
      console.error('Weather API Error:', err);
      throw new InternalServerErrorException({
        success: false,
        message: 'Something went wrong while fetching the weather data',
      });
    }
  }

  private ensureLogFilesExist() {
    if (!fs.existsSync(this.textPath)) {
      fs.writeFileSync(this.textPath, '', 'utf-8');
    }
    if (!fs.existsSync(this.jsonPath)) {
      fs.writeFileSync(this.jsonPath, '[]', 'utf-8'); // initialize with empty array
    }
  }

  private async createTextLog(report) {
    const log =
      `${report.timestamp} Weather in ${report.city}\n` +
      `- Temperature: ${report.Temperature}\n` +
      `- Weather: ${report.Weather}\n` +
      `- Humidity: ${report.Humidity}\n` +
      `- Wind Speed: ${report.windSpeed}\n\n`;

    fs.appendFileSync(this.textPath, log, 'utf-8');
  }

  private async createJsonLog(report) {
    const existingData = JSON.parse(fs.readFileSync(this.jsonPath, 'utf-8'));
    existingData.push(report);
    fs.writeFileSync(
      this.jsonPath,
      JSON.stringify(existingData, null, 2),
      'utf-8',
    );
  }
}
