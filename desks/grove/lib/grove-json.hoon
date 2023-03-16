/-  g=grove
|%
++  enjs
  =,  enjs:format
  |%
  ++  ships  |=(p=@p `json`((lead %s) (scot %p p)))
  ::
  ++  trail
    |=(t=trail:g =+(p=(path t) ?>(?=([%s *] p) p.p)))
  ::
  ++  roles
    |=(a=(set role:g) `json`a/(turn ~(tap in a) (lead %s)))
  ::
  ++  flag
    |=(s=flag:g `@t`(rap 3 (scot %p -.s) '/' +.s ~))
  ::
  ++  node
    |=  n=node:g
    ^-  json
    (pairs ~[type+s/-.n url+s/url.n dat+(data dat.n)])
  ::
  ++  tract
    |=  tat=tract:g
    ^-  json
    =-  o/(malt -)
    %+  turn  ~(tap by tat)
    |=  [k=@uv v=node:g]
    [(scot %uv k) `json`(node v)]
  ::
  ++  grove
    |=  axe=(axal tract:g)
    ^-  json
    =-  o/(malt -)
    ^-  (list [@t json])
    %+  turn  ~(tap by ~(tar of axe))
    |=  [k=trail:g v=tract:g]
    [(trail k) (tract v)]
  ::
  ++  tree
    |=  axe=(axal tract:g)
    |^  ^-  json
      %-  pairs
      :~  type+s/'SCRY'
          face+s/'TREE'
      ::
        :-  %scry
        (chop-wood axe)
      ==
    ::
    ++  chop-wood
      |=  stump=(axal tract:g)
      =;  kids=(list json)
        %-  pairs
        :~  nodes+?~(fil.stump ~ (tract u.fil.stump))
            children+a/kids
        ==
      ?:  =(~ dir.stump)  ~
      %+  turn  ~(tap by `(map @t (axal tract:g))`dir.stump)
      |=  [fol=@ta twig=(axal tract:g)]
      (frond fol (chop-wood twig))
    --
  ::
  ++  regs
    |=  mp=(map ^path perm:g)
    ^-  json
    =-  o/(malt -)
    ^-  (list [@t json])
    %+  turn  ~(tap by mp)
    |=  [k=^path v=perm:g]
    [(trail k) (perm v)]
  ::
  ++  team
    |=  [p=flag:g q=(set @p) r=(set @p) s=(set @p)]
    ^-  json
    %-  pairs
    :~  type+s/'SCRY'
        face+s/'TEAM'
    ::
      :-  %scry
      %-  pairs
      :~  group+s/(flag p)
          admins+a/(turn ~(tap in q) ships)
          moderators+a/(turn ~(tap in r) ships)
          members+a/(turn ~(tap in s) ships)
      ==
    ==
  ::
  ++  state
    |=  $:  %0 
            t=(map flag:g [mods:g regs:g grove:g])
        ==
    ^-  json
    %-  pairs
    :~  type+s/'FACT'
        face+s/'INITIAL_STATE'
    ::
      :-  %fact
      %-  pairs
      :~  version+s/'0'
          groves+(groves t)
      ==
    ==
  ::
  ++  data
    |=  dat=data:meta:g
    ^-  json
    %-  pairs
    :~  from+(sect from.dat)
        by+(ships by.dat)
        title+s/title.dat
        description+s/description.dat
        extension+s/extension.dat
    ==
  ::
  ++  groves
    |=  tov=(map flag:g [mods:g regs:g grove:g])
    ^-  json
    =-  o/(malt -)
    %+  turn  ~(tap by tov)
    |=  [k=flag:g v=[m=mods:g r=regs:g tr=grove:g]]
    :-  (flag k)
    %-  pairs
    :~  team+(frond moderators+a/(turn ~(tap in m.v) ships))
        regs+(regs r.v)
        grove+(grove tr.v)
    ==
  ::
  ++  perm
    |=  p=perm:g
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
    |=  f=fact:g
    ^-  json
    ?+    -.q.f  !!
        %start
      =-  (frond add+(frond grove+-))
      %-  pairs
      :~  type+s/'FACT'
          face+s/'GROVE_NEW'
      ::
        :-  %fact
        %-  pairs
        :~  group+s/(flag p.f)
            regs+(regs p.q.f)
            grove+(grove q.q.f)
        ==
      ==
    ::
        %add-moderators
      %-  pairs
      :~  type+s/'FACT'
          face+s/'MODERATORS_ADD'
      ::
        :-  %fact
        %-  pairs
        :~  group+s/(flag p.f)
            :-  %add
            %+  frond  %team
            %+  frond  %moderators
            a/(turn ~(tap in +.q.f) ships)
        ==
      ==
    ::
        %rem-moderators
      %-  pairs
      :~  type+s/'FACT'
          face+s/'MODERATORS_REM'
      ::
        :-  %fact
        %-  pairs
        :~  group+s/(flag p.f)
            :-  %rem
            %+  frond  %team
            %+  frond  %moderators
            a/(turn ~(tap in +.q.f) ships)
        ==
      ==
    ::
        %add-node
      %-  pairs
      :~  type+s/'FACT'
          face+s/'NODE_ADD'
      ::
        :-  %fact
        %-  pairs
        :~  group+s/(flag p.f)
        ::
          :-  %add
          %+  frond  %node
          %-  pairs
          :~  id+s/(scot %uv id.q.f)
              trail+s/(trail trail.q.f)
              node+(node node.q.f)
          ==
        ==
      ==
    ::
        %rem-node
      %-  pairs
      :~  type+s/'FACT'
          face+s/'NODE_REM'
      ::
        :-  %fact
        %-  pairs
        :~  group+s/(flag p.f)
        ::
          :-  %rem
          %+  frond  %node
          %-  pairs
          :~  id+s/(scot %uv id.q.f)
              trail+s/(trail trail.q.f)
          ==
        ==
      ==
    ::
        %move-node
      %-  pairs
      :~  type+s/'FACT'
          face+s/'MOVE_NODE'
      ::
        :-  %fact
        %-  pairs
        :~  group+s/(flag p.f)
        ::
            :-  %mov
            %+  frond  %node
            %-  pairs
            :~  id+s/(scot %uv id.q.f)
                from+s/(trail from.q.f)
                to+s/(trail to.q.f)
            ==
        ==
      ==
    ::
        %edit-node
      %-  pairs
      :~  type+s/'FACT'
          face+s/'NODE_EDIT'
      ::
        :-  %fact
        %-  pairs
        :~  group+s/(flag p.f)
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
      ==
    ::
        %add-folder
      %-  pairs
      :~  type+s/'FACT'
          face+s/'FOLDER_ADD'
      ::
        :-  %fact
        %-  pairs
        :~  group+s/(flag p.f)
        ::
          :-  %add
          %+  frond  %folder
          %-  pairs
          :~  trail+s/(trail trail.q.f)
              perms+?~(pur.q.f ~ (perm u.pur.q.f))
          ==
        ==
      ==
    ::
        %rem-folder
      %-  pairs
      :~  type+s/'FACT'
          face+s/'FOLDER_REM'
      ::
        :-  %fact
        %-  pairs
        :~  group+s/(flag p.f)
        ::
          :-  %rem
          %-  frond
          folder+(frond trail+s/(trail trail.q.f))
        ==
      ==
    ::
        %move-folder
      %-  pairs
      :~  type+s/'FACT'
          face+s/'FOLDER_MOVE'
      ::
        :-  %fact
        %-  pairs
        :~  group+s/(flag p.f)
        ::
          :-  %move
          %+  frond  %folder
          %-  pairs
          :~  from+(frond trail+s/(trail from.q.f))
              to+(frond trail+s/(trail to.q.f))
          ==
        ==
      ==
    ==
  --
