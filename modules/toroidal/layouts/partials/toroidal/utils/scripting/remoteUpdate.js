{{- $params            := .                                                   -}}
{{- $memberPagesData   := $params.MemberPagesData                             -}}
{{- $displayComments   := $params.DisplayComments                             -}}
{{- $remoteUpdate      := $params.RemoteUpdate                                -}}
{{- $class             := $params.Class                                       -}}
{{- $displayComments   := $params.DisplayComments                             -}}
{{- $forEmbedding      := $params.ForEmbedding                                -}}
{{- $hideHeader        := $params.HideHeader                                  -}}
{{- $memberDescription := $params.MemberDescription                           -}}
{{- $memberHomePage    := $params.MemberHomePage                              -}}
{{- $memberListHref    := $params.MemberListHref                              -}}
{{- $memberName        := $params.MemberName                                  -}}
{{- $memberPageLinks   := $params.MemberPageLinks                             -}}
{{- $memberPages       := $params.MemberPages                                 -}}
{{- $nextHref          := $params.NextHref                                    -}}
{{- $prevHref          := $params.PrevHref                                    -}}
{{- $randomMemberLink  := $params.RandomMemberLink                            -}}
{{- $webringApiUrl     := $params.WebringApiUrl | jsonify | safeJS            -}}
{{- $webringName       := $params.WebringName                                 -}}
{{- $idMap             := partial "toroidal/utils/getNavIDs" $params          -}}
{{- $names             := partial "toroidal/utils/scripting/getNames" $params -}}

{{- if $forEmbedding -}}
{{- if $displayComments -}}
// This hardcode is provided by the webring host; so long
// as the host's URL or admin API doesn't move, this URL
// should remain valid. If it does move, the host should
// inform all of the members so they can update their own
// site code, iframe and embedded nav alike.
{{- end }}
{{ $names.ApiUrlVariable | safeJS }} = {{ $webringApiUrl }}
{{- if $displayComments }}
// Since most toroidal webring members may not be webdevs,
// this error builder tries to give you as much useful
// info as possible.
{{- end }}
{{ $names.AdminApiLoadErrorFunctionName | safeJS}} = function(response) {
  errorDetails = [
    '\tfor:  {{ $params.WebringName }}',
    `\tfrom: ${ {{- $names.ApiUrlVariable | safeJS -}} }`,
    '\twith status:',
    `\t\tcode:    ${response.status}`,
    `\t\tmessage: '${response.statusText}'\n`
  ].join('\n')
  errorMessage = [
    "Error loading latest toroidal data:\n",
    errorDetails,
    'Is your host configured to serve the API and is your host online? ',
    'Full failed response is in console logs.'
  ].join("")
  throw Error(errorMessage)
}

{{- if $displayComments }}
// An async function is needed to neatly pull from the
// toroidal host's admin api; it handles errors and
// logging to help a member troubleshoot.
{{- end }}
{{ $names.LoadFromAdminApiFunctionName }} = async function() {
  let data = await fetch(
    {{ $names.ApiUrlVariable | safeJS }},
    {
      credentials: 'omit'
    }
  ).then(response => {
    if (!response.ok) {
      {{ $names.AdminApiLoadErrorFunction | safeJS}}
    }
    return response.json()
  }).then(object => {
    return object.data
  }).catch(error => {
    console.error(error)
  })
  return data
}

{{- if $displayComments }}
// When the window first loads, try to get the most
// up-to-date info for the webring; these should help
// keep you from having to update your embed every
// time the webring list is updated or the host's
// settings are changed.
{{- end }}
{{ $names.WindowLoadHandlerFunctionName }} = async function() {
  {{- if $displayComments }}
  // Load the latest data from the host admin api
  {{- end }}
  data = await {{ $names.LoadFromAdminApiFunction }}
  {{- if $displayComments }}
  // If data is null, we couldn't fetch the latest info
  // from the admin api, so we fall back on the defaults
  // from the template.
  {{- end }}
  if (data != null) {
    console.log("Admin Api Data:", data)
    {{- if $displayComments }}
    // Pull the current list of members from the host API
    // This effects the random member link.
    {{- end }}
    {{ $names.MemberPagesDataVariable | safeJS }} = data.members.map(member => member.home)
    {{- if $displayComments }}
    // Update the webring name
    {{- end }}
    let labelID = '{{ $idMap.Label }}'
    labelElement = document.getElementById(labelID)
    if (labelElement != null) {
      labelElement.innerText = data.webringName
    }
    {{- if $displayComments }}
    // Update the webring list href
    {{- end }}
    let listID = '{{ $idMap.List }}'
    document.getElementById(listID).href = data.webringList
    {{- if $displayComments }}
    // Pull the current links for this member
    {{- end }}
    let memberName = '{{ lower $memberName }}'
    memberData = data.members.find( ({ name }) => {
      return name.toLowerCase() === memberName
    })
    console.log("Relevant Member Data:", memberData)
    {{- if $displayComments -}}
    // Log for inspection/debug
    // Update the prev/next hrefs
    {{- end }}
    let prevID = '{{ $idMap.Prev }}'
    let nextID = '{{ $idMap.Next }}'
    document.getElementById(prevID).href = memberData.prev
    document.getElementById(nextID).href = memberData.next
  }
}

window.addEventListener('load', {{ $names.WindowLoadHandlerFunctionName }});
{{- end -}}
