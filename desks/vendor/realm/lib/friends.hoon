::  people [realm]:
::
::  People management lib within Realm. Mostly handles [de]serialization
::    to/from json from types stored in people sur.
::
::  Permissions management is centralized in the spaces agent. People
::   agent synch's permissions with spaces. People agent also
::   synch's contacts from contact-store.
::
::
/-  sur=friends
=<  [sur .]
=,  sur
|%
++  nu                                              ::  parse number as hex
  |=  jon=json
  ?>  ?=([%s *] jon)
  (rash p.jon hex)
::
++  enjs
  =,  enjs:format
  |%
  ++  reaction
    |=  rct=^reaction
    ^-  json
    %-  pairs
    :_  ~
    ^-  [cord json]
    ?-  -.rct
        %friends
      [%friends (frens:encode friends.rct)]
      ::
        %friend
      :-  %friend
      %-  pairs
      :~  [%ship s+(scot %p ship.rct)]
          [%friend (fren:encode friend.rct)]
      ==
      ::
        %new-friend
      :-  %new-friend
      %-  pairs
      :~  [%ship s+(scot %p ship.rct)]
          [%friend (fren:encode friend.rct)]
      ==
      ::
        %bye-friend
      :-  %bye-friend
      (pairs [%ship s+(scot %p ship.rct)]~)
    ==
  ::
  ++  action
    |=  act=^action
    ^-  json
    %+  frond  %visa-action
    %-  pairs
    :_  ~
    ^-  [cord json]
    ?-  -.act
    ::
        %add-friend
      :-  %add-friend
      %-  pairs
      :~  [%ship s+(scot %p ship.act)]
      ==
    ::
        %edit-friend
      :-  %edit-friend
      %-  pairs
      :~  [%ship s+(scot %p ship.act)]
          [%pinned [%b pinned.act]]
          [%tags [%a (turn ~(tap in tags.act) |=(tag=cord s+tag))]]
      ==
    ::
        %remove-friend
      :-  %remove-friend
      %-  pairs
      :~  [%ship s+(scot %p ship.act)]
      ==
    ::
    ::  Receiving
    ::
        %be-fren
      :-  %be-fren
      ~
    ::
        %yes-fren
      :-  %yes-fren
      ~
    ::
        %bye-fren
      :-  %bye-fren
      ~
    ::
    ::
    ==
  ::
  ++  view :: encodes for on-peek
    |=  view=^view
    ^-  json
    %-  pairs
    :_  ~
    ^-  [cord json]
    ?-  -.view
        %friends
      [%friends (frens:encode friends.view)]
    ==
  --
::
++  dejs
  =,  dejs:format
  |%
  ++  action
    |=  jon=json
    ^-  ^action
    =<  (decode jon)
    |%
    ++  decode
      %-  of
      :~  [%add-friend add-friend]
          [%edit-friend edit-friend]
          [%remove-friend remove-friend]
          [%be-fren ul]
          [%yes-fren ul]
          [%bye-fren ul]
      ==
    ::
    ++  add-friend
      %-  ot
      :~  [%ship (su ;~(pfix sig fed:ag))]
      ==
    ::
    ++  edit-friend
      %-  ot
      :~  [%ship (su ;~(pfix sig fed:ag))]
          [%pinned bo]
          [%tags (as cord)]
      ==
    ::
    ++  remove-friend
      %-  ot
      :~  [%ship (su ;~(pfix sig fed:ag))]
      ==
    ::
    --
  --
::
::
::
++  encode
  =,  enjs:format
  |%
  ++  frens
    |=  =friends
    ^-  json
    %-  pairs
    %+  turn  ~(tap by friends)
    |=  [=^ship =friend]
    ^-  [cord json]
    [(scot %p ship) (fren friend)]
  ::
  ++  fren
    |=  =friend
    ^-  json
    %-  pairs:enjs:format
    :~  ['pinned' b+pinned.friend]
        ['tags' [%a (turn ~(tap in tags.friend) |=(tag=cord s+tag))]]
        ['status' s+status.friend]
    ==
  ::
  --
--