++  dejs
  =,  dejs:format
  |%
  ++  role
    ^-  $-(json role:g)
    (cu |=(r=@t ;;(role:g r)) so)
  ++  node
    ^-  $-(json node:g)
    %+  cu
      |=([u=@t d=data:meta:g] [%record u d])
    (ot ~[url+so dat+data])
  ::
  ++  flag
    ^-  $-(json flag:g)
    |=  j=json
    ?>  ?=([%s @] j)
    =;  [who=dime wat=@tas]
      ?>  ?=(%p -.who)
      `flag:g`[+.who wat]
    (rash +.j ;~((glue fas) ;~(pfix sig crub:^so) sym))
  ::
  ++  add-node
    ^-  $-(json $:(id:g trail:g node:g))
    %+  cu
      |=([tr=trail:g no=node:g] [0v0 tr no])
    (ot ~[trail+pa node+node])
  ::
  ++  repeat
    ^-  $-(json $:(id:g trail:g (pair flag:g trail:g)))
    %-  ot
    :~  id+(se %uv)
        trail+pa
        to+(ot ~[group+flag trail+pa])
    ==
  ::
  ++  data
    ^-  $-(json data:meta:g)
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
    ^-  $-(json (unit perm:g))
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
    ^-  $-(json action:poke:g)
    %-  ot
    :~  group+flag
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