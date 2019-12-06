/**
 *  Config
 *
 *  @type Constant
 *  @desc contains configurations for the app that can be tweaked and altered
 */

export default {
  appName: "React App",
  namespace: "reactapp",
  storageKey() {
    return `${this.namespace}_logged_in`;
  },
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
  },
  upload: {
    maxFileUploadSize: 3145728, // 3mb
    validTypes: ["image/png", "image/jpeg", "image/jpg"]
  }
};
