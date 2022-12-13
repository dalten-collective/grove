::  courier [realm]:
::
::  Chat message lib within Realm. Mostly handles [de]serialization
::    to/from json from types stored in courier sur.
::
/-  sur=courier, gra=graph-store, *post, *resource, contact-store, dm-hook, 
    mtd=metadata-store, inv=invite-store, graph-view, hark=hark-store
/+  res=resource
=<  [sur .]
=,  sur
|%
+$  hark-places   (map place:hark stats:hark)
::
++  gs   ::  converts dms from graph-store dm-inbox
  |%
  ++  invite-preview
    |=  [=ship our=ship now=@da]
    =/  rolo           .^(rolodex:sur %gx /(scot %p our)/contact-store/(scot %da now)/all/noun)
    (form-pending ship now rolo)
  ::
  ::  DM list handlers
  :: 
  ++  previews      :: a list of contacts with last message
    |=  [our=ship now=@da]
    ^-  (list message-preview)
    ::  Get dms
    =/  dm-inbox          .^(update:gra %gx /(scot %p our)/graph-store/(scot %da now)/graph/(scot %p our)/dm-inbox/noun)
    ?>  ?=(%add-graph -.+.dm-inbox)
    =/  dm-graph          ^-((map atom node:gra) graph.+.+.dm-inbox)
    =/  rolo              .^(rolodex:sur %gx /(scot %p our)/contact-store/(scot %da now)/all/noun)
    =/  prev-list=(list message-preview)
    %+  turn  ~(tap by dm-graph)
      |=  [ship-dec=atom node=node:gra]
      (form-dm-prevs ship-dec node our rolo)
    ::  Get pending dms
    =/  pendings       .^(action:dm-hook %gx /(scot %p our)/dm-hook/(scot %da now)/pendings/noun)
    ?>  ?=(%pendings -.pendings)
    =/  pen-ships      `(set @p)`ships.+.pendings
    =/  pen-list=(list message-preview)
    %+  turn  ~(tap in pen-ships)
      |=  ship=@p
      (form-pending ship now rolo)
    :: todo sort by last-sent
    =/  single-dms      (weld prev-list pen-list)
    =/  group-dms       (grp-dm-prevs our now rolo)
    =/  all-dms         (weld single-dms group-dms)
    =/  hark-notifs     .^(update:hark %gx /(scot %p our)/hark-store/(scot %da now)/all-stats/noun)
    ?>  ?=(%more -.hark-notifs)
    ?>  ?=(%all-stats -.-.+.hark-notifs)
    =/  dms-appended    (append-unread all-dms ^-(hark-places +.-.+.hark-notifs))
    [dms-appended]
        ::
        ::  Unread count
        ::
        ++  append-unread
          |=  [all-dms=(list message-preview) places=hark-places]
          ^-  (list message-preview)
          =/  dm-unreads    (malt `(list [cord stats:hark])`(turn ~(tap by places) form-unreads))
          =/  dms-appended=(list message-preview)
          %+  turn  all-dms
            |=  prev=message-preview
            =/  stats       (~(get by dm-unreads) path.prev)
            ?~  stats                             ::  branch on unit
              prev                                ::  no unread stats
            (insert-unread prev (need stats))     ::  we have unread stats
          dms-appended
        ::
        ++  insert-unread
          :: |=  [dm-prev=message-preview]
          |=  [prev=message-preview =stats:hark]
          ^-  message-preview
          =/  appended                prev
          =.  unread-count.appended   count.stats
          [appended]
        ::
        ++  form-unreads
          |=  [=place:hark =stats:hark]
          =/  parsed-path   (parse-hark-path path.place)
          ?~  parsed-path
            ::  its not a dm or group dm
            :: %.n
            [(spat path.place) stats]
          [(need parsed-path) stats]
        ::
        ++  parse-hark-path
          |=  =path
          ^-  (unit cord)
          ?+  path    ~
          ::
            [@ ship %dm-inbox @ta ~]
            =/  raw=cord  i.t.t.t.path
            =/  taw=tape  (trip raw)
            =.  taw  (flop taw)
            =/  ctr=@ud  0
            =/  idx=@ud  0
            =/  len=@ud  (lent taw)
            =/  ntaw=tape
              |-
              ?~  taw  ~
              ?:  ?& 
                  =(ctr 2)
                  ?!(=(idx (sub len 1)))
                  ==
                :-  i.taw
                :-  '.'
                $(idx +(idx), ctr 0, taw t.taw)
              :-  i.taw
              $(idx +(idx), ctr +(ctr), taw t.taw)

            =/  maybe  (slaw %ud (crip (flop ntaw)))
            ?~  maybe
              ~

            =/  ship-dec   u.maybe
            [~ (spat /dm-inbox/(scot %p `@p`ship-dec))]
          ::
            [@ ship @ta ~]
              =/  to       `@p`(slav %p i.t.path)
              =/  name-da   `(unit @da)`(slaw %da i.t.t.path)
              ?~  name-da   
                ::  its not a @da
                ~
              ::  its a @da
              [~ (spat /(scot %p to)/(scot %da (need name-da)))]
          ==
    ::
    ::  Performs all the scries needed to build a group dm preview for the list view
    ::
    ++  grp-dm-prevs        ::  generates group dm previews
      |=  [our=ship now=@da rolo=rolodex:sur]
      ^-  (list message-preview)
      =/  assoc          .^(associations:mtd %gx /(scot %p our)/metadata-store/(scot %da now)/associations/noun)
      =/  group-dms      (skim ~(val by assoc) skim-grp-dms)
      =/  dms-list=(list message-preview)
      %+  turn  group-dms
        |=  ass=association:mtd
        (grp-prev our ass now rolo)
      =/  graph-invites  (need .^((unit invitatory:inv) %gx /(scot %p our)/invite-store/(scot %da now)/invitatory/graph/noun))
      =/  group-invs     (skim ~(tap by graph-invites) skim-grp-inv)
      =/  group-dm-invs=(list message-preview)
      %+  turn  group-invs
        |=  [hash=@uvH inv=invite:inv]
        (grp-inv our inv now rolo hash)
      [(weld dms-list group-dm-invs)]
      ::
      ++  grp-inv         ::  generates group dm invite previews
        |=  [our=ship inv=invite:inv now=@da rolo=rolodex:sur hash=@uvH]
        ^-  message-preview
        =/  ginv                (ginv our inv now)
        =/  mtd-list            (get-metadata to.ginv our now)
        [path.ginv to.ginv %group-pending %graph-store time.ginv [~] mtd-list (some hash) 0]
      ::
      ++  grp-prev        ::  generates group dm log previews
        |=  [our=ship ass=association:mtd now=@da rolo=rolodex:sur]
        ^-  message-preview
        =/  glog                (glog our entity.group.ass name.group.ass now)
        ::  get contact metadata set
        =/  mtd-list            (get-metadata to.glog our now)
        ::
        ?:  =(0 ~(wyt by posts.glog))    :: if theres no data, return empty preview
          [path.glog to.glog %group %graph-store time.glog [~] mtd-list ~ 0] 
        ::
        =/  posts=(list post:gra)
        %+  turn  (skim ~(val by posts.glog) skim-maybe-post)       ::  skims out deleted posts and turns the posts map
          |=  [node=node:gra]
          ?<  ?=(%| -.post.node)
          =/  p     ^-(post p.post.node)
          [p]
        ::  Get the last post
        =/  last              (rear posts)
        ::  Add a mention so we know who posted the last message
        =/  contents          (weld [[%mention author.last] ~] contents.last)
        [path.glog to.glog %group %graph-store time-sent.last contents mtd-list ~ 0]
    ::
  ::
  ++  grp-log             ::  generates the group dm log metadata
    |=  [our=ship now=@da entity=ship name=cord]
    ^-  chat
    =/  glog                (glog our entity name now)
    =/  mtd-list            (get-metadata to.glog our now)
    ::
    ?:  =(0 ~(wyt by posts.glog))    :: if theres no data, return empty preview
      [path.glog to.glog %group %graph-store [~] mtd-list]
    ::
    =/  dms                 (map-to-dms posts.glog)
    [path.glog to.glog %group %graph-store (flop dms) mtd-list]
  ::
  ++  received-grp-dm       ::  handes a newly received graph-update-3 group dm
    |=  [our=ship now=@da entity=ship name=cord =node:gra]
    ^-  chat
    =/  message             (node-to-dm node)
    =/  path                (spat /(scot %p entity)/(cord name))
    =/  group               (need .^((unit group) %gx /(scot %p our)/group-store/(scot %da now)/groups/ship/(scot %p entity)/(cord name)/noun))
    ?>  ?=(%invite -.policy.group)
    =/  to-set              (~(gas in members.group) ~(tap in pending.policy.group))
    =/  mtd-list            (get-metadata to-set our now)
    ::
    [path to-set %group %graph-store [message ~] mtd-list]
  ::
  ++  get-metadata
    |=  [to=(set ship) our=@p now=@da]
    =/  rolo      .^(rolodex:sur %gx /(scot %p our)/contact-store/(scot %da now)/all/noun)
    =/  mtd-list=(list contact-mtd)
      %+  turn  ~(tap in to)
        |=  cont=@p
        (form-contact-mtd rolo cont)
    mtd-list
  :: 
  ::  Group DM helpers
  ::
  ++  new-group-dm
    |=  [our=ship now=@da ships=(set ship)]
    ^-  action:graph-view
    =/  title=(list cord)
    %+  turn  ~(tap in ships)
      |=  [ship=@p]
      `cord`(scot %p ship)
    =.  title         (into title 0 `cord`(scot %p our))
    =.  title         (join ', ' title)
    =/  dm-name       `@tas`(crip (oust [19 6] (scow %da now)))
    =/  create  [
      %create
      rid=`resource`[entity=our name=dm-name]
      title=(crip title)
      description=`@t`''
      mark=(some %graph-validator-chat)
      associated=[%policy [%invite pending=ships]]
      module='chat'
    ]
    [^-(action:graph-view create)]
    
  
  ++  glog    ::  generates the group dm log metadata
    |=  [our=ship entity=ship name=term now=@da]
    ^-  [time=@da path=cord to=(set ship) posts=(map atom node:gra)]
    =/  dm-name         (need (slaw %da name))
    =/  group-name      `cord`name
    =/  group           (need .^((unit group) %gx /(scot %p our)/group-store/(scot %da now)/groups/ship/(scot %p entity)/(cord group-name)/noun))
    =/  group-path      (spat /(scot %p entity)/(cord group-name))
    ?>  ?=(%invite -.policy.group)
    =/  to-set          (~(gas in members.group) ~(tap in pending.policy.group))
    =/  node            .^(update:gra %gx /(scot %p our)/graph-store/(scot %da now)/graph/(scot %p entity)/(scot %da dm-name)/noun)   
    ?>  ?=(%add-graph -.+.node)
    =/  post-graph       ^-((map atom node:gra) graph.+.+.node)
    [dm-name group-path to-set post-graph]
  ::
  ++  ginv    ::  generates parses a group invite for metadata
    |=  [our=ship inv=invite:inv now=@da]
    ^-  [time=@da path=cord to=(set ship) posts=(map atom node:gra)]
    =/  entity          entity.resource.inv
    =/  dm-name         (need (slaw %da name.resource.inv))
    =/  group-name      `cord`name.resource.inv
    =/  group-path      (spat /(scot %p entity)/(cord group-name))
    =/  to-set          (silt ~[entity ship.inv recipient.inv])
    [dm-name group-path to-set [~]]
  ::
  ++  skim-grp-inv    ::  used for skimming out group dm invites from invite-store
    |=  [hash=@uvH inv=invite:inv]
    =/  name      `cord`name.resource.inv
    =/  name-da   (slaw %da name)
    ?~  name-da   %.n   %.y
  ::
  ++  skim-grp-dms    ::  used for skimming out group dm resources from group-store 
    |=  ass=association:mtd
    ?:  =(%graph -.config.metadatum.ass)
      =/  name      `cord`name.group.ass
      =/  name-da   (slaw %da name)
      ?~  name-da   %.n   %.y
    %.n
  ::
  ++  group-skim-gu  :: used for skimming out group dm resources from graph-update-3 updates
    |=  [=resource]
    =/  name      `cord`name.resource
    =/  name-da   (slaw %da name)
    ?~  name-da   
      %.n   
    %.y
  ::
  ++  skim-maybe-post  :: used for skimming out group dm resources from graph-update-3 updates
    |=  [node=node:gra]
    ?:  =(%| -.post.node)  :: if it's a post
      %.n
    %.y
  ::
  ++  skim-maybe-node  :: used for skimming out deleted dms
    |=  [idx=atom node=node:gra]
    ?:  =(%| -.post.node)  :: if it's a post
      %.n
    %.y
  ::
  ::  forms a single dm preview for the list view
  ::
  ++  form-dm-prevs
    |=  [ship-dec=atom node=node:gra our=ship rolo=rolodex:sur]
    ^-  message-preview
    =/  to-ship           ^-(@p ship-dec)
    ?>  ?=(%graph -.children.node)
    =/  message-nodes     p.+.children.node
    =/  post-graph        ^-((map atom node:gra) message-nodes)
    :: Get all posts
    =/  posts=(list post:gra)
      %+  turn  (skim ~(tap by post-graph) skim-maybe-node)       ::  skims out deleted posts and turns the posts map
        |=  [ship-dec=atom node=node:gra]
        ?<  ?=(%| -.post.node)
        =/  p     ^-(post p.post.node)
        [p]
    =/  contact           (form-contact-mtd rolo to-ship)
    =/  path              (spat /dm-inbox/(scot %p to-ship))
    =/  length            (lent posts)                          
    ?:  =(length 0)       ::  If length is greater than zero we need to form a valid empty
      ?>  ?=(%.y -.post.node)
      =/  root     ^-(post (need post.node))
      [path (silt ~[to-ship]) %dm %graph-store time-sent.root contents.root ~[contact] ~ 0]
    ::
    =/  last              (rear posts)
    [path (silt ~[to-ship]) %dm %graph-store time-sent.last contents.last ~[contact] ~ 0]
  ::
  ::  Pending dms
  ::
  ++  form-pending
    |=  [=ship now=@da rolo=rolodex:sur]
    ^-  message-preview
    =/  path              (spat /dm-inbox/(scot %p ship))
    [path (silt ~[ship]) %pending %graph-store now [~] ~[(form-contact-mtd rolo ship)] ~ 0]
  ::
  ::
  ::
  ::  /~/scry/graph-store/graph/~lomder-librun/dm-inbox/node/siblings/newest/lone/100/4.880.309.json
  ++  dm-log
    |=  [our=ship to-ship=ship now=@da]
    ^-  chat 
    =/  ship-dec            `@ud`to-ship
    ::  first get dm-inbox to get total node count
    =/  dm-inbox            .^(update:gra %gx /(scot %p our)/graph-store/(scot %da now)/graph/(scot %p our)/dm-inbox/noun)
    :: =/  dm-inbox            .^(update:gra %gx /(scot %p our)/graph-store/(scot %da now)/graph/(scot %p our)/dm-inbox/node/siblings/newest/lone/5/(scot %ud ship-dec))
    ?>  ?=(%add-graph -.+.dm-inbox)
    =/  dm-graph            `(map @ud node:gra)`graph.+.+.dm-inbox
    ::  TODO for some reason the got by wont find certain @ud keys but will if listified (need to find way to typecast map keys)
    ::
    =/  dms-list            ~(tap by dm-graph)  
    =/  to-dms              (skim `(list [@ud node:gra])`dms-list |=(a=[@ud node:gra] (skim-dms a ship-dec)))
    =/  ship-dms            (snag 0 to-dms)
    ::  
    :: =/  to-dms              (~(got by dm-graph) `@ud`ship-dec)
    ?>  ?=(%graph -.children.+.ship-dms)
    =/  dm-posts            ^-((map atom node:gra) p.+.children.+.ship-dms)
    =/  dms                 (map-to-dms dm-posts)
    :: ::  TODO The below is not optimal, but need to keep moving
    =/  rolo                .^(rolodex:sur %gx /(scot %p our)/contact-store/(scot %da now)/all/noun)
    =/  contact             (form-contact-mtd rolo to-ship)
    =/  path                (spat /dm-inbox/(scot %p to-ship))
    [path (silt ~[to-ship]) %dm %graph-store (flop dms) ~[contact]]
  ::
  ++  received-dm
    |=  [ship-dec=@ud =node:gra our=ship now=@da]
    ^-  chat
    =/  to-ship             ^-(@p `@p`ship-dec)
    =/  message             (node-to-dm node)
    ::  for now we are going to include the contact data in a newly received dm
    ::  because it could possibly be a new dm and am not sure how to check for 
    ::  this yet
    =/  rolo                .^(rolodex:sur %gx /(scot %p our)/contact-store/(scot %da now)/all/noun)
    =/  contact             (form-contact-mtd rolo to-ship)
    =/  path                (spat /dm-inbox/(scot %p to-ship))
    [path (silt ~[to-ship]) %dm %graph-store [message ~] ~[contact]]
  :: 
  ++  form-contact-mtd
    |=  [rolo=rolodex:sur =ship]
    ^-  contact-mtd:sur
    =/  mtd       (~(get by rolo) ship)
    =/  avatar=(unit @t)
      ?~  mtd  (some '')
      avatar.u.mtd
    =/  color=@ux
      ?~  mtd  `@ux`(scan "0" hex:ag)
      color.u.mtd
    =/  nickname=@t
      ?~  mtd  ''
      nickname.u.mtd
    [color avatar nickname]
  ::
  ++  map-to-dms
    |=  [dm-posts=(map atom node:gra)]
    =/  dms=(list graph-dm:sur)
    %+  turn  (skim ~(tap by dm-posts) skim-maybe-node)
      |=  [idx=atom node=node:gra]
      (node-to-dm node)
    dms
  ::
  ++  node-to-dm
    |=  [node=node:gra]
    ^-  graph-dm:sur
    ?<  ?=(%| -.post.node)
    =/  p         ^-(post p.post.node)
    [index.p author.p time-sent.p contents.p]
  ::
  ++  index-to-str
    |=  ind=^index
    ?:  =(~ ind)
      '/'
    %+  roll  ind
    |=  [cur=@ acc=@t]
    ^-  @t
    =/  num  ^-(@u `@u`cur)
    (rap 3 acc '/' num ~)
  ::
  ++  skim-dms
    |=  [el=[ship-dec=@ud node=node:gra] key-dec=@ud]
    =(ship-dec.el key-dec)
  ::
  ++  is-our-message
    |=  [our=ship =chat:sur]
    =/  message       (rear messages.chat)
    =(author.message our)
  ::
  ::  Needed to hash group-dms
  ::
  ++  jael-scry
    |*  [=mold our=ship desk=term now=time =path]
    .^  mold
      %j
      (scot %p our)
      desk
      (scot %da now)
      path
    ==
  ::
  ++  sign
    |=  [our=ship now=time =hash]
    ^-  signature:signatures
    =+  (jael-scry ,=life our %life now /(scot %p our))
    =+  (jael-scry ,=ring our %vein now /(scot %ud life))
    :+  `@ux`(sign:as:(nol:nu:crub:crypto ring) hash)
      our
    life
  ::
  ++  add-hash-to-node
    |=  [our=@p now=@da =node:gra]
    ^-  [node:gra]
    ?>  ?=(%& -.post.node)
    =/  p  p.post.node
    =/  =hash:gra  
      =-  `@ux`(sham -)
      :^  ~
          author.p
        time-sent.p
      contents.p
    ::
    =/  hash-node  %_  node
      hash.p.post  `hash
    ::
        signatures.p.post
      %-  ~(gas in *signatures:gra)
      [(sign our now hash)]~
    ::
        children
        [%empty ~]
      ==
    [post.hash-node [%empty ~]]
  ::
  --
::
::  JSON
::
++  enjs
  =,  enjs:format
  |%
  ++  reaction :: encodes for on-watch
    |=  vi=reaction:sur
    ^-  json
    %-  pairs
    :_  ~
    ^-  [cord json]
    :-  -.vi
    ?-  -.vi
      :: ::
        %previews
      (chat-previews:encode chat-previews.vi)
      ::
        %dm-received
      (dm-log:encode chat.vi)
      ::
        %group-dm-created
      (preview:encode message-preview.vi)
      ::
        %invite-dm
      (preview:encode message-preview.vi)
    ==
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
        %inbox
      (chat-previews:encode chat-previews.vi)
      ::
        %dm-log
      (dm-log:encode chat.vi)
    ==
  --
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
      :~  [%send-dm dm]
          [%read-dm read-dm]
          [%create-group-dm cr-gp-dm]
          [%send-group-dm gp-dm]
          [%read-group-dm read-group-dm]
      ==
    ::
    ++  read-dm
      %-  ot
      :~  
          [%ship (su ;~(pfix sig fed:ag))]
      ==
    ::
    ++  read-group-dm
      %-  ot
      :~  
          [%resource dejs:res]
      ==
    ::
    ::
    ++  cr-gp-dm
      %-  ot
      :~  [%ships (as (su ;~(pfix sig fed:ag)))]
      ==
    ::
    ++  dm
      %-  ot
      :~  [%ship (su ;~(pfix sig fed:ag))]
          [%post pst]
      ==
    ::
    ++  gp-dm
      %-  ot
      :~  
          [%resource dejs:res]
          [%post pst]
      ==
    ::
    ++  pst
      %-  ot
      :~  [%author (su ;~(pfix sig fed:ag))]
          [%index index]
          [%time-sent di]
          [%contents (ar content)]
          [%hash (mu nu)]
          [%signatures (as signature)]
      ==
    ::
    ++  signature
      %-  ot
      :~  [%hash nu]
          [%ship (su ;~(pfix sig fed:ag))]
          [%life ni]
      ==
    ::
    ++  index  (su ;~(pfix fas (more fas dem)))
    ++  content
      %-  of
      :~  [%mention (su ;~(pfix sig fed:ag))]
          [%text so]
          [%url so]
          [%reference reference]
          [%code eval]
      ==
    ::
    ++  reference
      |^
      %-  of
      :~  graph+graph
          group+dejs-path:res
          app+app
      ==
      ::
      ++  graph
        %-  ot
        :~  group+dejs-path:res
            graph+dejs-path:res
            index+index
        ==
      ::
      ++  app
        %-  ot
        :~  ship+(su ;~(pfix sig fed:ag))
            desk+so
            path+pa
        ==
      --
    ::
    ++  tang 
      |=  jon=^json
      ^-  ^tang
      ?>  ?=(%a -.jon)
      %-  zing
      %+  turn
        p.jon
      |=  jo=^json
      ^-  (list tank)
      ?>  ?=(%a -.jo)
      %+  turn
        p.jo
      |=  j=^json
      ?>  ?=(%s -.j)
      ^-  tank
      leaf+(trip p.j)
    ::
    ++  eval
      %-  ot
      :~  expression+so
          output+tang
      ==
    ::
    ::
    --
  --
::
++  encode
  =,  enjs:format
  |%
  ++  chat-previews
    |=  list-view=(list message-preview)
    ^-  json
    %-  pairs
    %+  turn  list-view
      |=  cha=message-preview
      [path.cha (preview cha)]
  ::
  ++  preview
    |=  cha=message-preview
    ^-  json
    =/  to-field    
      ?:  
        ?| 
          =(%group type.cha) 
          =(%group-pending type.cha)
        ==
        a+(turn ~(tap in to.cha) |=(shp=@p s+(scot %p shp)))
      s+(scot %p (rear ~(tap in to.cha)))
    =/  mtd-field    
      ?:  
        ?| 
          =(%group type.cha) 
          =(%group-pending type.cha)
        ==
        a+(turn metadata.cha mtd)
      (mtd (rear metadata.cha))
    =/  invite-id
      ?:  =(%group-pending type.cha)
        s+(scot %uv (need invite-id.cha))
      ~
    %-  pairs
    :~  
        ['path' s+path.cha]
        :: ['index' (index index.dm)]
        ['to' to-field]
        ['type' s+(scot %tas type.cha)]
        ['source' s+(scot %tas source.cha)]
        ['lastTimeSent' (time last-time-sent.cha)]
        ['lastMessage' a+(turn last-message.cha content)]
        ['metadata' mtd-field]
        ['inviteId' invite-id]
        ['unreadCount' n+(scot %ud unread-count.cha)]
    ==
  ::
  ++  dm-log
    |=  cha=chat
    ^-  json
    =/  to-field    
      ?:  =(%group type.cha)  
        a+(turn ~(tap in to.cha) |=(shp=@p s+(scot %p shp)))
      s+(scot %p (rear ~(tap in to.cha)))
    =/  mtd-field    
      ?:  =(%group type.cha)  
        a+(turn metadata.cha mtd)
      (mtd (rear metadata.cha))
    %-  pairs
    :~ 
      ['path' s+path.cha]
      :: ['index' (index index.dm)]
      ['to' to-field]
      ['path' s+path.cha]
      ['type' s+(scot %tas type.cha)]
      ['source' s+(scot %tas source.cha)]
      ['messages' a+(turn messages.cha graph-dm)]
      ['metadata' mtd-field]
    ==
  ::
  ++  mtd
    |=  mtd=contact-mtd:sur
    ^-  json
    %-  pairs
    :~ 
        ['avatar' ?~(avatar.mtd ~ s+u.avatar.mtd)]
        ['nickname' s+nickname.mtd]
        ['color' s+(scot %ux color.mtd)]  ::  todo convert this to hex string here
    ==
  ::
  ++  index
    |=  ind=^index
    ^-  json
    :-  %s
    ?:  =(~ ind)
      '/'
    %+  roll  ind
    |=  [cur=@ acc=@t]
    ^-  @t
    =/  num  (numb cur)
    ?>  ?=(%n -.num)
    (rap 3 acc '/' p.num ~) 
  ::
  ++  content
    |=  c=^content
    ^-  json
    ?-  -.c
        %mention    (frond %mention s+(scot %p ship.c))
        %text       (frond %text s+text.c)
        %url        (frond %url s+url.c)
        %reference  (frond %reference (reference reference.c))
        %code
      %+  frond  %code
      %-  pairs
      :-  [%expression s+expression.c]
      :_  ~
      :-  %output
      ::  virtualize output rendering, +tank:enjs:format might crash
      ::
      =/  result=(each (list json) tang)
        (mule |.((turn output.c tank)))
      ?-  -.result
        %&  a+p.result
        %|  a+[a+[%s '[[output rendering error]]']~]~
      ==
    ==
  ++  graph-dm
    |=  dm=^graph-dm
    ^-  json
    %-  pairs
    :~ 
        ['index' (index index.dm)]
        ['author' s+(scot %p author.dm)]
        ['timeSent' (time time-sent.dm)]
        ['contents' a+(turn contents.dm content)]
    ==
  ::
  ++  reference
    |=  ref=^reference
    |^
    %+  frond  -.ref
    ?-  -.ref
      %graph  (graph +.ref)
      %group  (group +.ref)
      %app    (app +.ref)
    ==
    ::
    ++  graph
      |=  [grp=res gra=res idx=^index]
      %-  pairs
      :~  graph+s+(enjs-path:res gra)
          group+s+(enjs-path:res grp)
          index+(index idx)
      ==
    ::
    ++  group
      |=  grp=res
      s+(enjs-path:res grp)
    ::
    ++  app
      |=  [=^ship =desk p=^path]
      %-  pairs
      :~  ship+s+(scot %p ship)
          desk+s+desk
          path+(path p)
      ==
    --
  ::
  --
  ::
--