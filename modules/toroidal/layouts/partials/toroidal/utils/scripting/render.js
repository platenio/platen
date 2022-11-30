{{- $params          := .                                                   -}}
{{- $names           := partial "toroidal/utils/scripting/getNames" $params -}}
{{- $memberPagesData := $params.MemberPageLinks
                        | jsonify (dict "indent" "  ")
                        | safeJS
-}}
{{- $displayComments := $params.DisplayComments -}}

{{- if $displayComments -}}
// This variables creates a javascript namesapce to use
// for this webring. This allows multiple webrings to
// work on the same page even when they use similar
// functions.
{{- end }}
var {{ $names.NameSpace | safeJS }} = {};
{{ if $displayComments -}}
// This variable keeps the memberPages list for getting
// a random member's homepage when the user clicks the
// 'Random' link in the nav list. For iframes, this is
// always up-to-date and authoritative; for embeds,
// may be out of date in hours or days, so there is
// logic below for retreiving up-to-date info from the
// webring host's API. For more info, see the comments
// on loadFromAdminApi() and window.onload.
{{- end }}
{{ $names.MemberPagesDataVariable | safeJS }} = {{ $memberPagesData }};
{{ partial "toroidal/utils/scripting/randomMember.js" $params  }}
{{ partial "toroidal/utils/scripting/remoteUpdate.js" $params  }}
