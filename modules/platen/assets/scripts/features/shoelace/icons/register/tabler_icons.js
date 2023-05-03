{{- $Params           := .                                                     -}}
{{- $Config           := $Params.Config                                        -}}
{{- $Version          := $Config.Version          | safeJS                     -}}
{{- $ShoelaceBasePath := $Params.ShoelaceBasePath | safeJS                     -}}

import { registerIconLibrary } from '{{ $ShoelaceBasePath }}/utilities/icon-library.js';

const LibraryBaseUrl = 'https://cdn.jsdelivr.net/npm/@tabler/icons@{{ $Version }}/icons'

registerIconLibrary('tabler_icons', {
  resolver: name => `${LibraryBaseUrl}/${name}.svg`
});
