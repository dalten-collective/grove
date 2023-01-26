::  trove - a pirate's booty.
::        - for holium, w/ love
::        - by quartus <コ:彡 
/-  *trove, m=membership, s=spaces-store, v=visas
/+   dbug, default-agent, verb
|%
::
+$  versioned-state  $%(state-0)
::
+$  state-0  [%0 troves=(map spat [=mods =regs =trove])]
::  boilerplate
::
+$  card  card:agent:gall
--
::
%+  verb  &                                             ::  comment when testing
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
    =^  cards  state  abet:init:eng
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
    =^  cards  state  abet:(load:eng ole)
    [cards this]
  ::
  ++  on-poke
    |=  [mar=mark vaz=vase]
    ~>  %bout.[0 '%trove +on-poke']
    ^-  (quip card _this)
    =^  cards  state  abet:(poke:eng mar vaz)
    [cards this]
  ::
  ++  on-peek
    |=  =path
    ~>  %bout.[0 '%trove +on-peek']
    ^-  (unit (unit cage))
    (peek:eng path)
  ::
  ++  on-agent
    |=  [wir=wire sig=sign:agent:gall]
    ~>  %bout.[0 '%trove +on-agent']
    ^-  (quip card _this)
    =^  cards  state  abet:(dude:eng wir sig)
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
  =^  cards  state  abet:(peer:eng path)
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
++  abet  ^-((quip card _state) [(flop dek) state])
::  +show: send web-ui fact
::
++  show  |=(cag=cage (emit %give %fact [/web-ui]~ cag))
::  +init: handle on-init
::
++  init
  ^+  dat
  =^  cards  state
    sa-abet:sa-view:sa
  (emil cards)
::  +load: handle on-load
::
++  load
  |=  vaz=vase
  ^+  dat
  ?>  ?=([%0 *] q.vaz)
  =.  state  !<(state-0 vaz)
  dat
::  +peek: handle on-peek
::
++  peek
  |=  pol=(pole knot)
  ^-  (unit (unit cage))
  =*  get  ~(got by troves)
  ?+    pol  !!
      [%x %state ~]
    ``trove-state-0+!>(state)
  ::
      [%x %hosts ~]
    ``trove-spaces+!>(`(list spat)`~(tap in ~(key by troves)))
  ::
      [%x %team host=@ space=@ ~]
    =+  sap=[(slav %p host.pol) space.pol]
    =+  to-team:(to-abed:to sap)
    ``trove-teams+!>(`team`[sap admins mods:(get sap) members]~)
  ::
      [%x %teams ~]
    =;  tam=team
      ``trove-teams+!>(tam)
    %+  turn  ~(tap in ~(key by troves))
    |=  sap=spat
    =+  to-team:(to-abed:to sap)
    [sap [admins mods:(get sap) members]]
  ::
      [%x %regs host=@ space=@ ~]
    ``trove-regs+!>(regs:(get [(slav %p host.pol) space.pol]))
  ::
      [%x %folder %perms host=@ space=@ rest=*]
    =+  spa=[(slav %p host.pol) space.pol]
    ``trove-perm+!>(`perm`(to-perm:(to-abed:to spa) rest.pol))
  ::
      [%x %folder host=@ space=@ rest=*]
    =+  tov=trove:(get [(slav %p host.pol) space.pol])
    ``trove-trecht+!>((~(get of `trove`tov) rest.pol))
  ::
      [%x %node host=@ space=@ id=@ rest=*]
    =+  tov=trove:(get [(slav %p host.pol) space.pol])
    ?~  hav=(~(get of `trove`tov) rest.pol)  !!
    ``trove-node+!>(`node`(~(got by u.hav) (slav %uv id.pol)))
  ::
      [%x %tree host=@ space=@ rest=*]
    =+  tov=trove:(get [(slav %p host.pol) space.pol])
    ``trove-tree+!>(`trove`(~(dip of `trove`tov) rest.pol))
  ==
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
    =+  sap=[(slav %p host.pol) (slav %t name.pol)]
    =^  cards  state
      to-abet:(to-peer:to-your:(to-abed:to sap) rest.pol |)
    (emil cards)
  ==
