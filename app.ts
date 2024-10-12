'use strict';

import Homey from 'homey';

module.exports = class S3BucketApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('MyApp has been initialized');
  }
}
