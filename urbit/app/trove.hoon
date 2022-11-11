::
/-  *trove, m=membership, s=spaces-store, v=visas
/+   dbug, default-agent, verb
|%
::
+$  versioned-state  $%(state-0)
::
+$  state-0
  $:  %0
      troves=(map spat [=team =regs =trove])
      ipfs=[node=@t code=@t]
  ==
::
::
::  boilerplate
::
+$  card  card:agent:gall
--
::
%+  verb  &
%-  agent:dbug
=|  state-0
=*  state  -
::
^-  agent:gall
::
=<
  |_  =bowl:gall
  +*  this  .
      def  ~(. (default-agent this %|) bowl)
      eng   ~(. +> [bowl ~])
  ++  on-init
    ^-  (quip card _this)
    ~>  %bout.[0 '%trove +on-init']
    =^  cards  state
      abet:init:eng
    [cards this]
  ::
  ++  on-save
    ^-  vase
    ~>  %bout.[0 '%trove +on-save']
    !>(state)
  ::
  ++  on-load
    |=  ole=vase
    ~>  %bout.[0 '%trove +on-load']
    ^-  (quip card _this)
    =^  cards  state
      abet:(load:eng ole)
    [cards this]
  ::
  ++  on-poke
    |=  [mar=mark vaz=vase]
    ~>  %bout.[0 '%trove +on-poke']
    ^-  (quip card _this)
    `this
  ::
  ++  on-peek
    |=  =path
    ~>  %bout.[0 '%trove +on-peek']
    ^-  (unit (unit cage))
    [~ ~]
  ::
  ++  on-agent
    |=  [wir=wire sig=sign:agent:gall]
    ~>  %bout.[0 '%trove +on-agent']
    ^-  (quip card _this)
    =^  cards  state
      abet:(dude:eng wir sig)
    [cards this]
  ::
  ++  on-arvo
    |=  [wir=wire sig=sign-arvo]
    ~>  %bout.[0 '%trove +on-arvo']
    ^-  (quip card _this)
    `this
  ::
  ++  on-watch
  |=  =path
  ~>  %bout.[0 '%trove +on-watch']
  ^-  (quip card _this)
  =^  cards  state
    abet:(peer:eng path)
  [cards this]
  ::
  ++  on-fail
    ~>  %bout.[0 '%trove +on-fail']
    on-fail:def
  ::
  ++  on-leave
    ~>  %bout.[0 '%trove +on-init']
    on-leave:def
  --
|_  [bol=bowl:gall dek=(list card)]
+*  dat  .
    our  (scot %p our.bol)
    now  (scot %da now.bol)
++  emit  |=(=card dat(dek [card dek]))
++  emil  |=(lac=(list card) dat(dek (welp lac dek)))
++  abet
  ^-  (quip card _state)
  [(flop dek) state]
::  +show: send web-ui fact
::
++  show  |=(cag=cage (emit %give %fact [/web-ui]~ cag))
::  +init: handle on-init
::
++  init
  ^+  dat
  =^  cards  state
    sa-abet:sa-peer:sa
  (emil cards)
::  +load: handle on-load
::
++  load
  |=  vaz=vase
  ^+  dat
  ?>  ?=([%0 *] q.vaz)
  =.  state  !<(state-0 vaz)
  dat
::  +peer: handle on-watch
::
++  peer
  |=  pol=(pole knot)
  ^+  dat
  ?+    pol  ~|(bad-watch-path/pol !!)
      [%web-ui ~]
    (show trove-state-0+!>(state))
  ::
      [%trove host=@ name=@ rest=*]
    =+  host=(slav %p host.pol)
    =+  name=(slav %t name.pol)
    ?+    rest.pol  ~|(bad-trove-watch/pol !!)
      ~               dat
      [%admin ~]      dat
      [%moderator ~]  dat
    ==
  ==
::  +dude: handle on-agent
::
++  dude
  |=  [pol=(pole knot) sig=sign:agent:gall]
  ^+  dat
  ?+    pol  ~|(bad-dude-wire/pol !!)
      [%spaces %updates ~]
    =^  caz  state
      ?+    -.sig  `state
        %kick  sa-abet:sa-peer:sa
        %fact  sa-abet:(sa-dude:sa cage.sig)
      ::
          %watch-ack
        %.  `state
        ?~(p.sig same (slog leaf/"%spaces nack" ~))
      ==
    (emil caz)
  ==
