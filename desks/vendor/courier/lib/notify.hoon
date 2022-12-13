/-  sur=notify, courier
=<  [sur .]
=,  sur
|%
++  generate-push-notification
  |=  [our=ship app-id=cord new-dm=chat:courier]
  ^-  notification
  =/  new-push
    ?-    type.new-dm  
      %dm                 (dm-notif our app-id new-dm)
      %pending            (dm-notif our app-id new-dm)
      %group              (group-notif our app-id new-dm)
      %group-pending      (group-notif our app-id new-dm)
    ==
  new-push
::
++  dm-notif
  |=  [our=ship app-id=cord new-dm=chat:courier]
  ^-  notification
  =/  from      (rear ~(tap in to.new-dm))
  =/  content   (crip "from {(scow %p from)}")
  =/  mtd       ^-(mtd:sur [path.new-dm])
  =/  new-push
    [
      app-id=app-id
      data=[mtd]
      subtitle=(malt ~[['en' 'New Message']])
      contents=(malt ~[['en' content]])
    ]
  new-push
::
++  group-notif
  |=  [our=ship app-id=cord new-dm=chat:courier]
  ^-  notification
  =/  from      (turn ~(tap in to.new-dm) |=([p=@p] (scow %p p)))
  :: =/  content   (crip "New message from {(scow %p from)}")
  :: =/  content   (crip "New group DM from {<from>}")
  =/  new-push
    [
      app-id=app-id
      data=[path=path.new-dm]
      subtitle=(malt ~[['en' 'New Group DM']])
      contents=`(map cord cord)`(malt ~[['en' (crip "Message contents")]])
    ]
  new-push
::
++  dejs
  =,  dejs:format
  |%
  ++  action
    |=  jon=json
    ^-  action:sur
    =<  (decode jon)
    |%
    ++  decode
      %-  of
      :~  [%enable-push ul]
          [%disable-push ul]
          [%set-device set-device]
          [%remove-device remove-device]
      ==
    ::
    ++  set-device
      %-  ot
      :~  [%device-id so]
          [%player-id so]
      ==
    ::
    ++  remove-device
      %-  ot
      :~  [%device-id so]
      ==
    ::
    --
  ::
  --
++  enjs
  =,  enjs:format
  |%
  ++  request :: encodes for iris outbound
    |=  [notif=notification:sur =devices:sur]
    ^-  json
    =/  player-ids  ~(val by devices)
    %-  pairs
    :~  
        ['app_id' s+app-id.notif]
        ['data' (mtd data.notif)]
        ['include_player_ids' a+(turn player-ids |=([id=@t] s+id))]
        ['subtitle' (contents subtitle.notif)]
        ['contents' (contents contents.notif)]
    ==
    ++  mtd 
      |=  =mtd:sur
      ^-  json
      %-  pairs
      ['path' s+path.mtd]~
    ::
    ++  contents 
      |=  contents=(map cord cord)
      ^-  json
      =/  message   (~(got by contents) 'en')
      %-  pairs
      ['en' s+message]~
  ::
  ++  view :: encodes for on-peek
    |=  vi=view:sur
    ^-  json
    %-  pairs
    :_  ~
    ^-  [cord json]
    :-  -.vi
    ?-  -.vi
      :: ::
        %devices
      (devices devices.vi)
      ::
    ==
  ++  devices
    |=  =devices:sur
    ^-  json
    %-  pairs
    %+  turn  ~(tap by devices)
    |=  [=device-id:sur =player-id:sur]
    ^-  [cord json]
    [device-id s+player-id]
  --
::
--