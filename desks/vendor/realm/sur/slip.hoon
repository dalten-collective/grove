:: slip routes arbitrary data as pokes between urbit airlocks
::
:: the path can be used to route to different handlers / applications that depend on slip
::
:: slip is build to be a signalling channel for webrtc group calls in realm v1 rooms
::
:: but it has other applications in realm, or other urbit apps more generally.
|%
+$  action
  $%
      [%slip from=ship time=@da =path data=cord]
      [%slop to=(list ship) time=@da =path data=cord]
  ==
--