:: +sa: space engine
::
++  sa
  |_  $:  sup=(unit spat)
          mem=members:m
          tam=team
          caz=(list card)
      ==
  +*  sa   .
      dok  [our.bol %spaces]
      adm  (silt `(list role)`[%admin]~)
      mam  (silt `(list role)`~[%admin %moderator %member])
  ++  sa-emit  |=(c=card sa(caz [c caz]))
  ++  sa-emil  |=(lc=(list card) sa(caz (welp lc caz)))
  ++  sa-abet  ^-((quip card _state) [(flop caz) state])
  ::  +sa-show: send web-ui fact
  ++  sa-show
    |=(cag=cage (sa-emit %give %fact [/web-ui]~ cag))
  ::  +sa-peer: watch spaces on /updates
  ::
  ++  sa-peer
    ^+  sa
    %-  sa-emit
    [%pass /spaces/updates %agent dok %watch /updates]
  ::  +sa-czek: check a new spat, local or remote
  ::
  ++  sa-czek
    ^+  sa
    =+  sap=(need sup)
    ?.(=(our.bol p.sap) sa-take sa-make)
  ::  +sa-init: handle initial load from spaces
  ::
  ++  sa-init
    |=  [spa=spaces:s mep=membership:m *]
    ^+  sa
    =+  sal=~(tap by spa)
    |-  ?~  sal  sa
    %=    $
      sal  t.sal
    ::
        sa
      sa-czek(sup `-.i.sal, mem (~(got by mep) -.i.sal))
    ==
  ::  +sa-kill: delete a trove, the space was removed
  ::
  ++  sa-kill
    ^+  sa
    =+  sap=(need sup)
    =+  wir=`path`/(scot %p p.sap)/(scot %t q.sap)
    =/  wires=[path path path]
      =+  head=?:(=(our.bol p.sap) %trove %from)
      :+  head^wir
        head^(snoc wir %admin)
      head^(snoc wir %moderator)
    ?:  =(our.bol p.sap)
      =.  troves  (~(del by troves) sap)
      %-  sa-emit:(sa-show spaces-reaction+!>([%remove sap]))
      [%give %kick [-.wires +<.wires +>.wires ~] ~]
    =*  cad
      |=(p=path [%pass p %agent [p.sap %trove] %leave ~])
    =.  troves  (~(del by troves) sap)
    %-  sa-emil:(sa-show spaces-reaction+!>([%remove sap]))
    [(cad -.wires) (cad +<.wires) (cad +>.wires) ~]
  ::  +sa-take: subscribe to a remote space's trove
  ::
  ++  sa-take
    ^+  sa
    =+  sap=(need sup)
    ?<  =(our.bol p.sap)
    =+  der=[p.sap %trove]
    =*  pem  ~(has in roles:(~(got by mem) our.bol))
    =/  pat=path  /(scot %p p.sap)/(scot %t q.sap)
    =?    sa
        ?&  (pem %admin)
        ::
          ?!  %-  ~(has in wex.bol)
          :_  [%.y trove+(snoc pat %admin)]
          [from+(snoc pat %admin) p.sap dap.bol]
        ==
      %-  sa-emit
      :+  %pass  from+(snoc pat %admin)
      [%agent der %watch trove+(snoc pat %admin)]
    ::
    ?.  ?&  |((pem %member) (pem %admin))
        ::
          ?!  %-  ~(has in wex.bol)
          [[from+pat p.sap dap.bol] [%.y trove+pat]]
        ==
      sa
    %-  sa-emit
    [%pass from+pat %agent der %watch trove+pat]
  ::  +sa-make: create a trove for a local space
  ::
  ++  sa-make
    ^+  sa
    =+  sap=(need sup)
    ?>  =(our.bol p.sap)
    ?:  (~(has by troves) sap)  sa
    =;  tru=[team regs trove]
      sa(troves (~(put by troves) sap tru))
    :*
      ^-  team
      %-  ~(rep by mem)
      |=  [[s=ship m=member:m] t=team]
      ?:  =(our.bol s)  t
      ?:  (~(has in roles.m) %admin)
        %=  t
          admins   (~(put in admins.t) s)
          members  (~(put in members.t) s)
        ==
      ?.  (~(has in roles.m) %member)  t
      t(members (~(put in members.t) s))
    ::
      ^-  regs
      %-  ~(put by *regs)
      [/ [%0 [adm adm adm adm] [mam adm adm adm adm ~]]]
    ::
      *trove
    ==
  ::  +sa-dude: handle spaces-reaction marks
  ::
  ++  sa-dude
    |=  [mar=mark vaz=vase]
    ?+    mar  ~|(bad-dude-mark/mar !!)
        %spaces-reaction
      =/  act=reaction:s  !<(reaction:s vaz)
      ?+    -.act  sa
        %initial  (sa-init +.act)
        %remove   sa-kill(sup `+.act)
      ::
          %add
        sa-czek(sup `path.space.act, mem members.act)
      ==
    ::
        %visa-reaction
      =/  act=reaction:v  !<(reaction:v vaz)
      ?+    -.act  sa
          %kicked
        ?:  =(our.bol ship.act)
          sa(troves (~(del by troves) path.act))
        =+  tov=(~(got by troves) path.act)
        %=    sa
            troves
          %+  ~(put by troves)  path.act
          %=  tov
              admins.team
            (~(del in admins.team.tov) ship.act)
          ::
              members.team
            (~(del in members.team.tov) ship.act)
          ::
              moderators.team
            (~(del in moderators.team.tov) ship.act)
          ==
        ==
      ::
          %invite-accepted
        =+  tov=(~(got by troves) path.act)
        %=    sa
            troves
          %+  ~(put by troves)  path.act
          %=  tov
              admins.team
            ?.  (~(has in roles.member.act) %admin)
              admins.team.tov
            (~(put in admins.team.tov) ship.act)
          ::
              members.team
            ?.  ?|  (~(has in roles.member.act) %member)
                    (~(has in roles.member.act) %admin)
                ==
              members.team.tov
            (~(put in members.team.tov) ship.act)
          ==
        ==
      ==
    ==
  --
--