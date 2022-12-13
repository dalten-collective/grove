:: rooms is a whitelisting utility
::
::
:: a ship can only be in one room at a time
::    this could be extended, but i kinda like it
::    it simplifies some use cases, but makes others impossible
::    and something like this needs to be radically simple for other apps to use
::
:: other apps can use ROOM
:: to configure arbitrarily permissioned
:: p2p comms
::
:: e.g.
:: pokur
:: webrtc group calls
:: shared documents
:: club penguin ;)
::
:: the intended use is for other agents to
::   simply scry out %present or %whitelist
::   and block pokes from ships who are not in the set
::
:: :: :: :: ::
::
::  PROVIDER
::  app/rooms/hoon
::  
::  CLIENT
::  app/room/hoon
::
/-  spaces=spaces-store
|%
+$  rid       @t
+$  title     cord
+$  capacity  @ud
+$  access    ?(%public %private)
+$  room
  $:  =rid
      provider=ship
      creator=ship
      =access
      =title
      present=(set ship)
      whitelist=(set ship)  :: only used if access is %private
      capacity=@ud
      space=(unit cord)     :: space-path is provider/space-name
  ==
::
+$  view
  $%  $:  %full
          my-room=(unit room)
          provider=(unit ship)
      ==
    [%present ships=(set ship)]
    [%whitelist ships=(set ship)]
    ::
    [%provider who=(unit ship)]
  ==
::
:: actions for hitting the provider.
:: user   -> client
:: agent  -> client
:: client -> server
+$  action
  $%  [%set-provider =ship]          :: whose %rooms agent
      [%logout ~]                    :: set provider to null
      ::
      [%enter =rid]
      [%exit ~]
      [%create =rid =access =title]
      [%set-title =rid =title]
      [%set-access =rid =access]
      [%set-capacity =rid =capacity]
      [%set-space =rid space=cord]
      [%invite =rid =ship]
      :: TODO? [%invite-ships =rid ships=(set ship)]
      :: TODO? [%promote =rid =ship]  :: add to whitelist
      [%kick =rid =ship]
      [%delete =rid]
      [%request =rid]   :: request latest info on a room
      [%request-all ~]  :: request all info on all rooms
      :: TODO? %request-space =space-path:spaces  
      ::
      [%chat =cord]
  ==
::
:: updates
:: server -> client
:: client -> user
:: client -> client  (just %chat)
+$  update-diff
  $%  [%enter =ship]
      [%exit =ship]
      [%other ~]
  ==
::
+$  update
  $%  
    ::
    :: updates from provider
    :: app/rooms -> app/room
      [%room =room diff=update-diff]
      [%rooms rooms=(set room)]
    ::
      [%invited provider=ship =rid =title =ship]
      [%kicked provider=ship =rid =title =ship]  
    ::
    :: chat is thrown in as an after thought.
    ::   its a simple example of using the (set ship) as a whitelist
    ::   and it makes sure every room comes with a group chat by default
    ::
    :: updates from peers in my room
    :: come in as pokes, denied unless they are from someone in my room
    :: app/room -> app/room
      [%chat from=ship content=cord]
    ==
::
:: server actions
+$  server-action
  $%  [%set-online online=?]
      [%ban =ship]
      [%unban =ship]
      [%ban-set ships=(set ship)]
      [%unban-set ships=(set ship)]
      [%unban-all ~]
  ==
::
:: i tell provider what room im in
:: provider tells subs what room everyone is in
::
:: everyone keeps a copy of their room, from their provider
::
:: local copy is used to whitelist
::
--
