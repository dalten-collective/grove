/-  tr=trove
/+  *test
/=  agent  /app/trove
|%
::  setup data
+$  state-0
  $:(%0 (map spat:tr [=mods:tr =regs:tr =trove:tr]))
::
++  adm    (silt `(list role:tr)`[%admin]~)
++  mam    (silt `(list role:tr)`~[%admin %moderator %member])
++  mods   ^-(mods:tr ~)
++  trove  *trove:tr
++  spat   ^-(spat:tr [~zod 'our'])
++  wire   ^-(path /trove/(scot %p ~zod)/(scot %t 'our'))
++  regs
  ^-  regs:tr
  %-  ~(put by *regs:tr)
  [/ [%0 [adm adm adm adm] [mam adm adm adm adm ~]]]
++  bowl
  |=  run=@ud
  ^-  bowl:gall
  :*  [~zod ~zod %trove]
      [~ ~]
      [run `@uvJ`(shax run) (add (mul run ~s1) *time) [~zod %trove ud+run]]
  ==
--
::
|%
++  test-moderators
  =|  run=@ud
  ::  setup as if subscribed to spaces
  =^  nul  agent
    %-  ~(on-poke agent (bowl 0))
    trove-action+!>([spat %start regs trove])
  ::  add a moderator and capture snapshot
  =/  f1=(pair spat:tr $:(%add-moderators (set @p)))
    [spat %add-moderators (sy [~zod]~)]
  =^  mov1=(list card:agent:gall)  agent
    (~(on-poke agent (bowl run)) trove-action+!>(f1))
  =/  state-1=state-0  !<(state-0 on-save:agent)
  =/  added-moderator=state-0
    :-  %0
    %-  ~(put by +:*state-0)
    [spat [(~(put in mods) ~zod) regs trove]]
  =/  cards1=(list card:agent:gall)
    [%give %fact [/web-ui]~ trove-fact+!>(`fact:tr`f1)]~
  ::  remove the moderator, snapshot
  =.  run  +(run)
  =/  f2=(pair spat:tr $:(%rem-moderators (set @p)))
    [spat %rem-moderators (silt `(list @p)`~[~zod])]
  =^  mov2  agent
    (~(on-poke agent (bowl run)) [%trove-action !>(f2)])
  =/  state-2=state-0  !<(state-0 on-save:agent)
  =/  removed-moderator=state-0
    [%0 (~(put by +:*state-0) [spat [mods regs trove]])]
  =/  cards2=(list card:agent:gall)
    :~  [%give %fact [wire]~ trove-fact+!>(f2)]
        [%give %fact [/web-ui]~ trove-fact+!>(f2)]
    ==
  ::
  :: ~&  >  [%expected-cards1 cards1]
  :: ~&  >  [%add-moderator-cards mov1]
  :: ~&  >>  [%expected-cards2 cards2]
  :: ~&  >  [%rem-moderator-cards mov2]
  ~&  >>  =(cards1 mov1)
  %+  expect-eq
    !>([cards1])
  !>([mov1])
