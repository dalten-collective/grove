|%
::
+$  spat    (pair ship cord)
::
+$  id      @uvTROVE
+$  team    [admins=(set @p) moderators=(set @p) members=(set @p)]
+$  regs    (map trail perm)
+$  role    ?(%member %admin %moderator)
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
    ==
  --
::  
++  perm
  =<  perms
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
    $%  [%rehome =id =trail]
        [%repeat =id from=trail to=(pair spat trail)]
    ==
  ::
  +$  nodes
    $%  [%add-node =trail =node]
        [%rem-node =id =trail]
        [%edit-node =id =trail tut=(unit @t) dus=(unit @t)]
        [%move-node =id from=trail to=trail]
    ==
  ::
  +$  folder
    $%  [%add-folder =trail nam=cord pur=(unit perm)]
        [%rem-folder =trail]
        [%move-folder from=trail to=trail]
        [%permission-folder =trail pur=(unit perm)]
    ==
  --
++  fact
  =<  (pair spat facts)
  |%
  +$  facts  $%(new start poke:poke)
  +$  new    [%new =id =trail =node]
  +$  start  [%start (pair regs trove)]
  --
--