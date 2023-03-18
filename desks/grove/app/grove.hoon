::  grove - a file explorer
::        - by quartus <コ:彡 
/-  *grove, g=groups
/+   dbug, default-agent, verb
|%
::
+$  versioned-state  $%(state-0)
::
+$  state-0  [%0 groves=(map flag:g [=mods =regs =grove])]
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
    ~>  %bout.[0 '%grove +on-init']
    =^  cards  state  abet:init:eng
    [cards this]
  ::
  ++  on-save
    ^-  vase
    ~>  %bout.[0 '%grove +on-save']
    !>(state)
  ::
  ++  on-load
    |=  ole=vase
    ~>  %bout.[0 '%grove +on-load']
    ^-  (quip card _this)
    =^  cards  state  abet:(load:eng ole)
    [cards this]
  ::
  ++  on-poke
    |=  [mar=mark vaz=vase]
    ~>  %bout.[0 '%grove +on-poke']
    ^-  (quip card _this)
    =^  cards  state  abet:(poke:eng mar vaz)
    [cards this]
  ::
  ++  on-peek
    |=  =path
    ~>  %bout.[0 '%grove +on-peek']
    ^-  (unit (unit cage))
    (peek:eng path)
  ::
  ++  on-agent
    |=  [wir=wire sig=sign:agent:gall]
    ~>  %bout.[0 '%grove +on-agent']
    ^-  (quip card _this)
    =^  cards  state  abet:(dude:eng wir sig)
    [cards this]
  ::
  ++  on-arvo
    |=  [wir=wire sig=sign-arvo]
    ~>  %bout.[0 '%grove +on-arvo']
    ^-  (quip card _this)
    `this
  ::
  ++  on-watch
  |=  =path
  ~>  %bout.[0 '%grove +on-watch']
  ^-  (quip card _this)
  =^  cards  state  abet:(peer:eng path)
  [cards this]
  ::
  ++  on-fail
    ~>  %bout.[0 '%grove +on-fail']
    on-fail:def
  ::
  ++  on-leave
    ~>  %bout.[0 '%grove +on-init']
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
    go-abet:go-init:go-view:gorp
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
  =*  get  ~(got by groves)
  ?+    pol  !!
      [%x %state ~]
    ``grove-state-0+!>(state)
  ::
      [%x %hosts ~]
    ``grove-groups+!>(`(list flag)`~(tap in ~(key by groves)))
  ::
      [%x %team host=@ group=@ ~]
    =+  gap=[(slav %p host.pol) (slav %tas group.pol)]
    =+  to-team:(to-abed:to gap)
    ``grove-teams+!>(`team`[gap admins mods:(get gap) members]~)
  ::
      [%x %teams ~]
    =;  tam=team
      ``grove-teams+!>(tam)
    %+  turn  ~(tap in ~(key by groves))
    |=  gap=flag
    =+  to-team:(to-abed:to gap)
    [gap [admins mods:(get gap) members]]
  ::
      [%x %regs host=@ group=@ ~]
    ``grove-regs+!>(regs:(get [(slav %p host.pol) (slav %tas group.pol)]))
  ::
      [%x %folder %perms host=@ group=@ rest=*]
    =+  gap=`flag`[(slav %p host.pol) (slav %tas group.pol)]
    ``grove-perm+!>(`perm`(to-perm:(to-abed:to gap) rest.pol))
  ::
      [%x %folder host=@ group=@ rest=*]
    =+  gov=grove:(get [(slav %p host.pol) (slav %tas group.pol)])
    ``grove-trecht+!>((~(get of `grove`gov) rest.pol))
  ::
      [%x %node host=@ group=@ id=@ rest=*]
    =+  gov=grove:(get [(slav %p host.pol) (slav %tas group.pol)])
    ?~  hav=(~(get of `grove`gov) rest.pol)  !!
    ``grove-node+!>(`node`(~(got by u.hav) (slav %uv id.pol)))
  ::
      [%x %tree host=@ group=@ rest=*]
    =+  gov=grove:(get [(slav %p host.pol) (slav %tas group.pol)])
    ``grove-tree+!>(`grove`(~(dip of `grove`gov) rest.pol))
  ==
::  +peer: handle on-watch 
::
++  peer
  |=  pol=(pole knot)
  ^+  dat
  ?+    pol  ~|(bad-watch-path/pol !!)
      [%web-ui ~]
    (show grove-state-0+!>(state))
  ::
      [%grove host=@ name=@ rest=*]
    =+  gop=[(slav %p host.pol) (slav %tas name.pol)]
    =^  cards  state
      to-abet:(to-peer:to-your:(to-abed:to gop) rest.pol |)
    (emil cards)
  ==
::  +dude: handle on-agent
::
++  dude
  |=  [pol=(pole knot) sig=sign:agent:gall]
  ^+  dat
  =^  cards  state
    ?+    pol  ~|(bad-dude-wire/pol !!)
        [%groups %updates ~]
      ?+    -.sig  `state
        %kick  go-abet:go-view:gorp
        %fact  go-abet:(go-dude:gorp cage.sig)
      ::
          %watch-ack
        %.  `state
        ?~(p.sig same (slog 'grove-panic-groups-nack' ~))
      ==
    ::
        [%from host=@ name=@ ~]
      =+  gop=[(slav %p host.pol) (slav %tas name.pol)]
      ?+    -.sig  `state
          %kick
        =.  src.bol  our.bol
        to-abet:to-view:to-your:(to-abed:to gop)
      ::
          %watch-ack
        ?~  p.sig  `state
        `state(groves (~(del by groves) gop))
      ::
          %fact
        ?>  ?=(%grove-fact p.cage.sig)
        =/  act=fact  !<(fact q.cage.sig)
        to-abet:(to-poke:(to-abed:to p.act) act)
      ==
    ==
  (emil cards)