++  test-node
  =|  run=@ud
  ::  setup as if subscribed to spaces
  =^  nul  agent
    %-  ~(on-poke agent (bowl 0))
    trove-action+!>([spat %start regs trove])
  ::
  =/  nod=node:tr
    :+  %remote  'http://google.com'
    [%0 *time ~zod 'el-goog' 'do not click' '.com']
  =/  mod=node:tr
    :+  %record  'http://google.com'
    [%0 *time ~zod 'el-goog' 'do not click' '.com']
  =/  f1=(pair spat:tr $:(%add-node id:tr trail:tr node:tr))
    [spat [%add-node 0v0 *path nod]]
  =^  mov1  agent
    (~(on-poke agent (bowl run)) trove-action+!>(f1))
  =/  state-1=state-0  !<(state-0 on-save:agent)
  =/  added-node=state-0
    :-  %0
    %-  ~(put by +:*state-0)
    :-  spat
    :+  mods  regs
    %+  ~(put of `trove:tr`trove)  *path
    (~(put by *tract:tr) `@uvTROVE`(sham / mod) mod)
  ::
  =.  run  +(run)
  =.  mod
    :+  %record  'http://google.com'
    [%0 *time ~zod 'the-google' 'please-click' '.com']
  =/  f2=(pair spat:tr $:(%edit-node id:tr trail:tr (unit @t) (unit @t)))
    :-  spat
    :+  %edit-node
      0v1.kridg.96881.1fouv.rq4um.s8ssh
    [/ `'the-google' `'please-click']
  =^  mov2  agent
    (~(on-poke agent (bowl run)) trove-action+!>(f2))
  =/  state-2=state-0  !<(state-0 on-save:agent)
  =/  edited-node=state-0
    :-  %0
    %-  ~(put by +:added-node)
    :-  spat
    :+  mods  regs
    %+  ~(put of `trove:tr`trove)  *path
    (~(put by *tract:tr) 0v1.kridg.96881.1fouv.rq4um.s8ssh mod)
  ::
  =.  run  +(run)
  =/  f3=(pair spat:tr $:(%repeat id:tr trail:tr (pair spat:tr trail:tr)))
    [spat %repeat 0v1.kridg.96881.1fouv.rq4um.s8ssh / [spat /test-new]]
  =^  mov3  agent
    (~(on-poke agent (bowl run)) trove-action+!>(f3))
  =/  state-3=state-0  !<(state-0 on-save:agent)
  =/  duplicated-node=state-0
    :-  %0
    %-  ~(put by +:edited-node)
    :-  spat
    :+  mods  regs
    %+  ~(put of trove:(~(got by +:edited-node) spat))
      /test-new
    (~(put by *tract:tr) `@uvTROVE`(sham [spat /test-new] mod) mod)
  ::
  =.  run  +(run)
  =/  f4a=(pair spat:tr $:(%add-folder path cord (unit perm:tr)))
    [spat %add-folder / 'test-next' ~]
  =^  mov4a  agent
    (~(on-poke agent (bowl run)) trove-action+!>(f4a))
  =/  f4=(pair spat:tr $:(%move-node id:tr trail:tr trail:tr))
    [spat %move-node 0v5.7svn7.dpfq0.u5mr5.9c3rr.g4lps /test-new /test-next]
  =^  mov4  agent
    (~(on-poke agent (bowl run)) trove-action+!>(f4))
  =/  state-4=state-0  !<(state-0 on-save:agent)
  =/  moved-node=state-0
    =+  told=trove:(~(got by +:duplicated-node) spat)
    =.  told  (~(put of `trove:tr`told) /test-new ~)
    =.  told
      %+  ~(put of `trove:tr`told)  /test-next
      (~(put by *tract:tr) `@uvTROVE`(sham /test-next mod) mod)
    [%0 (~(put by +:duplicated-node) [spat mods regs told])]
  ::
  %+  expect-eq
    !>([state-1 state-2 state-3 state-4])
  !>([added-node edited-node duplicated-node moved-node])
++  test-folder
  =|  run=@ud
  ::  setup as if subscribed to spaces
  =^  nul  agent
    %-  ~(on-poke agent (bowl 0))
    trove-action+!>([spat %start regs trove])
  ::
  =/  nod=node:tr
    :+  %remote  'http://google.com/1'
    [%0 *time ~zod 'el-goog' 'do not click' '.com']
  =/  mod=node:tr
    :+  %record  'http://google.com/1'
    [%0 *time ~zod 'el-goog' 'do not click' '.com']
  =/  f1a=(pair spat:tr $:(%add-folder path cord (unit perm:tr)))
    [spat %add-folder / 'test' ~]
  =/  f1b=(pair spat:tr $:(%add-folder path cord (unit perm:tr)))
    [spat %add-folder /test 'one' ~]
  =/  f1c=(pair spat:tr $:(%add-folder path cord (unit perm:tr)))
    [spat %add-folder /test 'two' ~]
  =/  f1d=(pair spat:tr $:(%add-node id:tr trail:tr node:tr))
    [spat [%add-node 0v0 /test/two nod]]
  =^  mov1a  agent
    (~(on-poke agent (bowl run)) trove-action+!>(f1a))
  =^  mov1b  agent
    (~(on-poke agent (bowl run)) trove-action+!>(f1b))
  =^  mov1c  agent
    (~(on-poke agent (bowl run)) trove-action+!>(f1c))
  =^  mov1d  agent
    (~(on-poke agent (bowl run)) trove-action+!>(f1d))
  =/  state-1=state-0  !<(state-0 on-save:agent)
  =/  added-folders=state-0
    :-  %0
    %-  ~(put by +:*state-0)
    :-  spat
    :+  mods  regs
    %-  ~(gas of *trove:tr)
    :~  [/test *tract:tr]
        [/test/one *tract:tr]
    ::
        :-  /test/two
        (~(gas by *tract:tr) [`@uvTROVE`(sham /test/two mod) mod]~)
    ==
  ::
  =.  run  +(run)
  =/  f2=(pair spat:tr $:(%rem-folder path))
    [spat %rem-folder /test/one]
  =^  mov2  agent
    (~(on-poke agent (bowl run)) trove-action+!>(f2))
  =/  state-2=state-0  !<(state-0 on-save:agent)
  =/  removed-folder=state-0
    =+  told=trove:(~(got by +:added-folders) spat)
    =.  told  (~(lop of `trove:tr`told) /test/one)
    [%0 (~(put by +:added-folders) [spat mods regs told])]

  ::
  (expect-eq !>(state-1) !>(added-folders))
--