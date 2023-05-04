{{- $Params           := .                                 -}}
{{- $Config           := $Params.Config                    -}}
{{- $DefaultVariant   := $Config.default_variant  | safeJS -}}
{{- $JamIconsVersion  := $Config.version          | safeJS -}}
{{- $ShoelaceBasePath := $Params.ShoelaceBasePath | safeJS -}}

import { registerIconLibrary } from '{{ $ShoelaceBasePath }}/utilities/icon-library.js';

const LibraryBaseUrl = 'https://cdn.jsdelivr.net/npm/jam-icons@{{ $JamIconsVersion }}/svg'
const NamePattern    = /^(?<name>[^&\s]+)(&(?<variant>\w+))?$/
const VariantMap     = {{ $Config.variants | jsonify }}
const ValidVariants  = Object.keys(VariantMap)

registerIconLibrary('jam_icons', {
  resolver: name => {
    let matches = NamePattern.exec(name)

    if (matches) {
      let mName    = matches.groups.name
      let mVariant = matches.groups.variant

      if (mName && mVariant) {
        if (ValidVariants.includes(mVariant)) {
          name   = `${mName}${VariantMap[mVariant]}`
        } else {
          console.error(`Unrecognized Jam Icon variant '${mVariant}' in specified icon '${name}'`)
        }
      } else {
        name = `${mName}${VariantMap['{{ $DefaultVariant }}']}`
      }
    } else {
      console.error(`Unable to resolve Jam Icon named '${name}'`)
    }
    
    return `${LibraryBaseUrl}/${name}.svg`
  },
  mutator: svg => svg.setAttribute('fill', 'currentColor')
});