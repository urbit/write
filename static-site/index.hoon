/=  head  /partials-head/
^-  manx
;html
  ;+  (head "Urbit")
  ;body.container
    ;div.row.mb-6.mt-20
      ;div.col-sm-12
        ;h1: Write
        ;div.mt-4
          ;button#new.bg-black.white
            ;span.text-500: New..
          ==
        ==
      ==
      ;div.col-sm-6
        ;h2#doc.mt-10(style "display: none;"): empty
        ;input#title.mb-2(style "display:none;");
        ;button#cancel.bg-white.black.h-font(style "display:none;")
          ;span.text-500: Cancel
        ==
        ;button#save.bg-black.white.h-font(style "display:none;")
          ;span.text-500: Save
        ==
        ;textarea#collab;
      ==
    ==
    ;script@"https://code.jquery.com/jquery-3.3.1.slim.min.js";
    ;script@"https://togetherjs.com/togetherjs-min.js";
    ;script@"/js/main.js";
  ==
==
