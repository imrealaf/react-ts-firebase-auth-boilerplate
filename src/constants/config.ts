/**
 *  Config
 *
 *  @type Constant
 *  @desc contains configurations for the app that can be tweaked and altered
 */

export default {
  appName: "My app",
  auth: {
    minPasswordLength: 6,
    numCharsToShowError: 3,
    validationErrors() {
      return {
        usernameValidEmail: "Not a valid email",
        passwordMinLength: `Password must be at least ${this.minPasswordLength} chars`
      };
    }
  }
};
