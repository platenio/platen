{{- $Params           := .                                                     -}}
{{- $Config           := $Params.Config                                        -}}
{{- $DefaultVariant   := $Config.default_variant  | default "regular" | safeJS -}}
{{- $HeroiconsVersion := $Config.version          | safeJS                     -}}
{{- $ShoelaceBasePath := $Params.ShoelaceBasePath | safeJS                     -}}

import { registerIconLibrary } from '{{ $ShoelaceBasePath }}/utilities/icon-library.js';

const LibraryBaseUrl = 'https://cdn.jsdelivr.net/npm/heroicons@{{ $HeroiconsVersion }}'
const NamePattern    = /^(?<name>[^&\s]+)(&(?<variant>\w+))?$/
const VariantMap     = {{ $Config.variants | jsonify }}

registerIconLibrary('heroicons', {
  resolver: name => {
    let folder = VariantMap['{{ $DefaultVariant }}']
    let matches = NamePattern.exec(name)

    if (matches) {
      let mName    = matches.groups.name
      let mVariant = matches.groups.variant

      if (mName && mVariant) {
        name = mName
        folder = VariantMap[mVariant]
      }
    } else {
      console.error(`Unable to resolve heroicon named '${name}'`)
    }
    
    return `${LibraryBaseUrl}/${folder}/${name}.svg`
  }
});