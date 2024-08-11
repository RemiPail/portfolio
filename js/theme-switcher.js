import moonIcon from "../assets/icons/moon.svg?url"; // Ensure you use the ?url import
import sunIcon from "../assets/icons/sun.svg?url"; // Ensure you use the ?url import

const themeSwitcher = {
  _scheme: "dark",
  toggleTarget: "#theme-toggle",
  rootAttribute: "data-theme",
  localStorageKey: "picoPreferredColorScheme",

  // Init
  init() {
    this.scheme = this.schemeFromLocalStorage;
    this.initToggle();
    this.updateButtonIcon();
  },

  // Get color scheme from local storage
  get schemeFromLocalStorage() {
    return window.localStorage?.getItem(this.localStorageKey) ?? this._scheme;
  },

  // Preferred color scheme
  get preferredColorScheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  },

  // Init toggle
  initToggle() {
    const toggleButton = document.querySelector(this.toggleTarget);
    if (toggleButton) {
      toggleButton.addEventListener(
        "click",
        () => {
          this.scheme = this.scheme === "dark" ? "light" : "dark";
        },
        false
      );
    }
  },

  // Set scheme
  set scheme(scheme) {
    this._scheme = scheme;
    this.applyScheme();
    this.updateButtonIcon();
    this.schemeToLocalStorage();
  },

  // Get scheme
  get scheme() {
    return this._scheme;
  },

  // Apply scheme
  applyScheme() {
    document
      .querySelector("html")
      ?.setAttribute(this.rootAttribute, this.scheme);
  },

  // Update button icon with SVG URL
  updateButtonIcon() {
    const toggleButton = document.querySelector(this.toggleTarget);
    toggleButton.innerHTML = ""; // Clear existing content

    const img = document.createElement("img");
    img.src = this.scheme === "dark" ? sunIcon : moonIcon; // Use the imported URL directly
    img.alt =
      this.scheme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    img.width = 24; // Adjust as necessary
    img.height = 24;

    toggleButton.appendChild(img);
  },

  // Store scheme to local storage
  schemeToLocalStorage() {
    window.localStorage?.setItem(this.localStorageKey, this.scheme);
  },
};

// Init
themeSwitcher.init();
