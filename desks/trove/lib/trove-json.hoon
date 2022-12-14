/-  t=trove, s-p=spaces-path
|%
++  enjs
  =,  enjs:format
  |%
  ++  ships  |=(p=@p `json`((lead %s) (scot %p p)))
  ::
  ++  trail
    |=(t=trail:t =+(p=(path t) ?>(?=([%s *] p) p.p)))
  ::
  ++  roles
    |=(a=(set role:t) `json`a/(turn ~(tap in a) (lead %s)))
  ::
  ++  spat
    |=(s=path:s-p `@t`(rap 3 (scot %p -.s) '/' +.s ~))
  ::
  ++  node
    |=  n=node:t
    ^-  json
    (pairs ~[type+s/-.n url+s/url.n dat+(data dat.n)])
  ::
  ++  tract
    |=  tat=tract:t
    ^-  json
    =-  o/(malt -)
    %+  turn  ~(tap by tat)
    |=  [k=@uv v=node:t]
    [(scot %uv k) `json`(node v)]
  ::
  ++  trove
    |=  axe=(axal tract:t)
    ^-  json
    =-  o/(malt -)
    ^-  (list [@t json])
    %+  turn  ~(tap by ~(tar of axe))
    |=  [k=trail:t v=tract:t]
    [(trail k) (tract v)]
  ::
  ++  regs
    |=  mp=(map ^path perm:t)
    ^-  json
    =-  o/(malt -)
    ^-  (list [@t json])
    %+  turn  ~(tap by mp)
    |=  [k=^path v=perm:t]
    [(trail k) (perm v)]
  ::
  ++  team
    |=  [p=spat:t q=(set @p) r=(set @p) s=(set @p)]
    ^-  json
    %+  frond  (spat p)
    %-  pairs
    :~  admins+a/(turn ~(tap in q) ships)
        moderators+a/(turn ~(tap in r) ships)
        members+a/(turn ~(tap in s) ships)
    ==
  ::
  ++  state
    |=  $:  %0 
            t=(map spat:t [mods:t regs:t trove:t])
        ==
    ^-  json
    %-  pairs
    :~  version+s/'0'
        troves+(troves t)
    ==
  ::
  ++  data
    |=  dat=data:meta:t
    ^-  json
    %-  pairs
    :~  from+(sect from.dat)
        by+(ships by.dat)
        title+s/title.dat
        description+s/description.dat
        extension+s/extension.dat
    ==
  ::
  ++  troves
    |=  tov=(map spat:t [mods:t regs:t trove:t])
    ^-  json
    =-  o/(malt -)
    %+  turn  ~(tap by tov)
    |=  [k=spat:t v=[m=mods:t r=regs:t tr=trove:t]]
    :-  (spat k)
    %-  pairs
    :~  team+(frond moderators+a/(turn ~(tap in m.v) ships))
        regs+(regs r.v)
        trove+(trove tr.v)
    ==
  ::
  ++  perm
    |=  p=perm:t
    ^-  json
    %-  pairs
    :~
      :-  %files
      %-  pairs
      :~  add+(roles add.files.p)
          edit+(roles edit.files.p)
          move+(roles move.files.p)
          delete+(roles delete.files.p)
      ==
    ::
      :-  %folders
      %-  pairs
      :~  read+(roles read.folder.p)
          add+(roles add.folder.p)
          edit+(roles edit.folder.p)
          move+(roles move.folder.p)
          delete+(roles delete.folder.p)
          ch-mod+(roles ch-mod.folder.p)
      ==
    ==
  ++  fact
    |=  f=fact:t
    ^-  json
    ?+    -.q.f  !!
        %start
      =-  (frond add+(frond trove+-))
      %-  pairs
      :~  space+s/(spat p.f)
          regs+(regs p.q.f)
          trove+(trove q.q.f)
      ==
    ::
        %add-moderators
      %-  pairs
      :~  space+s/(spat p.f)
          :-  %add
          %+  frond  %team
          %+  frond  %moderators
          a/(turn ~(tap in +.q.f) ships)
      ==
    ::
        %rem-moderators
      %-  pairs
      :~  space+s/(spat p.f)
          :-  %rem
          %+  frond  %team
          %+  frond  %moderators
          a/(turn ~(tap in +.q.f) ships)
      ==
    ::
        %add-node
      %-  pairs
      :~  space+s/(spat p.f)
      ::
        :-  %add
        %+  frond  %node
        %-  pairs
        :~  id+s/(scot %uv id.q.f)
            trail+s/(trail trail.q.f)
            node+(node node.q.f)
        ==
      ==
    ::
        %rem-node
      %-  pairs
      :~  space+s/(spat p.f)
      ::
        :-  %rem
        %+  frond  %node
        %-  pairs
        :~  id+s/(scot %uv id.q.f)
            trail+s/(trail trail.q.f)
        ==
      ==
    ::
      %move-node  !!
    ::
        %edit-node
      %-  pairs
      :~  space+s/(spat p.f)
      ::
        :-  %upd
        %+  frond  %node
        %-  pairs
        :~  id+s/(scot %uv id.q.f)
            trail+s/(trail trail.q.f)
            title+?~(tut.q.f ~ s/u.tut.q.f)
            description+?~(dus.q.f ~ s/u.dus.q.f)
        ==
      ==
    ::
        %add-folder
      %-  pairs
      :~  space+s/(spat p.f)
      ::
        :-  %add
        %+  frond  %folder
        %-  pairs
        :~  trail+s/(trail trail.q.f)
            perms+?~(pur.q.f ~ (perm u.pur.q.f))
        ==
      ==
    ::
        %rem-folder
      %-  pairs
      :~  space+s/(spat p.f)
      ::
        :-  %rem
        %-  frond
        folder+(frond trail+s/(trail trail.q.f))
      ==
    ::
        %move-folder
      %-  pairs
      :~  space+s/(spat p.f)
      ::
        :-  %move
        %+  frond  %folder
        %-  pairs
        :~  from+(frond trail+s/(trail from.q.f))
            to+(frond trail+s/(trail to.q.f))
        ==
      ==
    ==
  --