::  +dude: handle on-agent
::
++  dude
  |=  [pol=(pole knot) sig=sign:agent:gall]
  ^+  dat
  =^  cards  state
    ?+    pol  ~|(bad-dude-wire/pol !!)
        [%spaces %updates ~]
      ?+    -.sig  `state
        %kick  sa-abet:sa-view:sa
        %fact  sa-abet:(sa-dude:sa cage.sig)
      ::
          %watch-ack
        %.  `state
        ?~(p.sig same (slog leaf/"%spaces nack" ~))
      ==
    ::
        [%from host=@ name=@ rest=*]
      =+  sap=[(slav %p host.pol) name.pol]
      ?+    -.sig  `state
        %kick  to-abet:to-view:to-your:(to-abed:to sap)
      ::
          %watch-ack
        ?~  p.sig  `state
        `state(troves (~(del by troves) sap))
      ::
          %fact
        ?>  ?=(%trove-fact p.cage.sig)
        =/  act=fact  !<(fact q.cage.sig)
        to-abet:(to-poke:(to-abed:to p.act) act)
      ==
    ==
  (emil cards)
::  +poke: handle on-poke
::
++  poke
  |=  [mar=mark vaz=vase]
  =^  cards  state
    ?+    mar  ~|(bad-trove-mark/mar !!)
        %trove-action
      =/  act=action:^poke  !<(action:^poke vaz)        ::  comment when testing
      :: =/  act=fact:^poke  !<(fact:^poke vaz)         ::  use with tests
      to-abet:(to-poke:to-your:(to-abed:to p.act) act)
    ==
  (emil cards)
::  +sa: space engine
::
++  sa
  |_  $:  sup=(unit spat)
          mem=members:m
          caz=(list card)
      ==
  +*  sa   .
      dok  [our.bol %spaces]
      adm  (silt `(list role)`[%admin]~)
      maa  (silt `(list role)`~[%admin %moderator])
      mam  (silt `(list role)`~[%admin %moderator %member])
  ++  sa-emit  |=(c=card sa(caz [c caz]))
  ++  sa-emil  |=(lc=(list card) sa(caz (welp lc caz)))
  ++  sa-abet  ^-((quip card _state) [(flop caz) state])
  ::  +sa-tire: to-wire without the trouble of reaching.
  ::  
  ++  sa-tire
    =+((need sup) `path`/(scot %p p)/(scot %t q)/(scot %p our.bol))
  ::  +sa-show: send web-ui fact
  ::
  ++  sa-show
    |=(cag=cage (sa-emit %give %fact [/web-ui]~ cag))
  ::  +sa-view: watch spaces on /updates
  ::
  ++  sa-view
    ^+  sa
    %-  sa-emit
    [%pass /spaces/updates %agent dok %watch /updates]
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
      sa-make(sup `-.i.sal, mem (~(got by mep) -.i.sal))
    ==
  ::  +sa-kill: delete a trove, the space was removed
  ::
  ++  sa-kill
    ^+  sa
    =+  sap=(need sup)
    =.  troves  (~(del by troves) sap)
    ?.  =(our.bol p.sap)
      %-  sa-emit:(sa-show spaces-reaction+!>([%remove sap]))
      [%pass from+sa-tire %agent [p.sap %trove] %leave ~]
    =/  paths=(list path)
      %-  ~(rep by sup.bol)
      |=  [(pair duct (pair ship (pole knot))) o=(list path)]
      ?.  ?=([%trove host=@ spat=@ you=@] q.q)  o
      ?.(=(sap [(slav %p host.q.q) (slav %t spat.q.q)]) o [q.q o])
    %.  [%give %kick paths ~]
    sa-emit:(sa-show spaces-reaction+!>([%remove sap]))
  ::  +sa-make: subscribe to remote spaces, create local
  ::
  ++  sa-make
    ^+  sa
    =+  sap=(need sup)
    ?:  &(=(our.bol p.sap) (~(has by troves) sap))  sa
    =;  tru=[regs trove]
      ?:  =(our.bol p.sap)
        sa(troves (~(put by troves) sap ~ tru))
      =+  der=[p.sap %trove]
      =+  hav=(~(got by mem) our.bol)
      =*  pem  ~(has in roles.hav)
      ?.  &((pem %member) =(%joined status.hav))  sa
      ?:  %-  ~(has in wex.bol)  
          [[from+sa-tire p.sap dap.bol] [%.y trove+sa-tire]]
        sa
      %-  sa-emit(troves (~(put by troves) sap ~ tru))
      [%pass from+sa-tire %agent der %watch trove+sa-tire]
    ::
    :_  *trove
    ^-  regs
    ?.  =(our.bol p.sap)  *regs
    %-  ~(put by *regs)
    [/ [%0 [maa maa adm adm] [mam maa maa adm adm ~]]]
  ::  +sa-dude: handle spaces-reaction marks
  ::
  ++  sa-dude
    |=  [mar=mark vaz=vase]
    ?+    mar  ~|(bad-dude-mark/mar !!)
      %visa-reaction  sa
    ::
        %spaces-reaction
      =/  act=reaction:s  !<(reaction:s vaz)
      ?+    -.act  sa
        %initial  (sa-init +.act)
        %remove   sa-kill(sup `+.act)
      ::
          %add
        sa-make(sup `path.space.act, mem members.act)
      ::
          %remote-space
        =.  sup  `path.act
        =/  sap=(pair ship cord)  path.act
        =+  der=[p.sap %trove]
        =+  neu=[*mods *regs *trove]
        ?~  us=(~(get by members.act) our.bol)  sa
        ?.  ?&  =(%joined status.u.us)
                (~(has in roles.u.us) %member)
            ==
          sa
        ?:  %-  ~(has in wex.bol)
            [[from+sa-tire p.sap dap.bol] [%.y trove+sa-tire]]
          sa
        %-  sa-emit(troves (~(put by troves) sap neu))
        [%pass from+sa-tire %agent der %watch trove+sa-tire]
      ==
    ==
  --
::  +to: trove engine
::
++  to
  |_  $:  sup=(unit spat)
          mod=mods
          rag=regs
          tov=trove
          ewe=(set role)
          caz=(list card)
      ==
  +*  space  /(scot %p our.bol)/spaces/(scot %da now.bol)
  ++  to  .
  ++  to-emit  |=(c=card to(caz [c caz]))
  ++  to-emil  |=(lc=(list card) to(caz (welp lc caz)))
  ++  to-abet  ^-((quip card _state) [(flop caz) state])
  ++  to-show  |=(cag=cage (to-emit %give %fact [/web-ui]~ cag))
  ++  to-tire
    =+((need sup) `path`/(scot %p p)/(scot %t q)/(scot %p our.bol))
  ::  +pre-fix: is list prefix
  ++  pre-fix
    |=  [p=trail q=trail]
    ^-  ?
    =+  r=p
    ?~  r  &
    |-(?~(p & ?~(q | ?.(=(i.p i.q) | $(p t.p, q t.q)))))
  ::
  ++  to-abed
    |=  sap=spat
    =+  have=(~(got by troves) sap)                     ::  comment when testing
    :: =/  have                                         ::  use with tests
    ::   ?^  tuv=(~(get by troves) sap)  u.tuv
    ::   [mods=*mods regs=*regs trove=*trove]
    %=  to
      sup  `sap
      mod  mods.have
      rag  regs.have
      tov  trove.have
    ==
  ::  +to-team: scry admins, members
  ++  to-team
    ^-  [admins=(set @p) members=(set @p)]
    ::  [(sy [~zod]~) (sy [~zod]~)]                     ::  use with tests
    =+  (need sup)                                      ::  comment when testing
    =+  teath=/(scot %p p)/[q]/members/noun
    %-  %~  rep  by
        ^-  (map ship member:m)
        =-  ?>(?=([%members *] -) members:-)
        .^(view:m %gx (weld space teath))
    |=  [[k=ship v=member:m] [adm=(set @p) mem=(set @p)]]
    =+  has=~(has in roles.v)
    ?.  |(?=(%joined status.v) ?=(%host status.v))  [adm mem]
    :-  ?.(|((has %admin) (has %owner)) adm (~(put in adm) k))
    ?.(|((has %admin) (has %owner) (has %member)) mem (~(put in mem) k))
  ::  +to-view: watch someone's trove
  ::
  ++  to-view
    ^+  to
    =+  sap=(need sup)
    =+  dok=[p.sap %trove]
    ?.  (~(has in ewe) %member)  to
    %-  to-emit
    [%pass from+to-tire %agent dok %watch trove+to-tire]
  ::  +to-perm: give trail, get last relevant permission
  ::
  ++  to-perm
    |=  t=trail
    ^-  perm
    |-  ?~  t  (~(got by rag) t)
    ?^(hav=(~(get by rag) t) u.hav $(t (snip `trail`t)))
  ::  +fits: give containing perms & sub-perms, nest?
  ::
  ++  fits
    |=  [p=perm q=perm]
    ?&  =(~ (~(dif in add.files.q) add.files.p))
        =(~ (~(dif in edit.files.q) edit.files.p))
        =(~ (~(dif in move.files.q) move.files.p))
        =(~ (~(dif in delete.files.q) delete.files.p))
      ::
        =(~ (~(dif in read.folder.q) read.folder.p))
        =(~ (~(dif in add.folder.q) add.folder.p))
        =(~ (~(dif in edit.folder.q) edit.folder.p))
        =(~ (~(dif in move.folder.q) move.folder.p))
        =(~ (~(dif in delete.folder.q) delete.folder.p))
        =(~ (~(dif in ch-mod.folder.q) ch-mod.folder.p))
    ==
  ::  
  ::  +to-cher: share with your subscribers
  ::
  ++  to-cher
    |=  [[mem=? adm=? mud=?] cag=cage]
    ^+  to
    =;  paths=(list path)
      ?~  paths  to
      (to-emit ^-(card [%give %fact ;;((list path) paths) cag]))
    =/  subscribers=(set @p)
      %-  sy  %+  turn  ~(tap by sup.bol)
      |=((pair duct (pair ship path)) p.q)
    ?:  &(mem adm mud)
      %+  turn  ~(tap in subscribers)
      |=(p=@p `path`trove+(snoc to-tire (scot %p p)))
    =|  who=(set @p)
    =?    who
        mem
      (~(uni in who) members:to-team)
    =?    who
        adm
      (~(uni in who) admins:to-team)
    =?    who
        mud
      (~(uni in who) mod)
    %+  turn  ~(tap in (~(int in who) subscribers))
    |=(p=@p trove+(snoc to-tire (scot %p p)))
  ::  +to-send: send instructions to the host
  ::
  ++  to-send
    |=  [p=spat q=poke:^poke]
    ^+  to
    =+  dok=[p.p %trove]
    =/  wir=path
      /action/(scot %p p.p)/(scot %t q.p)/[-.q]/(scot %da now.bol)
    %-  to-emit
    :^  %pass  wir  %agent
    [dok %poke %trove-action !>(`action:^poke`[p q])]
  ::  +to-your: get src.bol's permissions in a trove
  ::
  ++  to-your
    ^+  to
    =+  sap=(need sup)
    =+  to-team
    %=  to
        ewe
      =?    ewe
          (~(has in admins) src.bol)
        (~(put in ewe) %admin)
      =?    ewe
          (~(has in members) src.bol)
        (~(put in ewe) %member)
      ?.((~(has in mod) src.bol) ewe (~(put in ewe) %moderator))
    ==
  ::  +to-poke: handle pokes and facts, indiscriminately
  ::
  ++  to-poke
    |=  f=fact
    ^+  to
    =+  sap=(need sup)
    ?>  =(p.f sap)
    ?-    -.q.f
         %start
      ?>  =(p.p.f src.bol)
      %.  trove-fact+!>(f)
      %=    to-show
          troves
        %+  ~(put by troves)  sap
        :+  mod
          p.q.f
        =|  tew=trove
        =/  neu=(list [p=path t=tract])
          ~(tap of `trove`q.q.f)
        |-
        ?~  neu  tew
        %=    $
          neu  t.neu
          tew  (~(put of `trove`tew) p.i.neu t.i.neu)
        ==
      ==
    ::
        %add-moderators
      ?>  =(p.sap src.bol)
      =.  +.q.f
        =+  to-team
        %-  sy  %+  murn
          ~(tap in +.q.f)
        |=(p=@p ?.((~(has in members) p) ~ `p))
      =.  troves
        (~(put by troves) sap [(~(uni in mod) +.q.f) rag tov])
      =~  [f=f sap=sap (to-show trove-fact+!>(`fact`f))]
          ?.(=(our.bol p.sap) to (to-cher [& & &] trove-fact+!>(`fact`f)))
      ==
    ::
        %rem-moderators
      ?>  =(p.sap src.bol)
      =.  troves
        (~(put by troves) sap [(~(dif in mod) +.q.f) rag tov])
      =~  [f=f sap=sap (to-show trove-fact+!>(f))]
          ?.(=(our.bol p.sap) to (to-cher [& & &] trove-fact+!>(f)))
      ==
    ::
        %reperm
      =+  perms=(to-perm trail.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.sap src.bol)
              (~(any in ewe) ~(has in ch-mod.folder.perms))
          ==
      |^  ^+  to
        ?.  =(our.bol p.sap)
          ?.  =(our.bol src.bol)  !!  ::  uses start
          ::  an instruction to a remote trove
          (to-show:(to-send p.f q.f) trove-fact+!>(f))
        ::  an instruction to our trove
        ?~  pur.q.f
          =.  troves
            %+  ~(put by troves)  sap
            [mod (~(del by rag) trail.q.f) tov]
          =-  (to-show:- trove-fact+!>(f))
          ^+  to
          %-  ~(rep by sup.bol)
          |=  [(pair duct (pair ship path)) tu=_to]
          (to-peer:tu [/(scot %p p.q)] &)
        ?>  |(=(/ trail.q.f) (fits perms u.pur.q.f))
        =.  troves
          %+  ~(put by troves)  sap
          [mod (chopped trail.q.f u.pur.q.f) tov]
        =-  (to-show:- trove-fact+!>(f))
        ^+  to
        %-  ~(rep by sup.bol)
        |=  [(pair duct (pair ship path)) tu=_to]
        (to-peer:tu [/(scot %p p.q)] &)
      ++  chopped
        |=  [t=trail p=perm]
        ^+  rag
        %.  [`trail`t `perm`p]
        %~  put  by
        ^-  regs
        %-  ~(rep by rag)
        |=  [[k=trail v=perm] o=_rag]
        ?.  (pre-fix t k)  o           ::  ( ͡° ͜ʖ( ͡° ͜ʖ ͡°)
        ?:  (fits p v)  o              ::    ( ͡°( ͡° ͜ʖ ͡°) ͡°)
        (~(put by o) k (screwed p v))  ::       ( ͡° ͜ʖ ͡°)
      ++  screwed
        |=  [p=perm q=perm]
        ^-  perm
        :+  %0
          :^    (~(del in add.files.q) (~(dif in add.files.q) add.files.p))
              (~(del in edit.files.q) (~(dif in edit.files.q) edit.files.p))
            (~(del in move.files.q) (~(dif in move.files.q) move.files.p))
          (~(del in delete.files.q) (~(dif in delete.files.q) delete.files.p))
        ::
        :*  (~(del in read.folder.q) (~(dif in read.folder.q) read.folder.p))
            (~(del in add.folder.q) (~(dif in add.folder.q) add.folder.p))
            (~(del in edit.folder.q) (~(dif in edit.folder.q) edit.folder.p))
            (~(del in move.folder.q) (~(dif in move.folder.q) move.folder.p))
            (~(del in delete.folder.q) (~(dif in delete.folder.q) delete.folder.p))
            (~(del in ch-mod.folder.q) (~(dif in ch-mod.folder.q) ch-mod.folder.p))
        ==
      --
    ::
        %repeat
      =+  hav=(need (~(get of `trove`tov) from.q.f))
      =+  dov=(~(got by troves) `spat`p.to.q.f)
      =+  des=(~(get of `trove`trove.dov) q.to.q.f)
      =+  fer=(to-perm from.q.f)
      =+  ter=(to-perm(rag regs.dov) q.to.q.f)
      =+  nod=(~(got by hav) id.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.sap src.bol)
              (~(any in ewe) ~(has in read.folder.fer))
            ::
              %.  ~(has in add.files.ter)
              =+  to-team:(to-abed p.to.q.f)
              =+  mud=mods:(~(got by troves) p.to.q.f)
              %~  any  in  %-  silt
              %-  murn  :_  same
              ^-  (list (unit role))
              :~  ?.((~(has in admins) our.bol) ~ `%admin)
                  ?.((~(has in members) our.bol) ~ `%member)
                  ?.((~(has in mud) our.bol) ~ `%moderator)
              ==
          ==
      =+  uvt=`@uvTROVE`(sham to.q.f nod)
      =+  nu-f=[p.to.q.f %add-node uvt to.q.f nod]
      ?.  =(our.bol p.sap)
        ?.  =(our.bol src.bol)  !!  :: these are add
        ::  an instruction to a remote trove
        (to-show:(to-send p.f q.f) trove-fact+!>(nu-f))
      ::  an instruction to our trove
      =/  read=[? ? ?]
        =+  red=~(has in read.folder.ter)
        [(red %member) (red %admin) (red %moderator)]
      =-  (to-show:- trove-fact+!>(nu-f))
      %.  [read trove-fact+!>(nu-f)]
      %=  to-cher
          troves
        %+  ~(put by troves)  sap
        :+  mod  rag
        %+  ~(put of `trove`tov)  q.to.q.f
        (~(put by ?~(des *tract u.des)) [uvt nod])
      ==     
    ::
        %add-node
      =+  hav=(~(get of `trove`tov) trail.q.f)
      =+  perms=(to-perm trail.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.sap src.bol)
            ::
              %-  ~(any in ewe)
              |=  r=role
              ?^  hav  (~(has in add.files.perms) r)
              ?&  (~(has in add.files.perms) r)
                  (~(has in add.folder.perms) r)
          ==  ==
      ?.  =(our.bol p.sap)
        ?:  =(our.bol src.bol)
          ::  an instruction to a remote trove
          (to-show:(to-send p.f q.f) trove-fact+!>(f))
        ::  an instruction about their trove
        =+  ole=?~(h=hav *tract u.h)
        %.  trove-fact+!>(f)
        %=    to-show
            troves
          %+  ~(put by troves)  sap
          :+  mod  rag
          %-  ~(put of `trove`tov)
          [trail.q.f (~(put by ole) id.q.f node.q.f)]
        ==
      ::  an instruction to our trove
      =/  read=[? ? ?]
        =+  red=~(has in read.folder.perms)
        [(red %member) (red %admin) (red %moderator)]
      =.  by.dat.node.q.f    src.bol
      =.  from.dat.node.q.f  now.bol
      =?    node.q.f
          ?=(%0v0 id.q.f)
        ?:  =(our.bol src.bol)
          [%record +.node.q.f]
        [%remote +.node.q.f]
      =?    id.q.f
          ?=(%0v0 id.q.f)
        `@uvTROVE`(sham trail.q.f node.q.f)
      =+  nu-f=[p.f %add-node id.q.f trail.q.f node.q.f]
      =-  (to-show:- trove-fact+!>(nu-f))
      %.  [read trove-fact+!>(nu-f)]
      %=    to-cher
          troves
        %+  ~(put by troves)  sap
        :+  mod  rag
        %+  ~(put of `trove`tov)  trail.q.f
        (~(put by ?~(hav *tract u.hav)) [id.q.f node.q.f])
      ==
    ::
        %rem-node
      =+  hav=(need (~(get of `trove`tov) trail.q.f))
      =+  perms=(to-perm trail.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.sap src.bol)
              (~(any in ewe) ~(has in delete.files.perms))
          ==
      ?.  =(our.bol p.sap)
        ?:  =(our.bol src.bol)
          ::  an instruction to a remote trove
          (to-show:(to-send p.f q.f) trove-fact+!>(f))
        ::  an instruction about their trove
        %.  trove-fact+!>(f)
        %=    to-show
            troves
          %+  ~(put by troves)  sap
          :+  mod  rag
          %-  ~(put of `trove`tov)
          [trail.q.f (~(del by hav) id.q.f)]
        ==
      ::  an instruction to our trove
      =/  read=[? ? ?]
        =+  red=~(has in read.folder.perms)
        [(red %member) (red %admin) (red %moderator)]
      =-  (to-show:- trove-fact+!>(f))
      %.  [read trove-fact+!>(f)]
      %=    to-cher
          troves
        %+  ~(put by troves)  sap
        :+  mod  rag
        %-  ~(put of `trove`tov)
        [trail.q.f (~(del by hav) id.q.f)]
      ==
    ::
        %edit-node
      =+  hav=(need (~(get of `trove`tov) trail.q.f))
      =+  perms=(to-perm trail.q.f)
      =+  fil=(~(got by hav) id.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.sap src.bol)
              (~(any in ewe) ~(has in edit.files.perms))
          ==
      ?.  =(our.bol p.sap)
        ?:  =(our.bol src.bol)
          ::  an instruction to a remote trove
          (to-show:(to-send p.f q.f) trove-fact+!>(f))
        ::  an instruction about their trove
        =.  dat.fil
          %=    dat.fil
            title  ?~(tut.q.f title.dat.fil u.tut.q.f)
          ::
              description
            ?~(dus.q.f description.dat.fil u.dus.q.f)
          ==
        %.  trove-fact+!>(f)
        %=  to-show
            troves
          %+  ~(put by troves)  sap
          :+  mod  rag
          %+  ~(put of `trove`tov)  trail.q.f
          (~(put by hav) id.q.f fil)
        ==
      ::  an instruction to our trove
      =/  read=[? ? ?]
        =+  red=~(has in read.folder.perms)
        [(red %member) (red %admin) (red %moderator)]
      =.  dat.fil
        %=    dat.fil
          title  ?~(tut.q.f title.dat.fil u.tut.q.f)
        ::
            description
          ?~(dus.q.f description.dat.fil u.dus.q.f)
        ==
      =-  (to-show:- trove-fact+!>(f))
      %.  [read trove-fact+!>(f)]
      %=    to-cher
          troves
        %+  ~(put by troves)  sap
        :+  mod  rag
        %+  ~(put of `trove`tov)  trail.q.f
        (~(put by hav) id.q.f fil)
      ==
    ::
        %move-node
      =+  hav=(need (~(get of `trove`tov) from.q.f))
      =+  des=(need (~(get of `trove`tov) to.q.f))
      =+  fer=(to-perm from.q.f)
      =+  ter=(to-perm to.q.f)
      =+  nod=(~(got by hav) id.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.sap src.bol)
            ::
              %-  ~(any in ewe)
              |=  r=role
              ?&  (~(has in move.files.fer) r)
                  (~(has in add.files.ter) r)
          ==  ==
      ?.  =(our.bol p.sap)
        ?.  =(our.bol src.bol)  !!  :: uses rem, add
        ::  an instruction to a remote trove
        =~
          :-  [f=f nod=nod]  
          %.  trove-fact+!>([p.f [%rem-node id.q.f from.q.f]])
          to-show:(to-send p.f q.f(id `@uvTROVE`(sham to.q.f nod)))
        ::
          %-  to-show
          :-  %trove-fact
          !>([p.f [%add-node (sham to.q.f nod) to.q.f nod]])
        ==
      ::  an instruction to our trove
      =+  uvt=`@uvTROVE`(sham to.q.f nod)
      =/  read=(pair [? ? ?] [? ? ?])
        =+  red=~(has in read.folder.fer)
        =+  ted=~(has in read.folder.ter)
        :-  [(red %member) (red %admin) (red %moderator)]
        [(ted %member) (ted %admin) (ted %moderator)]
      =.  troves
        %+  ~(put by troves)  sap
        :+  mod  rag
        %.  [from.q.f (~(del by hav) id.q.f)]
        %~  put  of
        ^-  trove
        %+  ~(put of `trove`tov)  to.q.f
        (~(put by des) [uvt nod])
      =~  :-  [f=f read=read nod=nod uvt=uvt]
          %+  to-cher  p.read
          trove-fact+!>([p.f %rem-node id.q.f from.q.f])
        ::
          %+  to-cher:(to-show trove-fact+!>(f))  q.read
          trove-fact+!>([p.f %add-node uvt to.q.f nod])
      ==
    ::
        %add-folder
      ?>  ((sane %tas) nam.q.f)
      =.  trail.q.f  (snoc trail.q.f nam.q.f)
      =+  perms=(to-perm trail.q.f)
      ?>  ?|  =(~ (~(get of `trove`tov) trail.q.f))
              =(our.bol src.bol)
              =(p.sap src.bol)
              (~(any in ewe) ~(has in add.folder.perms))
          ==
      ?.  =(our.bol p.sap)
        ?:  =(our.bol src.bol)
          ::  an instruction to a remote trove
          (to-show:(to-send p.f q.f) trove-fact+!>(f))
        ::  an instruction about their trove
        ?>  =(p.sap src.bol)
        %.  trove-fact+!>(`fact`[p.f q.f])
        %=    to-show
            troves
          %+  ~(put by troves)  sap
          :-  mod
          :_  (~(put of `trove`tov) trail.q.f *tract)
          ?~(p=pur.q.f rag (~(put by rag) trail.q.f u.p))
        ==
      :: an instruction to our trove
      =/  read=[? ? ?]
        =/  red
          %~  has  in
          ?~(p=pur.q.f read.folder.perms read.folder.u.p)
        [(red %member) (red %admin) (red %moderator)]
      ?>  ?~(p=pur.q.f & (fits perms u.p))
      =-  (to-show:- trove-fact+!>(f))
      %.  [read trove-fact+!>(f)]
      %=    to-cher
          troves
        %+  ~(put by troves)  sap
        :+  mod
          ?~(p=pur.q.f rag (~(put by rag) trail.q.f u.p))
        (~(put of `trove`tov) trail.q.f *tract)
      ==
    ::
        %rem-folder
      =+  perms=(to-perm trail.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.sap src.bol)
          ::
            (~(any in ewe) ~(has in delete.folder.perms))
          ==
      =/  duds=regs
        %-  malt
        %+  murn  ~(tap by rag)
        |=  (pair trail perm)
        ?:((pre-fix trail.q.f p) ~ `[p q])
      ?.  =(our.bol p.sap)
        ?:  =(our.bol src.bol)
          ::  an instruction to a remote trove
          (to-show:(to-send p.f q.f) trove-fact+!>(f))
        ::  an instruction about their trove
        ?>  =(p.sap src.bol)
        %.  trove-fact+!>(`fact`[p.f q.f])
        %=    to-show
            troves
          %+  ~(put by troves)  sap
          [mod duds (~(lop of `trove`tov) trail.q.f)]
        ==
      ::  an instruction to our trove
      =/  read=[? ? ?]
        =+  red=~(has in read.folder.perms)
        [(red %member) (red %admin) (red %moderator)]
      =-  (to-show:- trove-fact+!>(f))
      %.  [read trove-fact+!>(f)]
      %=  to-cher
         troves
        %+  ~(put by troves)  sap
        [mod duds (~(lop of `trove`tov) trail.q.f)]
      ==
    ::
        %move-folder
      =+  fer=(to-perm from.q.f)                        ::  from
      =+  ter=(to-perm to.q.f)                          ::  to
      ?>  ?|  ?=(~ (~(get of `trove`tov) to.q.f))
              =(our.bol src.bol)
              =(p.sap src.bol)
              !=(/ from.q.f)
              %-  ~(any in ewe)
              |=  r=role
              ?&  (~(has in move.folder.fer) r)
                  (~(has in add.folder.ter) r)
          ==  ==
      =/  hold=trove
        (~(dip of `trove`tov) from.q.f)
      ?:  ?=([~ ~] hold)  to
      ?.  =(our.bol p.sap)
        ?.  =(our.bol src.bol)  !!  ::  uses add, rem
        ::  an instruction to a remote trove
        %-  to-show:(to-send p.f q.f)
        trove-fact+!>(`fact`[p.f q.f])
      ::  an instruction to our trove
      =/  perms=(unit perm)
        ?.((fits fer ter) ~ ?:(=(fer ter) ~ `ter))
      =+  held=~(tap of `trove`hold)
      =|  tu=_to

      =.  tu
        =~  [f=f (to-show:tu trove-fact+!>(f))]
            %+  to-cher  [& & &]
            trove-fact+!>([p.f %rem-folder from.q.f])
        ==
      =+  tuv=(~(lop of `trove`tov) from.q.f)
      =+  pre=/[(rear from.q.f)]
      |-
      ?~  held
        ^+  to
        tu(troves (~(put by troves) sap [mod rag tuv]))
      =+  nex=`path`:(welp to.q.f pre p.i.held)
      =.  tuv
        (~(put of `trove`tuv) [nex q.i.held])
      =?    rag
          !?=(~ (~(get by rag) (welp from.q.f p.i.held)))
        =+  hav=(~(got by rag) (welp from.q.f p.i.held))
        ?.  (fits ?~(perms ter u.perms) hav)
          (~(del by rag) (welp from.q.f p.i.held))
        ?:  ?~(perms %.n =(u.perms hav))
          (~(del by rag) (welp from.q.f p.i.held))
        %.  [(welp to.q.f p.i.held) hav]
        ~(put by `regs`(~(del by rag) (welp from.q.f p.i.held)))
      =/  read=[? ? ?]
        =+  red=~(has in read.folder:(to-perm nex))
        [(red %member) (red %admin) (red %moderator)]
      %=    $
        held  t.held
      ::
          tu
        =~  :-  [f=f nex=nex read=read]
            ^+  to
            %-  ~(rep by q.i.held)
            |=  [(pair id node) tw=_tu]
            %+  to-cher:tw  read
            trove-fact+!>([p.f %add-node p nex q])
          ::
            %+  to-cher  read
            :-  %trove-fact
            !>  ^-  fact
            :-  p.f
            :-  %add-folder
            [(snip nex) (rear nex) (~(get by rag) nex)]
        ==
      ==
    ==
  ::  +to-peer: handle on-watch for trove data
  ::
  ++  to-peer
    |=  [rest=(pole knot) re=?]
    ^+  to
    =+  you=`@p`?>(?=([who=@ ~] rest) (slav %p who.rest))
    ?>  |(=(you src.bol) =(our.bol src.bol))
    =.  to-your  to-your(src.bol you)
    =/  pat=(list path)
      ?.(re ~ [trove+(snoc to-tire (scot %p you))]~)
    |^  stat
    ::
    ++  stat
      ^+  to
      %-  to-emit
      [%give %fact pat trove-fact+!>([(need sup) %start tove])]
    ::
    ++  tove
      ^-  [regs trove]
      =/  leto=(list [trail tract])  ~(tap of `trove`tov)
      =|  truv=trove
      |-
      ?~  leto
        :_  truv
        %-  malt  %+  murn  ~(tap by rag)
        |=  [t=trail p=perm]
        ?.((~(any in ewe) ~(has in read.folder.p)) ~ `[t p])
      ::
      =+  nerm=(to-perm -.i.leto)
      =+  perms=(~(any in ewe) ~(has in read.folder.nerm))
      %=    $
        leto  t.leto
        truv  ?.(perms truv (~(put of `trove`truv) i.leto))
      ==
    --
  --
--