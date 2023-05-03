{{- $Params           := .                                                     -}}
{{- $Config           := $Params.Config                                        -}}
{{- $DefaultVariant   := $Config.default_variant  | default "regular" | safeJS -}}
{{- $IoniconsVersion  := $Config.version          | safeJS                     -}}
{{- $ShoelaceBasePath := $Params.ShoelaceBasePath | safeJS                     -}}

import { registerIconLibrary } from '{{ $ShoelaceBasePath }}/utilities/icon-library.js';

const LibraryBaseUrl = 'https://cdn.jsdelivr.net/npm/ionicons@{{ $IoniconsVersion }}/dist/ionicons/svg'
const NamePattern    = /^(?<name>[^&\s]+)(&(?<variant>\w+))?$/
const VariantMap     = {{ $Config.variants | jsonify }}
const ValidVariants  = Object.keys(VariantMap)

registerIconLibrary('ionicons', {
  resolver: name => {
    let matches = NamePattern.exec(name)

    if (matches) {
      let mName    = matches.groups.name
      let mVariant = matches.groups.variant

      if (mName && mVariant) {
        if (ValidVariants.includes(mVariant)) {
          name   = `${mName}${VariantMap[mVariant]}`
        } else {
          console.error(`Unrecognized ionicon variant '${mVariant}' in specified icon '${name}'`)
        }
      } else {
        name = `${mName}${VariantMap['{{ $DefaultVariant }}']}`
      }
    } else {
      console.error(`Unable to resolve heroicon named '${name}'`)
    }
    
    return `${LibraryBaseUrl}/${name}.svg`
  },
  mutator: svg => {
    svg.setAttribute('fill', 'currentColor');
    svg.setAttribute('stroke', 'currentColor');
    [...svg.querySelectorAll('.ionicon-fill-none')].map(el => el.setAttribute('fill', 'none'));
    [...svg.querySelectorAll('.ionicon-stroke-width')].map(el => el.setAttribute('stroke-width', '32px'));
  }
});