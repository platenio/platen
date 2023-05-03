{{- $Params           := .                                  -}}
{{- $Config           := $Params.Config                     -}}
{{- $DefaultVariant   := $Config.default_variant  | safeJS  -}}
{{- $Version          := $Config.version          | safeJS  -}}
{{- $Variants         := $Config.variants         | jsonify -}}
{{- $ShoelaceBasePath := $Params.ShoelaceBasePath | safeJS  -}}

import { registerIconLibrary } from '{{ $ShoelaceBasePath }}/utilities/icon-library.js';

const DefaultVariant = '{{ $DefaultVariant }}'
const LibraryBaseUrl = 'https://cdn.jsdelivr.net/npm/@iconscout/unicons@{{ $Version }}/svg'
const NamePattern    = /^(?<name>[^&\s]+?[^-])(-(?<suffix>\w+))?(&(?<variant>\w+))?$/
const VariantMap     = {{ $Variants }}
const ValidVariants  = Object.keys(VariantMap)

registerIconLibrary('unicons', {
  resolver: name => {
    let variant = DefaultVariant
    let matches = NamePattern.exec(name)

    if (matches) {
      let mName     = matches.groups.name
      let mSuffix   = matches.groups.suffix
      let mVariant  = matches.groups.variant

      if (mVariant) {
        if (ValidVariants.includes(mVariant)) {
          variant = mVariant
        } else {
          console.error(`Unrecognized Unicons variant '${mVariant}' in icon '${name}'`)
        }
      } else if (mSuffix) {
        variant = Object.keys(VariantMap).find(configVariant => {
          if (VariantMap[configVariant] === mSuffix) {
            return configVariant
          }
        })

        if (variant == undefined) {
          console.error(
            `Unable to map suffix '${mSuffix}' to a valid variant for Unicons.`,
            'Valid variants and suffixes are:',
            VariantMap,
            `Defaulting to ${DefaultVariant}`
          )
        }
        variant = DefaultVariant
      }

      name = mName
    } else {
      console.error(`Unable to resolve Unicon named '${name}'`)
    }

    let iconURL = `${LibraryBaseUrl}/${variant}/${name}.svg`

    return iconURL
  },
  mutator: svg => svg.setAttribute('fill', 'currentColor')
});