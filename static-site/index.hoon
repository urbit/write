/=  head  /partials-head/
^-  manx
;html
  ;+  (head "Urbit")
  ;body.container
    ;div.row.mb-6
      ;div.col-sm-10.col-md-8.col-lg-8.col-sm-offset-1.col-md-offset-2
        ;h1.mt-10: Notes
        ;div.clear
          ;button#new.bg-black.white.h-font
            ;span.text-500: New Document
          ==
          ;h2#doc.mt-10(style "display: none;"): empty
          ;input#title.mb-2(style "display:none;");
          ;button#cancel.bg-white.black.h-font(style "display:none;")
            ;span.text-500: Cancel
          ==
          ;button#save.bg-black.white.h-font(style "display:none;")
            ;span.text-500: Save
          ==
        ==
        ;textarea#collab;
      ==
    ==
    ;script@"https://code.jquery.com/jquery-3.3.1.slim.min.js";
    ;script@"https://togetherjs.com/togetherjs-min.js";
    ;script@"/js/main.js";
  ==
==
