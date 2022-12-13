:: 
::  %slip
::
/-  store=slip
/+  lib=slip
/+  dbug, default-agent
/+  agentio
|%
+$  card  card:agent:gall
+$  versioned-state
    $%  state-0
    ==
+$  state-0
  $:  %0
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
++  on-save   on-save:def
++  on-load   on-load:def
++  on-leave  on-leave:def
++  on-agent  on-agent:def
++  on-arvo   on-arvo:def
++  on-fail   on-fail:def
++  on-init   on-init:def
++  on-peek   on-peek:def
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  =(src.bowl our.bowl)
  ?+    path
    (on-watch:def path)
      [%slip %local ~]
    `this
  ==
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  |^
    =^  cards
        state
    ::
    ?+  mark
      (on-poke:def mark vase)
      ::
      %slip-action
      %-  action:core
        !<(action:store vase)
    ==
    ::
    [cards this]
  --
--
::
|_  [=bowl:gall cards=(list card)]
::
++  core  .
++  action
  |=  [act=action:store]
  ^-  (quip card _state)
  |^
  ?-  -.act
      %slip     (slip +.act)
      %slop     (slop +.act)
  ==
  ::
    ++  slip
      |=  [from=ship time=@da =path data=cord]
      ::
      :: TODO?
      :: maybe getting a slip from yourself should be prohibited
      :: ?<  =(src.bowl our.bowl)
      ::
      ::  we dont care who the slip claims to be from
      ::  we just care who the slip is actually from
      =.  from  src.bowl
      ::
      :: enforce data limit
      ?.  (data-limit data)
        ~&  >>>  ['oversized slip from' from]
        `state
      ::
      :: enforce room participation
      =/  room-path
        /(scot %p our.bowl)/room/(scot %da now.bowl)/present/simple/noun
      =/  present
        .^((set ship) %gx room-path)
      ?.  (~(has in present) from)
        ~&  >>>  ['foreign slip from' from]
        `state
      ::
      :: enforce an ames TTL of 2 minutes
      ?.  (lte now.bowl (add time max-latency))
        ~&  >>>  ['old slip from' from]
        `state
      ::
      :: slip is accepted
      ~&  >  :-
          %got-slip
          [from time path data]
      ::
      :_  state
      :~
      (give-slip [%slip from time path data])
      ==
    ::
    ++  slop
      |=  [to=(list ship) time=@da =path data=cord]
      ::
      ::  only we can send outbound lol
      ::  keep this line of code in
      ?>  =(src.bowl our.bowl)
      ::
      :: enforce data limit
      ?.  (data-limit data)
        ~&  >>>  ['oversized slop']
          `state
      ::
      :: assert the time isnt in the future
      ?.  (lte time now.bowl)
        ~&  >>>  ['future time: (time, now)' time now.bowl]
        `state
      :: 
      :: TODO should time be set here or from the slop origin?
      ::
      ::
      =/  slip=action:store
        :-  %slip
        :-  our.bowl
        :-  time
        :-  path
            data
      ::
      :_  state
      (poke-slop to slip)
  --
::
:: :: utils
++  poke-slop
  |=  [to=(list ship) slip=action:store]
  %+  turn  to
    |=  =ship
    %+  poke:pass:agentio
      [ship agent:lib]
      :-  %slip-action
      !>  slip
::
++  give-slip
  |=  [slip=action:store]
  ^-  card
  [%give %fact [/slip/local]~ %slip-action !>(slip)]
::
++  data-limit
  |=  [data=cord]
  ^-  ?
  ::
  :: enforce arbitrary limit on data size
  :: this is pretty large because
  :: unencoded webrtc offers/answers
  :: run to ~2k characters
  ::
  :: they should really be compressed
  :: and this limit should really be
  :: smaller
  ::
  (lte (lent (trip data)) max-data-size)
::
++  max-data-size  9.999
++  max-latency    ~m2
::
--

