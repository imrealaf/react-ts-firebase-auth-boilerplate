/**
 *  Config
 *
 *  @type Constant
 *  @desc contains configurations for the app that can be tweaked and altered
 */

export default {
  appName: "My app",
  meta: {
    titleSeperator: "-"
  },
  auth: {
    minPasswordLength: 6,
    validationErrors() {
      return {
        usernameValidEmail: "Not a valid email",
        passwordMinLength: `Password must be at least ${this.minPasswordLength} chars`
      };
    }
  }
};
