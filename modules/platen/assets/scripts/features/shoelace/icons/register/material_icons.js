{{- $Params           := .                                 -}}
{{- $Config           := $Params.Config                    -}}
{{- $DefaultVariant   := $Config.default_variant  | safeJS -}}
{{- $Version          := $Config.version          | safeJS -}}
{{- $ShoelaceBasePath := $Params.ShoelaceBasePath | safeJS -}}

import { registerIconLibrary } from '{{ $ShoelaceBasePath }}/utilities/icon-library.js';

const LibraryBaseUrl = 'https://cdn.jsdelivr.net/npm/@material-icons/svg@{{ $Version }}/svg'
const NamePattern    = /^(?<name>[^_&\s]+)([_&](?<variant>\w+))?$/
const ValidVariants  = {{ $Config.variants | jsonify }}

registerIconLibrary('material_icons', {
  resolver: name => {
    let variant = '{{ $DefaultVariant }}'
    let matches = NamePattern.exec(name)

    if (matches) {
      let mName    = matches.groups.name
      let mVariant = matches.groups.variant

      if (mName && mVariant) {
        if (ValidVariants.includes(mVariant)) {
          name    = mName
          variant = mVariant
        } else {
          console.error(`Unrecognized Material Icon variant '${mVariant}' in specified icon '${name}'`)
        }
      }
    } else {
      console.error(`Unable to resolve Material Icon named '${name}'`)
    }

    return `${LibraryBaseUrl}/${name}/${variant}.svg`
  },
  mutator: svg => svg.setAttribute('fill', 'currentColor')
});