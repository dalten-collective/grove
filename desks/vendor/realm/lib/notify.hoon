/-  hark=hark-store, resource, spaces
:: 
::  Lib for notifying via hark
::
|%
::
++  notify
  |=  [pth=space-path:spaces slug=path msg=cord now=@da]
  ^-  action:hark
  :+  %add-note  `bin:hark`[/ [%realm /spaces/(scot %p ship.pth)]]
  :*  [ship/ship.pth text/msg ~]
      ~
      now
      /
      %-  weld
      :-  /spaces/(scot %p ship.pth)/(scot %tas space.pth)
      slug
  ==
::
--