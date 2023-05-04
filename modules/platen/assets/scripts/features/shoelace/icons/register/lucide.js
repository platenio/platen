{{- $Params           := .                                                     -}}
{{- $Config           := $Params.Config                                        -}}
{{- $LucideVersion    := $Config.Version          | safeJS                     -}}
{{- $ShoelaceBasePath := $Params.ShoelaceBasePath | safeJS                     -}}

import { registerIconLibrary } from '{{ $ShoelaceBasePath }}/utilities/icon-library.js';

const LibraryBaseUrl = 'https://cdn.jsdelivr.net/npm/lucide-static@{{ $LucideVersion }}/icons'

registerIconLibrary('lucide', {
  resolver: name => `${LibraryBaseUrl}/${name}.svg`
});