++  dejs
  =,  dejs:format
  |%
  ++  role
    ^-  $-(json role:t)
    (cu |=(r=@t ;;(role:t r)) so)
  ++  node
    ^-  $-(json node:t)
    %+  cu
      |=([u=@t d=data:meta:t] [%record u d])
    (ot ~[url+so dat+data])
  ::
  ++  spat
    ^-  $-(json path:s-p)
    |=  j=json
    ?>  ?=([%s @] j)
    =;  [who=dime wat=@tas]
      ?>  ?=(%p -.who)
      `path:s-p`[+.who wat]
    (rash +.j ;~((glue fas) ;~(pfix sig crub:^so) sym))
  ::
  ++  add-node
    ^-  $-(json $:(id:t trail:t node:t))
    %+  cu
      |=([tr=trail:t no=node:t] [0v0 tr no])
    (ot ~[trail+pa node+node])
  ::
  ++  repeat
    ^-  $-(json $:(id:t trail:t (pair spat:t trail:t)))
    %-  ot
    :~  id+(se %uv)
        trail+pa
        to+(ot ~[space+spat trail+pa])
    ==
  ::
  ++  data
    ^-  $-(json data:meta:t)
    %+  cu
      |=  [fr=@da by=@p ti=@t de=@t ex=@t]
      [%0 fr by ti de ex]
    %-  ot
    :~  from+du
        by+(se %p)
        title+so
        description+so
        extension+so
    ==
  ::
  ++  perm
    ^-  $-(json (unit perm:t))
    |=  j=json
    ?:  =(~ j)  ~
    :+  ~  %0
    %.  j
    %-  ot
    :~  :-  %files
        %-  ot
        :~  add+(as role)
            edit+(as role)
            move+(as role)
            delete+(as role)
        ==
      ::
        :-  %folder
        %-  ot
        :~  read+(as role)
            add+(as role)
            edit+(as role)
            move+(as role)
            delete+(as role)
            ch-mod+(as role)
        ==
    ==
  ::
  ++  action
    ^-  $-(json action:poke:t)
    %-  ot
    :~  space+spat
      ::
        :-  %poke
        %-  of
        :~  add-moderators+(as (se %p))
            rem-moderators+(as (se %p))
          ::
            repeat+repeat
            reperm+(ot ~[trail+pa pur+perm])
          ::
            add-node+add-node
            rem-node+(ot ~[id+(se %uv) trail+pa])
            move-node+(ot ~[id+(se %uv) from+pa to+pa])
          ::
            :-  %edit-node
            %-  ot
            :~  id+(se %uv)
                trail+pa
                tut+so:dejs-soft:format
                dus+so:dejs-soft:format
            ==
          ::
            add-folder+(ot ~[trail+pa nam+so pur+perm])
            rem-folder+pa
            move-folder+(ot ~[from+pa to+pa])
        ==
    ==
  --
--
