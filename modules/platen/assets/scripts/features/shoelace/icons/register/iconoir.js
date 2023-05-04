{{- $Params           := .                                                     -}}
{{- $Config           := $Params.Config                                        -}}
{{- $IconoirVersion   := $Config.Version          | safeJS                     -}}
{{- $ShoelaceBasePath := $Params.ShoelaceBasePath | safeJS                     -}}

import { registerIconLibrary } from '{{ $ShoelaceBasePath }}/utilities/icon-library.js';

const LibraryBaseUrl = 'https://cdn.jsdelivr.net/gh/lucaburgio/iconoir@{{ $IconoirVersion }}/icons'

registerIconLibrary('iconoir', {
  resolver: name => `${LibraryBaseUrl}/${name}.svg`
});