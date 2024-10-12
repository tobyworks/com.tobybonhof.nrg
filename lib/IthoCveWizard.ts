'use strict';

import IthoCveConfig from './IthoCveConfig';

export default class IthoCveWizard {

  private static instance: IthoCveWizard;
  private host: string | null = null;
  private username: string | null = null;
  private password: string | null = null;

  // Private constructor prevents direct instantiation

  // The static method to access the singleton instance
  public static getInstance(): IthoCveWizard {
    if (!IthoCveWizard.instance) {
      IthoCveWizard.instance = new IthoCveWizard();
    }
    return IthoCveWizard.instance;
  }

  public setHost(host: string) {
    this.host = host;
  }

  public getHost(): string | null {
    return this.host;
  }

  public setUsername(username: string) {
    this.username = username;
  }

  public getUsername(): string | null {
    return this.username;
  }

  public setPassword(password: string) {
    this.password = password;
  }

  public getPassword(): string | null {
    return this.password;
  }

  public getConfig(): IthoCveConfig {
    return new IthoCveConfig(
      this.host as string,
      this.username != null && this.password != null,
      this.username,
      this.password,
    );
  }

  public reset() {
    this.host = null;
    this.username = null;
    this.password = null;
  }

}
