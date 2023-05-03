{{- $Params           := .                                                     -}}
{{- $Config           := $Params.Config                                        -}}
{{- $DefaultVariant   := $Config.default_variant  | default "regular" | safeJS -}}
{{- $BoxiconsVersion  := $Config.version          | safeJS                     -}}
{{- $ShoelaceBasePath := $Params.ShoelaceBasePath | safeJS                     -}}

import { registerIconLibrary } from '{{ $ShoelaceBasePath }}/utilities/icon-library.js';

const LibraryBaseUrl = 'https://cdn.jsdelivr.net/npm/boxicons@{{ $BoxiconsVersion}}/svg'
const NamePattern    = /^(?<prefix>bx[sl]?-)?(?<name>[^&\s]+)(&(?<variant>\w+))?$/
const VariantMap     = {{ $Config.variants | jsonify }}

registerIconLibrary('boxicons', {
  resolver: name => {
    let folder = '{{ $DefaultVariant }}';
    let matches = NamePattern.exec(name)

    if (matches) {
      let mPrefix  = matches.groups.prefix
      let mName    = matches.groups.name
      let mVariant = matches.groups.variant

      if (mName && mVariant) {
        name = `${VariantMap[mVariant]}-${mName}`
      } else if (mPrefix && mName) {
        // nothing to do, need to obviate this case before else
      } else {
        name = `${VariantMap[folder]}-${mName}`
      }
    } else {
      console.error(`Unable to resolve boxicon named '${name}'`)
    }

    if (name.substring(0, 4) === 'bx-')  folder = 'regular';
    if (name.substring(0, 4) === 'bxs-') folder = 'solid';
    if (name.substring(0, 4) === 'bxl-') folder = 'logos';

    return `${LibraryBaseUrl}/${folder}/${name}.svg`;
  },
  mutator: svg => svg.setAttribute('fill', 'currentColor')
});
