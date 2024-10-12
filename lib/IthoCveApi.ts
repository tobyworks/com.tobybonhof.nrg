'use strict';

import IthoCveDiscoveryResult from './IthoCveDiscoveryResult';
import IthoDiscoveryResult from './IthoCveDiscoveryResult';
import IthoCveWizard from './IthoCveWizard';
import IthoCveConfig from './IthoCveConfig';
import IthoCveStatus from './IthoCveStatus';

export default class IthoCveApi {

  private buildCallUrl(
    host: string,
    params: { [key: string]: string },
    username: string | null,
    password: string | null,
  ): string {
    let url = `http://${host}/api.html?`;

    // Use Object.keys() to iterate over the keys of the params object
    Object.keys(params)
      .forEach((key) => {
        url += `${key}=${params[key]}&`;
      });

    // Append username and password if provided
    if (username && password) {
      url += `username=${username}&password=${password}`;
    }

    // Remove the trailing '&' if it exists
    return url.endsWith('&') ? url.slice(0, -1) : url;
  }

  public async discover(): Promise<IthoCveDiscoveryResult> {
    const wizard = IthoCveWizard.getInstance();
    const host = wizard.getHost();
    if (!host) {
      throw new Error('Host is not set');
    }
    const url = this.buildCallUrl(host, { get: 'ithostatus' }, wizard.getUsername(), wizard.getPassword());
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const text = await response.text();
        if (text === 'AUTHENTICATION FAILED') {
          return IthoDiscoveryResult.DiscoveredAuthenticated;
        }
        return IthoDiscoveryResult.DiscoveredUnauthenticated;
      }
      return IthoDiscoveryResult.NotDiscovered;
    } catch (error) {
      return IthoDiscoveryResult.NotDiscovered;
    }
  }

  public async setFanSpeed(config: IthoCveConfig, speed: number): Promise<void> {
    const url = this.buildCallUrl(config.host, {
      speed: speed.toString(),
    }, config.username, config.password);
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const text = await response.text();
        if (text === 'OK') {
          return Promise.resolve();
        }
      }
      return Promise.reject(new Error(`Failed to set fan speed (response status: ${response.status}, response text: ${await response.text()})`));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getCurrentSpeed(config: IthoCveConfig): Promise<number> {
    const url = this.buildCallUrl(config.host, { get: 'currentspeed' }, config.username, config.password);
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const text = await response.text();
        const speed = parseInt(text, 10);
        if (!Number.isNaN(speed)) {
          return speed;
        }
      }
      return Promise.reject(new Error(`Failed to get current speed (response status: ${response.status}, response text: ${await response.text()})`));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getIthoStatus(config: IthoCveConfig): Promise<IthoCveStatus> {
    const url = this.buildCallUrl(config.host, { get: 'ithostatus' }, config.username, config.password);
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        const json = await response.json();
        const status = IthoCveStatus.fromJSON(json);
        status.speedInt = await this.getCurrentSpeed(config);
        return status;
      }
      return Promise.reject(new Error(`Failed to get itho status (response status: ${response.status}, response text: ${await response.text()})`));
    } catch (error) {
      return Promise.reject(error);
    }
  }

}
