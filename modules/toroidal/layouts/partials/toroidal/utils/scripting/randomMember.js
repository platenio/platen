{{- $params           := .                                                   -}}
{{- $displayComments  := $params.DisplayComments                             -}}
{{- $randomMemberLink := $params.RandomMemberLink                            -}}
{{- $names            := partial "toroidal/utils/scripting/getNames" $params -}}
{{- if $randomMemberLink }}
{{- if $displayComments }}
// This function returns a random member page from the
// list of known members; it's in a separate function
// to make it easier for you to test/see locally.
//
// Note that with a small member list, you'll see that
// the same members are repeated often, sometimes even
// several times in a row.
{{- end }}
{{ $names.GetFunctionName | safeJS }} = function() {
  let memberData = {{ $names.MemberPagesDataVariable | safeJS }};
  let memberCount = memberData.length;
  return memberData[Math.floor(Math.random() * memberCount)];
}
{{- if $displayComments }}
// This is the function that actually gets called when
// a site visitor clicks on the 'Random' link in the
// nav list. It takes the user directly to a random
// member's homepage.
//
// Note that it only works on *click* for now; if a
// user right-clicks to open in a new tab, they will
// unfortunately not go anywhere.
{{- end }}
{{ $names.GoToFunctionName | safeJS}} = function() {
  let randomPage = {{ $names.GetFunction | safeJS }};
  window.open(randomPage, "_blank")
}
{{- end -}}
