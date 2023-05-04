{{- $Params             := .                                                     -}}
{{- $Config             := $Params.Config                                        -}}
{{- $DefaultVariant     := $Config.default_variant  | default "regular" | safeJS -}}
{{- $FontAwesomeVersion := $Config.version          | safeJS                     -}}
{{- $ShoelaceBasePath   := $Params.ShoelaceBasePath | safeJS                     -}}

import { registerIconLibrary } from '{{ $ShoelaceBasePath }}/utilities/icon-library.js';

const LibraryBaseUrl = 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@{{ $FontAwesomeVersion }}/svgs'
const NamePattern    = /^((?<prefix>fa[rbs])-)?(?<name>[^&\s]+)(&(?<variant>\w+))?$/
const VariantMap     = {{ $Config.variants | jsonify }}

registerIconLibrary('font_awesome', {
  resolver: name => {
    let folder = '{{ $DefaultVariant}}';
    let matches = NamePattern.exec(name);

    if (matches) {
      let mPrefix  =  matches.groups.prefix
      let mName    = matches.groups.name
      let mVariant = matches.groups.variant
      console.log(
        `Prefix is:  ${mPrefix}`,
        `Name is:    ${mName}`,
        `Variant is: ${mVariant}`
      )
      if (mName && mVariant) {
        name   = mName
        folder = mVariant
      } else if (mPrefix && mName) {
        name   = mName
        folder = Object.keys(VariantMap).find(variant => {
            if (VariantMap[variant] === mPrefix) {
              return variant
            }
        })
        if (folder == undefined) {
          console.error(
            `Unable to map prefix '${mPrefix}' to a valid variant for Font Awesome icon.`,
            'Valid variants and prefixes are:',
            VariantMap
          )
        }
        // if (mPrefix === 'far') folder = 'regular'
        // if (mPrefix === 'fas') folder = 'solid'
        // if (mPrefix === 'fab') folder = 'brands'
      }
      console.log(`Looking up FA icon '${name}' in folder ${folder}`)
    } else {
      console.error(`Unable to resolve Font Awesome icon named '${name}'`)
    }

    return `${LibraryBaseUrl}/${folder}/${name}.svg`;
  },
  mutator: svg => svg.setAttribute('fill', 'currentColor')
});