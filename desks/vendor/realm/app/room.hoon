:: 
::  %room [realm]:
::
/-  store=rooms
/+  lib=rooms
/+  dbug, default-agent
:: /+  agentio
|%
+$  card  card:agent:gall
+$  versioned-state
    $%  state-0
    ==
+$  state-0
  $:  %0
      my-room=(unit room:store)
      provider=(unit ship)
      outstanding-request=_|
  ==
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this   .
    def    ~(. (default-agent this %.n) bowl)
    core   ~(. +> [bowl ~])
::
++  on-save   !>(state)
++  on-load   |=(vase `..on-init)
++  on-leave  |=(path `..on-init)
++  on-agent  |=([wire sign:agent:gall] !!)
++  on-arvo   |=([wire sign-arvo] !!)
++  on-fail   |=([term tang] `..on-init)
++  on-init
  ^-  (quip card _this)
  `this
++  on-peek
    |=  =path
    ^-  (unit (unit cage))
    ?+    path  (on-peek:def path)
    ::
    :: EXAMPLE SCRY FROM DOJO
    :: > =store -build-file /=realm=/sur/rooms/hoon
    :: > .^(view:store %gx /=room=/present/rooms-view)
    ::  [%present ships={~bus}]
    ::
    :: example scry (simple)
    ::    (doesnt require sur/rooms/hoon)
    :: 
    :: .^((set ship) %gx /=room=/present/simple/noun)
    :: or
    :: .^((set ship) %gx /(scot %p our)/room/(scot %da now)/present/simple/noun)
    ::
      [%x ~]
        ``rooms-view+!>([%full my-room provider])
      [%x %present ~]
        :: TODO tall form?
        ::
        :: rooms-view is a general mar for these scries.
        ::
        ?~  my-room
          ``rooms-view+!>([%present *(set ship)])
        ``rooms-view+!>([%present present.u.my-room])
      ::
      :: no custom mark needed
      :: no sur needed
      :: just returns a (set ship)
      :: cant encode as json
      [%x %present %simple ~]
         ?~  my-room
            ``noun+!>(*(set ship))
          ``noun+!>(present.u.my-room)
      ::
      [%x %provider ~]
        ``rooms-view+!>([%provider provider])
    ==
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path
    (on-watch:def path)
      [%room %local ~]
    :_  this
      ?~  my-room  ~
      [%give %fact [/room/local]~ %rooms-update !>([%room u.my-room [%other ~]])]~
  ==
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^
    =^  cards  state
      ?+  mark  (on-poke:def mark vase)
        %rooms-action
          (action:core !<(action:store vase))
        ::
        %rooms-update
          (update:core !<(update:store vase))
      ==
    [cards this]
  --
--
::
|_  [=bowl:gall cards=(list card)]
:: TODO emit/emil pattern?
::
::
++  abet  [(flop cards) state]
++  core  .
++  emit  |=(=card core(cards [card cards]))
++  emil  |=(caz=(list card) core(cards (welp (flop caz) cards)))
++  give  |=(=gift:agent:gall (emit %give gift))
::
:: :: utils
++  fwd-to-room
  |=  [upd=update:store]
  ^-  (list card)
  ?~  provider     !!
  ?~  my-room      !!
  =/  here  present.u.my-room
  =.  here
    (~(del in here) our.bowl)
  :: poke everyone in here
  %~  tap  in
  ^-  (set card)
  %-  ~(run in here)
    |=  =ship
    :: %+  poke:pass:agentio
    [%pass / %agent [ship client:lib] %poke %rooms-update !>(upd)]
        :: [ship client:lib]
        :: :-  %rooms-update
        :: !>  upd
::
++  action
  |=  [act=action:store]
  ^-  (quip card _state)
  ?>  =(our.bowl src.bowl)
  |^
  ?+     -.act      (fwd-to-provider act)
    %logout         logout
    %exit           (exit act)
    %chat           (chat +.act)
    %request        (request act)
    %request-all    (request-all act)
    %set-provider   (set-provider +.act)
  ==
  ::
    ++  exit
      |=  act=action:store
      =.  my-room  ~
      (fwd-to-provider act)
    ++  request
      |=  act=action:store
      :: disabled for now because
      :: client UI can't clearly tell the difference between a requested room and an updated room.
      :: also its not clearly useful for the realm UI.
      ::
      `state
    ++  request-all
      |=  act=action:store
      ?:  outstanding-request
        ~&  >>>  'room request blocked. still awaiting response to a previous request.'
        `state
      =.  outstanding-request  &
      (fwd-to-provider act)
    ++  logout
      =/  dad       +.provider
      =.  my-room   ~
      =.  provider  ~
      :_  state
      :~
        [%pass / %agent [dad server:lib] %poke rooms-action+!>([%exit ~])]
        :: %+  poke:pass:agentio
        ::   [dad server:lib]
        ::   rooms-action+!>([%exit ~])
      ==
    ++  chat
    :: fwd to peers
    |=  =cord
      =/  upd
        [%chat our.bowl cord]
      =/  caz
        (fwd-to-room upd)
      =.  cards
        (welp (flop caz) cards)
      abet
    ++  set-provider
      |=  new-provider=ship
      :: ~&  >>  ['setting provider' new-provider]
      :: there is some ugliness in this gate
      :: because we need to preserve
      :: `provider`s inferred type as (unit ship)
      ::
      ::
      :: return if same provider
      ?:  .=
          new-provider
          ?~  provider  +(new-provider)
            u.provider
          ::
        ::
        :: use this opportunity to reset outstanding request
        =.  outstanding-request  |
        `state
      ::
      :: save old stuff
      =/  old-room
          my-room
      =/  old-provider=(unit ship)
        ?~  provider  ~
        provider
      ::
      :: exit room locally
      =?  my-room
          ?~  provider  |
          ?!
          =(u.provider ship)
        ~
      ::
      :: set new provider
      =.  provider
        [~ new-provider]
      ::
      :: reset outstanding-request
      =.  outstanding-request  |
      ::
      :: exit room remotely
      ::  (if applicable)
      ?~  old-room
        `state
      ::
      ?~  old-provider
        `state
      ::
      :: exit room remotely
      =*  dad
        u.old-provider
      :_  state
      :~
        [%pass /rooms %agent [dad server:lib] %poke rooms-action+!>([%exit ~])]
        :: %+  poke:pass:agentio
        ::   [dad server:lib]
        ::   rooms-action+!>([%exit ~])
      ==
    :: ::
    :: ::
    ++  fwd-to-provider
      |=  [act=action:store]
      ?~  provider
        ~&  >>>  [%rooms-no-provider]
        `state
      =*  dad  u.provider
      :: ~&  >>  ['fwd to provider' -.act]
      :_  state
      :~
        [%pass /rooms %agent [dad server:lib] %poke rooms-action+!>(act)]
        :: %+  poke:pass:agentio
        ::   [dad server:lib]
        ::   rooms-action+!>(act)
      ==
  --
::
++  update
  |=  [upd=update:store]
  ^-  (quip card _state)
  |^
  =.  cards
    :-  (publish-local upd)
    cards
  ?-  -.upd
    %room      (room +.upd)
    %rooms     (rooms +.upd)
    %invited   (invited +.upd)
    %kicked    (kicked +.upd)
    %chat      (chat +.upd)
  ==
  ::
    ++  chat
      |=  [=ship =cord]
      ::
      :: assert message is from peer
      ?~  my-room  !!
      =*  here  present.u.my-room
      ?>  (~(has in here) src.bowl)
      ::
      ~&  >  [%room-chat src.bowl cord]
      abet
    ::
    ++  room
      |=  [=room:store diff=update-diff:store]
      ::  TODO
      ::  if not my provider:
      ::    reply with [%exit ~] action
      :: this can do a lot to enforce consensus
      :: =======
      ?>  is-provider
      =.  my-room
        [~ room]
      abet
    ::
    ++  rooms
      |=  rooms=(set room:store)
      ?>  is-provider
      =.  outstanding-request  |
      :: find and update my-room
      ::
      :: look up room by @p
      :: TODO move this to lib
      =/  rum=(unit room:store)
        =/  looms  ~(tap in rooms)
        |-
        ?~  looms  ~
        ?:  %-
            ~(has in present.i.looms)
            our.bowl
            ::
          [~ i.looms]
        $(looms t.looms)
      ?~  rum  abet
      :: found my room
      =.  my-room  [~ u.rum]
      abet
    ::
    ++  invited
      |=  [provider=ship =rid:store =title:store =ship]
      ::
      :: should there be some kind of scry to friends
      :: to prevent spam invites?
      :: ?>  is-friend   :: TODO needed?
      ~&  >  :-  %room-invited
        [rid [%provider provider] [%invitedby ship]]
      abet
    ::
    ++  kicked
      |=  [provider=ship =rid:store =title:store =ship]
      ~&  >  :-  %room-kicked
        [provider rid ship]
      ?>  is-provider
      =.  my-room  ~
      abet
    :: ::
    :: ::
    :: :: utils
    ++  fwd-to-room
      |=  [upd=update:store]
      ^-  (list card)
      ?~  provider     !!
      ?~  my-room      !!
      =/  here  present.u.my-room
      =.  here
        (~(del in here) our.bowl)
      :: poke everyone in here
      %~  tap  in
      ^-  (set card)
      %-  ~(run in here)
        |=  =ship
        [%pass /room %agent [ship client:lib] %poke %rooms-update !>(upd)]
        :: %+  poke:pass:agentio
        ::     [ship client:lib]
        ::     :-  %rooms-update
        ::     !>  upd
    ::
    ++  publish-local
      |=  [upd=update:store]
      ^-  card
      [%give %fact [/room/local ~] %rooms-update !>(upd)]
    ::
    ++  is-provider
      ^-  ?
      ?~  provider  |
      =(src.bowl u.provider)
  --
::
--