'use strict';

export default class IthoCveConfig {

  host: string;
  isAuthenticated: boolean;
  username: string | null;
  password: string | null;

  constructor(host: string, isAuthenticated: boolean, username: string | null, password: string | null) {
    this.host = host;
    this.isAuthenticated = isAuthenticated;
    this.username = username;
    this.password = password;
  }

}
