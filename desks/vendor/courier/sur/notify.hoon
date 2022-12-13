|%

+$  player-id         cord
+$  device-id         cord
+$  app-id            cord
+$  rest-api-key      cord 
+$  uuid              @uvH
+$  devices           (map device-id player-id)
::
::
+$  notification
  $:  =app-id                       ::  the onesignal app-id for realm
      data=mtd                      ::  { path: "/dm-inbox/~lomder-librun" }
      :: title=(map cord cord)      ::  {"en": "~lomder-librun"}
      subtitle=(map cord cord)      ::  {"en": "New message"}
      contents=(map cord cord)      ::  {"en": "from ~dev"}
  ==
::
+$  mtd
  $:  path=cord 
  ==
::
+$  action
  $%  [%enable-push ~]            
      [%disable-push ~]
      [%set-device device-id=cord player-id=cord]
      [%remove-device device-id=cord]  
  ==
::
+$  view
  $%  
      [%devices =devices]
  ==
--

