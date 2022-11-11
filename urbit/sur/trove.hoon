|%
::
+$  spat    (pair ship cord)
::
+$  id      @uvTROVE
+$  team    [admins=(set @p) moderators=(set @p) members=(set @p)]
+$  regs    (map path perm)
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
+$  action
  (pair spat poke:poke)
++  poke
  |%
  +$  poke
    $%(mix-up record remote folder)
  ::
  +$  admin
    $%  [%add-moderators (set @p)]
        [%rem-moderators (set @p)]
    ==
  ::
  +$  mix-up
    $%  [%rehome =id =trail]
        [%repeat =id from=trail to=(pair spat trail)]
    ==
  ::
  +$  record
    $%  [%add-record =trail url=cord meta=data:meta]
        [%edit-record =id =trail meta=data:meta]
        [%move-record =id from=trail to=trail]
        [%delete-record =id =trail]
    ==
  ::
  +$  remote
    $%  [%add-remote =trail url=cord meta=data:meta]
        [%edit-remote =id =trail meta=data:meta]
        [%move-remote =id from=trail to=trail]
        [%delete-remote =id =trail]
    ==
  ::
  +$  folder
    $%  [%add-folder =trail nam=cord pur=(unit perm)]
        [%delete-folder =id =trail]
        [%permission-folder pur=(unit perm)]
        [%edit-folder =id =trail nam=(unit cord)]
        [%move-folder =id from=trail to=trail]
    ==
  --
--