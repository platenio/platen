{{- $ConfigKey       := "platen.theme.mode" -}}
{{- $PlatenThemeMode := partialCached "platen/param/getKey" $ConfigKey $ConfigKey -}}

const platenDefaultThemeMode  = '{{ $PlatenThemeMode }}'
const shoelaceDarkThemeClass  = 'sl-theme-dark'
const prefersDarkMedia        = '(prefers-color-scheme: dark)'
const mediaMatcher            = window.matchMedia(prefersDarkMedia)
const DefaultModeIsNotLight   = platenDefaultThemeMode != 'light'
const DefaultPreferenceIsDark = mediaMatcher.matches

/**
 * The MediaModeChangedListener function is called when the user's media preference
 * changes. If the user's preference is dark, the shoelace dark theme class is added
 * to the html element. If the user's preference is light, the shoelace dark theme
 * class is removed from the html element.
 * 
 * This function is only called when the Platen theme is set to auto.
 * 
 * @param {*} event The color scheme preference change event
 */
function MediaModeChangedListener(event) {
  const newColorScheme = event.matches ? "dark" : "light";
  if (newColorScheme === "light") {
    document.documentElement.classList.remove(shoelaceDarkThemeClass);
  } else if (!document.documentElement.classList.contains(shoelaceDarkThemeClass)) {
    document.documentElement.classList.add(shoelaceDarkThemeClass);
  }
}

/**
 * The setLightMode function removes the shoelace dark theme class from the html
 * element. This function is called when the Platen theme is set to light or
 * when it's set to auto and the user's media preference is light.
 * 
 * It removes the event listener for auto mode.
 */
function setLightMode() {
  if (document.documentElement.classList.contains(shoelaceDarkThemeClass)) {
    document.documentElement.classList.remove(shoelaceDarkThemeClass);
  }
  mediaMatcher.removeEventListener('change', MediaModeChangedListener);
}

/**
 * The setDarkMode function adds the shoelace dark theme class to the html
 * element. This function is called when the Platen theme is set to dark or
 * when it's set to auto and the user's media preference is dark.
 * 
 * It removes the event listener for auto mode.
 */
function setDarkMode() {
  if (!document.documentElement.classList.contains(shoelaceDarkThemeClass)) {
    document.documentElement.classList.add(shoelaceDarkThemeClass);
  }
  mediaMatcher.removeEventListener('change', MediaModeChangedListener);
}

/**
 * The setAutoMode function processes the user's media preference, updating the
 * html element according. Afterward, it adds the event listener for auto mode,
 * as the setLightMode and setDarkMode functions remove it.
 */
function setAutoMode() {
  if (mediaMatcher && mediaMatcher.matches) {
    setDarkMode();
  } else {
    setLightMode();
  }
  mediaMatcher.addEventListener('change', MediaModeChangedListener);
}

/**
 * The updateMode function is called when the Platen theme mode changes. It
 * updates the shoelace theme according to the new mode.
 * 
 * @param {string} mode The new theme mode. This is either light, dark, or auto.
 */
function updateMode(mode) {
  switch (mode) {
    case 'light':
      setLightMode();
      break;
    case 'dark':
      setDarkMode();
      break;
    case 'auto':
      setAutoMode();
      break;
  }
}

// When the script loads, if the Platen theme is set to auto or dark, ensure the
// shoelace class for dark theme is added to the html element.
if (DefaultModeIsNotLight && DefaultPreferenceIsDark) {
  document.documentElement.classList.add(shoelaceDarkThemeClass);
}

// Listen for menu toggling on the site's theme control.
document.documentElement.addEventListener('platen-theme-mode-changed', (event) => {
  updateMode(event.detail.newMode)
})