::  +poke: handle on-poke
::
++  poke
  |=  [mar=mark vaz=vase]
  ?:  ?=(%noun mar)
    (emit %give %kick [/grove/(scot %p ~zod)/test/(scot %p ~wet)]~ ~)
  =^  cards  state
    ?+    mar  ~|(bad-grove-mark/mar !!)
        %grove-action
      =/  act=action:^poke  !<(action:^poke vaz)        ::  comment when testing
      :: =/  act=fact:^poke  !<(fact:^poke vaz)         ::  use with tests
      to-abet:(to-poke:to-your:(to-abed:to p.act) act)
    ==
  (emil cards)
::  +gorp: handle groups actions
::
++  gorp
  |_  $:  gup=(unit flag:g)
          mem=(map ship vessel:fleet:g)
          caz=(list card)
      ==
  +*  go   .
      dok  [our.bol %groups]
      gap  /(scot %p our.bol)/groups/(scot %da now.bol)
      adm  (silt `(list role)`[%admin]~)
      maa  (silt `(list role)`~[%admin %moderator])
      mam  (silt `(list role)`~[%admin %moderator %member])
  ++  go-emit  |=(c=card go(caz [c caz]))
  ++  go-emil  |=(lc=(list card) go(caz (welp lc caz)))
  ++  go-abet  ^-((quip card _state) [(flop caz) state])
  ::  +go-tire: to-wire without the trouble of reaching
  ::
  ++  go-tire
    =+((need gup) `path`/(scot %p p)/(scot %tas q))
  ::  +go-show: send web-ui facts
  ::
  ++  go-show
    |=(cag=cage (go-emit %give %fact [/web-ui]~ cag))
  ::  +go-view: watch groups on /groups
  ::
  ++  go-view
    ^+  go
    (go-emit %pass /groups/updates %agent dok %watch /groups)
  ::  +go-init: perform initial load
  ::
  ++  go-init
    ^+  go
    =/  gal=(list [f=flag g=group:g])
      ~(tap by .^(groups:g %gx (welp gap /groups/noun)))
    |-  ?~  gal  go
    %=    $
      gal  t.gal
      go   go-make(gup `f.i.gal, mem fleet.g.i.gal)
    ==
  ::  +go-kill: delete a grove, the group was removed
  ::
  ++  go-kill
    ^+  go
    =+  gop=(need gup)
    =.  groves  (~(del by groves) gop)
    ?.  =(our.bol p.gop)
      %-  go-emit:(go-show grove-gone+!>([%del gop]))
      [%pass from+go-tire %agent [p.gop %grove] %leave ~]
    =/  paths=(list path)
      %-  ~(rep by sup.bol)
      |=  [(pair duct (pair ship (pole knot))) o=(list path)]
      ?.  ?=([%grove ship=@ term=@ you=@] q.q)  o
      ?.(=(gop [(slav %p ship.q.q) (slav %tas term.q.q)]) o [q.q o])
    %.  [%give %kick paths ~]
    go-emit:(go-show grove-gone+!>([%del gop]))
  ::  +go-make: subscribe to remote groves, create local
  ++  go-make
    ^+  go
    =+  gop=(need gup)
    ?:  &(=(our.bol p.gop) (~(has by groves) gop))  go
    =;  tru=[regs grove]
      ?:  =(our.bol p.gop)
        go(groves (~(put by groves) gop ~ tru))
      =+  der=[p.gop %grove]
      =+  hav=(~(got by mem) our.bol)
      =*  pem  ~(has in sects.hav)
      ?.  (gth joined.hav *@da)
        go
      ?:  %-  ~(has in wex.bol)
          :-  [from+go-tire p.gop dap.bol]
          [%.y (snoc go-tire (scot %p our.bol))]
        go
      %-  go-emit(groves (~(put by groves) gop ~ tru))
      :^  %pass  from+go-tire  %agent
      [der %watch grove+(snoc go-tire (scot %p our.bol))]
    ::
    :_  *grove
    ^-  regs
    ?.  =(our.bol p.gop)  *regs
    %-  ~(put by *regs)
    [/ [%0 [maa maa adm adm] [mam maa maa adm adm ~]]]
  ::  +go-dude: handle group-action-0 marks
  ::
  ++  go-dude
    |=  [mar=mark vaz=vase]
    ?.  ?=(%group-action-0 mar)  go
    =+  act=!<(action:g vaz)
    ?+    -.q.q.act  go
      %del     go-kill(gup `p.act)
      %create  go-make(gup `p.act)
    ==
  --
::  +to: grove engine
::
++  to
  |_  $:  gup=(unit flag:g)
          mod=mods
          rag=regs
          gov=grove
          ewe=(set role)
          caz=(list card)
      ==
  +*  group  /[our]/groups/[now]
  ++  to  .
  ++  to-emit  |=(c=card to(caz [c caz]))
  ++  to-emil  |=(lc=(list card) to(caz (welp lc caz)))
  ++  to-abet  ^-((quip card _state) [(flop caz) state])
  ++  to-show  |=(cag=cage (to-emit %give %fact [/web-ui]~ cag))
  ++  to-tire
    =+((need gup) `path`/(scot %p p)/(scot %tas q))
  ::  +pre-fix: is list prefix
  ++  pre-fix
    |=  [p=trail q=trail]
    ^-  ?
    =+  r=p
    ?~  r  &
    |-(?~(p & ?~(q | ?.(=(i.p i.q) | $(p t.p, q t.q)))))
  ::
  ++  to-abed
    |=  gap=flag
    =+  have=(~(got by groves) gap)                     ::  comment when testing
    :: =/  have                                         ::  use with tests
    ::   ?^  tuv=(~(get by groves) gap)  u.tuv
    ::   [mods=*mods regs=*regs grove=*grove]
    %=  to
      gup  `gap
      mod  mods.have
      rag  regs.have
      gov  grove.have
    ==
  ::  +to-team: scry admins, members
  ++  to-team
    ^-  [admins=(set @p) members=(set @p)]
    ::  [(sy [~zod]~) (sy [~zod]~)]                     ::  use with tests
    =/  groups=groups:g                                 ::  comment when testing
      .^(groups:g %gx (welp group /groups/noun))
    =/  fleet=fleet:g
      fleet:(~(got by groups) (need gup))
    %-  ~(rep by fleet)
    |=  $:  [k=ship v=[s=(set sect:g) t=time]]
            [adm=(set @p) mem=(set @p)]
        ==
    =*  has  ~(has in s.v)
    ?:  =(*@da t.v)  [adm mem]
    :-  ?.((has %admin) adm (~(put in adm) k))
    ?.(|((has %admin) (gth t.v *@da)) mem (~(put in mem) k))
  ::  +to-view: watch someone's grove
  ::
  ++  to-view
    ^+  to
    =+  gap=(need gup)
    =+  dok=[p.gap %grove]
    ?.  (~(has in ewe) %member)  to
    %-  to-emit
    :^  %pass  from+to-tire  %agent
    [dok %watch grove+(snoc to-tire (scot %p our.bol))]
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
      |=(p=@p `path`grove+(snoc to-tire (scot %p p)))
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
    |=(p=@p grove+(snoc to-tire (scot %p p)))
  ::  +to-send: send instructions to the host
  ::
  ++  to-send
    |=  [p=flag q=poke:^poke]
    ^+  to
    =+  dok=[p.p %grove]
    =/  wir=path
      /action/(scot %p p.p)/(scot %tas q.p)/[-.q]/(scot %da now.bol)
    %-  to-emit
    :^  %pass  wir  %agent
    [dok %poke %grove-action !>(`action:^poke`[p q])]
  ::  +to-your: get src.bol's permissions in a grove
  ::
  ++  to-your
    ^+  to
    =+  to-team
    %=  to
        ewe
      =?    ewe
          ?|  (~(has in admins) src.bol)
              =(p:(need gup) src.bol)
          ==
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
    =+  gap=(need gup)
    ?>  =(p.f gap)
    ?-    -.q.f
         %start
      ?>  =(p.p.f src.bol)
      %.  grove-fact+!>(f)
      %=    to-show
          groves
        %+  ~(put by groves)  gap
        :+  mod
          p.q.f
        =|  tew=grove
        =/  neu=(list [p=path t=tract])
          ~(tap of `grove`q.q.f)
        |-
        ?~  neu  tew
        %=    $
          neu  t.neu
          tew  (~(put of `grove`tew) p.i.neu t.i.neu)
        ==
      ==
    ::
        %add-moderators
      ?>  =(p.gap src.bol)
      =.  +.q.f
        =+  to-team
        %-  sy  %+  murn
          ~(tap in +.q.f)
        |=(p=@p ?.((~(has in members) p) ~ `p))
      =.  groves
        (~(put by groves) gap [(~(uni in mod) +.q.f) rag gov])
      =~  [f=f gap=gap (to-show grove-fact+!>(`fact`f))]
          ?.(=(our.bol p.gap) to (to-cher [& & &] grove-fact+!>(`fact`f)))
      ==
    ::
        %rem-moderators
      ?>  =(p.gap src.bol)
      =.  groves
        (~(put by groves) gap [(~(dif in mod) +.q.f) rag gov])
      =~  [f=f gap=gap (to-show grove-fact+!>(f))]
          ?.(=(our.bol p.gap) to (to-cher [& & &] grove-fact+!>(f)))
      ==
    ::
        %reperm
      =+  perms=(to-perm trail.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.gap src.bol)
              (~(any in ewe) ~(has in ch-mod.folder.perms))
          ==
      |^  ^+  to
        ?.  =(our.bol p.gap)
          ?.  =(our.bol src.bol)  !!  ::  uses start
          ::  an instruction to a remote grove
          (to-show:(to-send p.f q.f) grove-fact+!>(f))
        ::  an instruction to our grove
        ?~  pur.q.f
          =.  groves
            %+  ~(put by groves)  gap
            [mod (~(del by rag) trail.q.f) gov]
          =-  (to-show:- grove-fact+!>(f))
          ^+  to
          %-  ~(rep by sup.bol)
          |=  [(pair duct (pair ship path)) tu=_to]
          (to-peer:tu [/(scot %p p.q)] &)
        ?>  |(=(/ trail.q.f) (fits perms u.pur.q.f))
        =.  groves
          %+  ~(put by groves)  gap
          [mod (chopped trail.q.f u.pur.q.f) gov]
        =-  (to-show:- grove-fact+!>(f))
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
      =+  hav=(need (~(get of `grove`gov) from.q.f))
      =+  dov=(~(got by groves) `flag`p.to.q.f)
      =+  des=(~(get of `grove`grove.dov) q.to.q.f)
      =+  fer=(to-perm from.q.f)
      =+  ter=(to-perm(rag regs.dov) q.to.q.f)
      =+  nod=(~(got by hav) id.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.gap src.bol)
              (~(any in ewe) ~(has in read.folder.fer))
            ::
              %.  ~(has in add.files.ter)
              =+  to-team:(to-abed p.to.q.f)
              =+  mud=mods:(~(got by groves) p.to.q.f)
              %~  any  in  %-  silt
              %-  murn  :_  same
              ^-  (list (unit role))
              :~  ?.((~(has in admins) our.bol) ~ `%admin)
                  ?.((~(has in members) our.bol) ~ `%member)
                  ?.((~(has in mud) our.bol) ~ `%moderator)
              ==
          ==
      =+  uvt=`@uvGROVE`(sham to.q.f nod)
      =+  nu-f=[p.to.q.f %add-node uvt to.q.f nod]
      ?.  =(our.bol p.gap)
        ?.  =(our.bol src.bol)  !!  :: these are add
        ::  an instruction to a remote grove
        (to-show:(to-send p.f q.f) grove-fact+!>(nu-f))
      ::  an instruction to our grove
      =/  read=[? ? ?]
        =+  red=~(has in read.folder.ter)
        [(red %member) (red %admin) (red %moderator)]
      =-  (to-show:- grove-fact+!>(nu-f))
      %.  [read grove-fact+!>(nu-f)]
      %=  to-cher
          groves
        %+  ~(put by groves)  gap
        :+  mod  rag
        %+  ~(put of `grove`gov)  q.to.q.f
        (~(put by ?~(des *tract u.des)) [uvt nod])
      ==     
    ::
        %add-node
      =+  hav=(~(get of `grove`gov) trail.q.f)
      =+  perms=(to-perm trail.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.gap src.bol)
            ::
              %-  ~(any in ewe)
              |=  r=role
              ?^  hav  (~(has in add.files.perms) r)
              ?&  (~(has in add.files.perms) r)
                  (~(has in add.folder.perms) r)
          ==  ==
      ?.  =(our.bol p.gap)
        ?:  =(our.bol src.bol)
          ::  an instruction to a remote grove
          (to-show:(to-send p.f q.f) grove-fact+!>(f))
        ::  an instruction about their grove
        =+  ole=?~(h=hav *tract u.h)
        %.  grove-fact+!>(f)
        %=    to-show
            groves
          %+  ~(put by groves)  gap
          :+  mod  rag
          %-  ~(put of `grove`gov)
          [trail.q.f (~(put by ole) id.q.f node.q.f)]
        ==
      ::  an instruction to our grove
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
        `@uvGROVE`(sham trail.q.f node.q.f)
      =+  nu-f=[p.f %add-node id.q.f trail.q.f node.q.f]
      =-  (to-show:- grove-fact+!>(nu-f))
      %.  [read grove-fact+!>(nu-f)]
      %=    to-cher
          groves
        %+  ~(put by groves)  gap
        :+  mod  rag
        %+  ~(put of `grove`gov)  trail.q.f
        (~(put by ?~(hav *tract u.hav)) [id.q.f node.q.f])
      ==
    ::
        %rem-node
      =+  hav=(need (~(get of `grove`gov) trail.q.f))
      =+  perms=(to-perm trail.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.gap src.bol)
              (~(any in ewe) ~(has in delete.files.perms))
          ==
      ?.  =(our.bol p.gap)
        ?:  =(our.bol src.bol)
          ::  an instruction to a remote grove
          (to-show:(to-send p.f q.f) grove-fact+!>(f))
        ::  an instruction about their grove
        %.  grove-fact+!>(f)
        %=    to-show
            groves
          %+  ~(put by groves)  gap
          :+  mod  rag
          %-  ~(put of `grove`gov)
          [trail.q.f (~(del by hav) id.q.f)]
        ==
      ::  an instruction to our grove
      =/  read=[? ? ?]
        =+  red=~(has in read.folder.perms)
        [(red %member) (red %admin) (red %moderator)]
      =-  (to-show:- grove-fact+!>(f))
      %.  [read grove-fact+!>(f)]
      %=    to-cher
          groves
        %+  ~(put by groves)  gap
        :+  mod  rag
        %-  ~(put of `grove`gov)
        [trail.q.f (~(del by hav) id.q.f)]
      ==
    ::
        %edit-node
      =+  hav=(need (~(get of `grove`gov) trail.q.f))
      =+  perms=(to-perm trail.q.f)
      =+  fil=(~(got by hav) id.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.gap src.bol)
              (~(any in ewe) ~(has in edit.files.perms))
          ==
      ?.  =(our.bol p.gap)
        ?:  =(our.bol src.bol)
          ::  an instruction to a remote grove
          (to-show:(to-send p.f q.f) grove-fact+!>(f))
        ::  an instruction about their grove
        =.  dat.fil
          %=    dat.fil
            title  ?~(tut.q.f title.dat.fil u.tut.q.f)
          ::
              description
            ?~(dus.q.f description.dat.fil u.dus.q.f)
          ==
        %.  grove-fact+!>(f)
        %=  to-show
            groves
          %+  ~(put by groves)  gap
          :+  mod  rag
          %+  ~(put of `grove`gov)  trail.q.f
          (~(put by hav) id.q.f fil)
        ==
      ::  an instruction to our grove
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
      =-  (to-show:- grove-fact+!>(f))
      %.  [read grove-fact+!>(f)]
      %=    to-cher
          groves
        %+  ~(put by groves)  gap
        :+  mod  rag
        %+  ~(put of `grove`gov)  trail.q.f
        (~(put by hav) id.q.f fil)
      ==
    ::
        %move-node
      =+  hav=(need (~(get of `grove`gov) from.q.f))
      =+  des=(need (~(get of `grove`gov) to.q.f))
      =+  fer=(to-perm from.q.f)
      =+  ter=(to-perm to.q.f)
      =+  nod=(~(got by hav) id.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.gap src.bol)
            ::
              %-  ~(any in ewe)
              |=  r=role
              ?&  (~(has in move.files.fer) r)
                  (~(has in add.files.ter) r)
          ==  ==
      ?.  =(our.bol p.gap)
        ?.  =(our.bol src.bol)  !!  :: uses rem, add
        ::  an instruction to a remote grove
        =~
          :-  [f=f nod=nod]  
          %.  grove-fact+!>([p.f [%rem-node id.q.f from.q.f]])
          to-show:(to-send p.f q.f(id `@uvGROVE`(sham to.q.f nod)))
        ::
          %-  to-show
          :-  %grove-fact
          !>([p.f [%add-node (sham to.q.f nod) to.q.f nod]])
        ==
      ::  an instruction to our grove
      =+  uvt=`@uvGROVE`(sham to.q.f nod)
      =/  read=(pair [? ? ?] [? ? ?])
        =+  red=~(has in read.folder.fer)
        =+  ted=~(has in read.folder.ter)
        :-  [(red %member) (red %admin) (red %moderator)]
        [(ted %member) (ted %admin) (ted %moderator)]
      =.  groves
        %+  ~(put by groves)  gap
        :+  mod  rag
        %.  [from.q.f (~(del by hav) id.q.f)]
        %~  put  of
        ^-  grove
        %+  ~(put of `grove`gov)  to.q.f
        (~(put by des) [uvt nod])
      =~  :-  [f=f read=read nod=nod uvt=uvt]
          %+  to-cher  p.read
          grove-fact+!>([p.f %rem-node id.q.f from.q.f])
        ::
          %+  to-cher:(to-show grove-fact+!>(f))  q.read
          grove-fact+!>([p.f %add-node uvt to.q.f nod])
      ==
    ::
        %add-folder
      ?>  ((sane %tas) nam.q.f)
      =+  perms=(to-perm trail.q.f)
      ?>  ?|  =(~ (~(get of `grove`gov) trail.q.f))
              =(our.bol src.bol)
              =(p.gap src.bol)
              (~(any in ewe) ~(has in add.folder.perms))
          ==
      ?.  =(our.bol p.gap)
        ?:  =(our.bol src.bol)
          ::  an instruction to a remote grove
          (to-show:(to-send p.f q.f) grove-fact+!>(f))
        ::  an instruction about their grove
        ?>  =(p.gap src.bol)
        %.  grove-fact+!>(`fact`[p.f q.f])
        =.  trail.q.f  (snoc trail.q.f nam.q.f)
        %=    to-show
            groves
          %+  ~(put by groves)  gap
          :-  mod
          :_  (~(put of `grove`gov) trail.q.f *tract)
          ?~(p=pur.q.f rag (~(put by rag) trail.q.f u.p))
        ==
      :: an instruction to our grove
      =/  read=[? ? ?]
        =/  red
          %~  has  in
          ?~(p=pur.q.f read.folder.perms read.folder.u.p)
        [(red %member) (red %admin) (red %moderator)]
      ?>  ?~(p=pur.q.f & (fits perms u.p))
      =-  (to-show:- grove-fact+!>(f))
      %.  [read grove-fact+!>(f)]
      =.  trail.q.f  (snoc trail.q.f nam.q.f)
      %=    to-cher
          groves
        %+  ~(put by groves)  gap
        :+  mod
          ?~(p=pur.q.f rag (~(put by rag) trail.q.f u.p))
        (~(put of `grove`gov) trail.q.f *tract)
      ==
    ::
        %rem-folder
      =+  perms=(to-perm trail.q.f)
      ?>  ?|  =(our.bol src.bol)
              =(p.gap src.bol)
          ::
            (~(any in ewe) ~(has in delete.folder.perms))
          ==
      =/  duds=regs
        %-  malt
        %+  murn  ~(tap by rag)
        |=  (pair trail perm)
        ?:((pre-fix trail.q.f p) ~ `[p q])
      ?.  =(our.bol p.gap)
        ?:  =(our.bol src.bol)
          ::  an instruction to a remote grove
          (to-show:(to-send p.f q.f) grove-fact+!>(f))
        ::  an instruction about their grove
        ?>  =(p.gap src.bol)
        %.  grove-fact+!>(`fact`[p.f q.f])
        %=    to-show
            groves
          %+  ~(put by groves)  gap
          [mod duds (~(lop of `grove`gov) trail.q.f)]
        ==
      ::  an instruction to our grove
      =/  read=[? ? ?]
        =+  red=~(has in read.folder.perms)
        [(red %member) (red %admin) (red %moderator)]
      =-  (to-show:- grove-fact+!>(f))
      %.  [read grove-fact+!>(f)]
      %=  to-cher
         groves
        %+  ~(put by groves)  gap
        [mod duds (~(lop of `grove`gov) trail.q.f)]
      ==
    ::
        %move-folder
      =+  fer=(to-perm from.q.f)                        ::  from
      =+  ter=(to-perm to.q.f)                          ::  to
      ?>  ?|  ?=(~ (~(get of `grove`gov) to.q.f))
              =(our.bol src.bol)
              =(p.gap src.bol)
              !=(/ from.q.f)
              %-  ~(any in ewe)
              |=  r=role
              ?&  (~(has in move.folder.fer) r)
                  (~(has in add.folder.ter) r)
          ==  ==
      =/  hold=grove
        (~(dip of `grove`gov) from.q.f)
      ?:  ?=([~ ~] hold)  to
      ?.  =(our.bol p.gap)
        ?.  =(our.bol src.bol)  !!  ::  uses add, rem
        ::  an instruction to a remote grove
        %-  to-show:(to-send p.f q.f)
        grove-fact+!>(`fact`[p.f q.f])
      ::  an instruction to our grove
      =/  perms=(unit perm)
        ?.((fits fer ter) ~ ?:(=(fer ter) ~ `ter))
      =+  held=~(tap of `grove`hold)
      =|  tu=_to

      =.  tu
        =~  [f=f (to-show:tu grove-fact+!>(f))]
            %+  to-cher  [& & &]
            grove-fact+!>([p.f %rem-folder from.q.f])
        ==
      =+  tuv=(~(lop of `grove`gov) from.q.f)
      =+  pre=/[(rear from.q.f)]
      |-
      ?~  held
        ^+  to
        tu(groves (~(put by groves) gap [mod rag tuv]))
      =+  nex=`path`:(welp to.q.f pre p.i.held)
      =.  tuv
        (~(put of `grove`tuv) [nex q.i.held])
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
            grove-fact+!>([p.f %add-node p nex q])
          ::
            %+  to-cher  read
            :-  %grove-fact
            !>  ^-  fact
            :-  p.f
            :-  %add-folder
            [(snip nex) (rear nex) (~(get by rag) nex)]
        ==
      ==
    ==
  ::  +to-peer: handle on-watch for grove data
  ::
  ++  to-peer
    |=  [rest=(pole knot) re=?]
    ^+  to
    =+  you=`@p`?>(?=([who=@ ~] rest) (slav %p who.rest))
    ?>  |(=(you src.bol) =(our.bol src.bol))
    =.  to-your  to-your(src.bol you)
    =/  pat=(list path)
      ?.(re ~ [grove+(snoc to-tire (scot %p you))]~)
    |^  stat
    ::
    ++  stat
      ^+  to
      %-  to-emit
      [%give %fact pat grove-fact+!>([(need gup) %start gove])]
    ::
    ++  gove
      ^-  [regs grove]
      =/  leto=(list [trail tract])  ~(tap of `grove`gov)
      =|  truv=grove
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
        truv  ?.(perms truv (~(put of `grove`truv) i.leto))
      ==
    --
  --
--