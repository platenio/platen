{{- $Params           := .                                  -}}
{{- $Config           := $Params.Config                     -}}
{{- $DefaultVariant   := $Config.default_variant  | safeJS  -}}
{{- $DefaultCategory  := $Config.default_category | safeJS  -}}
{{- $Version          := $Config.version          | safeJS  -}}
{{- $Variants         := $Config.variants         | jsonify -}}
{{- $Categories       := $Config.categories       | jsonify -}}
{{- $ShoelaceBasePath := $Params.ShoelaceBasePath | safeJS  -}}

import { registerIconLibrary } from '{{ $ShoelaceBasePath }}/utilities/icon-library.js';

const LibraryBaseUrl  = 'https://cdn.jsdelivr.net/npm/remixicon@{{ $Version }}/icons'
const NamePattern     = /^((?<category>\w+)\/)?(?<name>[^&\s]+?[^-])([-&](?<variant>\w+))?$/
const ValidCategories = {{ $Categories }}
const ValidVariants   = {{ $Variants }}

registerIconLibrary('remix_icon', {
  resolver: name => {
    let category = '{{ $DefaultCategory }}'
    let variant = '{{ $DefaultVariant }}'
    let matches = NamePattern.exec(name)

    if (matches) {
      let mCategory = matches.groups.category
      let mName     = matches.groups.name
      let mVariant  = matches.groups.variant

      if (mCategory) {
        if (ValidCategories.includes(mCategory)) {
          console.log(`setting remix category to: '${mCategory}'`)
          category = mCategory
        } else {
          console.error(`Unrecognized Remix Icon category '${mCategory}' in icon '${name}`)
        }
      }

      if (mVariant) {
        if (ValidVariants.includes(mVariant)) {
          console.log(`setting remix variant to: '${mVariant}'`)
          variant = mVariant
        } else {
          console.error(`Unrecognized Remix Icon variant '${mVariant}' in icon '${name}`)
        }
      }
      console.log(`setting remix name to: '${mName}'`)
      name = mName
    } else {
      console.error(`Unable to resolve Material Icon named '${name}'`)
    }

    category = category.charAt(0).toUpperCase() + category.slice(1)

    let iconURL = `${LibraryBaseUrl}/${category}/${name}-${variant}.svg`
    console.log(`Getting remix icon '${name}' from: ${iconURL}`)

    return iconURL
  },
  mutator: svg => svg.setAttribute('fill', 'currentColor')
});