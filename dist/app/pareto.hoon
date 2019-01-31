::::  /===/app/pareto/hoon
  ::
!:
=,  dejs:format
|%
+$  move  [bone card]
+$  card
  $%  {$diff $json json}
      {$peer wire dock path}
  ==
+$  nam-json  [app=@t data=json]
++  json-to-app-data
  %-  ot
  :~
    app+so
    data+same
  ==
--
|_  [bow=bowl:gall pjn=(map @t json)]
::
++  this  .
::
++  poke-noun
  |=  [nam/[@t json]]
  ^-  (quip move _this)
  ~&  [%poke-noun nam]
  :_  this(pjn (~(put by (~(del by pjn) -.nam)) nam))
  [ost.bow %diff %json +.nam]~
++  poke-json
  |=  [jon/json]
  ^-  (quip move _this)
  ~&  [%poke-json jon]
  =+  asd=(json-to-app-data jon)
  =/  nsd/nam-json  asd
  ~&  nsd
  :_  this(pjn (~(put by (~(del by pjn) app.nsd)) nsd))
  %+  turn  (prey:pubsub:userlib (stab app.nsd) bow)
  |=  [=bone *]
  =+  jop=o+(malt (limo ~[['app' s+app.nsd] ['data' data.nsd]]))
  [bone %diff %json jop]
::
++  peer
  |=  pax=path
  ^-  (quip move _this)
  =+  fam=(spat pax)
  =+  res=(~(get by pjn) fam)
  ?~  res
    ~&  %nul
    :_  this  ~
    ~&  %res
  =+  jon=o+(malt (limo ~[['app' s+fam] ['data' u.res]]))
  :_  this  [ost.bow %diff %json jon]~
::
--
