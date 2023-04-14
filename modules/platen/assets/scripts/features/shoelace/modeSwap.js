{{- $ConfigKey       := "platen.theme.mode"                                       -}}
{{- $PlatenThemeMode := partialCached "platen/param/getKey" $ConfigKey $ConfigKey -}}

const platenThemeMode        = '{{ $PlatenThemeMode }}'
const shoelaceDarkThemeClass = 'sl-theme-dark'
const prefersDarkMedia       = '(prefers-color-scheme: dark)'

// When the script loads, if the Platen theme is set to auto or dark, ensure the
// shoelace class for dark theme is added to the html element.
if (platenThemeMode != 'light' && window.matchMedia && window.matchMedia(prefersDarkMedia).matches) {
  document.documentElement.classList.add(shoelaceDarkThemeClass);
}

// If the platen theme is set to auto, ensure that the shoelace theme toggles with
// the user's preference.
if (platenThemeMode === 'auto') {
  window.matchMedia(prefersDarkMedia).addEventListener('change', event => {
    const newColorScheme = event.matches ? "dark" : "light";
    if (newColorScheme === "light") {
      document.documentElement.classList.remove(shoelaceDarkThemeClass);
    } else if (!document.documentElement.classList.contains(shoelaceDarkThemeClass)) {
      document.documentElement.classList.add(shoelaceDarkThemeClass);
    }
  });
}