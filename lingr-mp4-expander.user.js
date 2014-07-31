// ==UserScript==
// @name       Lingr MP4 Expander
// @namespace  http://aycabta.github.io/
// @version    0.1.0
// @description  URL -> embedded player
// @include    http://lingr.com/
// @include    http://lingr.com/room/*/archives*
// @copyright  2014+, Code Ass
// ==/UserScript==

(function() {
    if (location.href == "http://lingr.com/") {
        Lingr.Text.oldMP4ExpanderDecorate = Lingr.Text.decorate;
        Lingr.Text.decorate = function(str) {
            if (!str) {
                return Lingr.Text.oldMP4ExpanderDecorate(str);
            }
            var newStr = Lingr.Text.oldMP4ExpanderDecorate(str);
            var convertedStr = newStr.split('<\/p><p>').map(function(s) {
                hit = s.match(/^<a href.+>((?:http:\/\/)?.+.[Mm][Pp]4(?:\?.*)?)<\/a>$/);
                if (hit != null) {
                    url = hit[1];
                    var tag;
                    tag =       '<div class="mask">';
                    tag = tag + '<video src="' + url + '" controls="controls" />';
                    tag = tag + '<div onclick="Modeless.showVideoModeless(this)"></div></div>';
                    return tag;
                } else {
                    return s;
                }
            }).join('</p><p>');
            return convertedStr;
        };
    } else {
        var messages = $("div.decorated p");
        for (i = 0; i < messages.length; i++) {
            var oldMessage = messages[i].innerHTML;
            hit = oldMessage.match(/^<a href.+>((?:http:\/\/)?.+.[Mm][Pp]4(?:\?.*)?)<\/a>$/);
            if (hit != null) {
                    url = hit[1];
                messages[i].innerHTML = '<video src="' + url + '" controls="controls" />';
            }
        }
    }
})();

