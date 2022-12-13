|%
::
+$  spat    (pair ship cord)
::
+$  id      @uvTROVE
+$  mods    (set @p)
+$  regs    (map trail perm)
+$  role    ?(%member %admin %moderator)
+$  team
  %-  list
  $:  spat
      administrators=(set @p)
      moderators=(set @p)
      members=(set @p)
  ==
::
+$  node    [?(%remote %record) url=cord dat=data:meta]
::
+$  trail   path
+$  tract   (map id node)
+$  trove   (axal tract)
::
::
++  meta
  |%
  +$  data
    $:  %0
        from=@da
        by=@p
        title=cord
        description=cord
        extension=cord
        ::  hash?
        ::  type? <video, text, image, etc>
    ==
  --
::  
++  perm
  =<  perms
  ::  should be heirarchical?
  |%
  +$  perms
    $:  %0
        $=  files
        $:  add=(set role)
            edit=(set role)
            move=(set role)
            delete=(set role)
        ==
      ::
        $=  folder
        $:  read=(set role)
            add=(set role)
            edit=(set role)
            move=(set role)
            delete=(set role)
            ch-mod=(set role)
        ==
    ==
  --
::
++  poke
  |%
  +$  action  (pair spat poke:poke)
  +$  poke    $%(admin redo nodes folder)
  ::
  +$  admin
    $%  [%add-moderators (set @p)]
        [%rem-moderators (set @p)]
    ==
  ::
  +$  redo
    $%  [%repeat =id from=trail to=(pair spat trail)]
        [%reperm =trail pur=(unit perm)]
    ==
  ::
  +$  nodes
    $%  [%add-node =id =trail =node]
        [%rem-node =id =trail]
        [%edit-node =id =trail tut=(unit @t) dus=(unit @t)]
        [%move-node =id from=trail to=trail]
    ==
  ::
  +$  folder
    $%  [%add-folder =trail nam=cord pur=(unit perm)]
        [%rem-folder =trail]
        [%move-folder from=trail to=trail]
    ==
  --
++  fact
  =<  (pair spat facts)
  |%
  +$  facts  $%(start poke:poke)
  +$  start  [%start (pair regs trove)]
  --
--