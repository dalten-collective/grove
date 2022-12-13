::  courier [realm]
::
/-  *post, *resource
|%

+$  chat-type  ?(%group %dm %pending %group-pending)
+$  source  ?(%graph-store %chatstead)
::
::  $message: a generalized message structure for Realm
::
+$  graph-dm
  $:  index=(list atom)     :: Can be either a group chat graph index or single dm-inbox graph index (or later chatstead)
      author=ship
      time-sent=@da
      contents=(list content)
  ==
::
::  TODO parse the new chatstead message
::
+$  chatstead-dm
  $:  
    id=(list atom)    
    author=ship
    time-sent=@da
    contents=(list content)
  ==
::
+$  contact-mtd
  $:  
    color=@ux
    avatar=(unit @t)
    nickname=@t
  ==
::
+$  chat
  $:  
    path=cord
    to=(set ship)
    type=chat-type
    =source
    messages=(list graph-dm)
    metadata=(list contact-mtd)
  ==
::
:: +$  paged-chat
::   $:  path=cord     :: Can be either a group dm association or single dm-inbox graph association
::       to=ship
::       type=chat-type
::       =source
::       offset=@u     ::  what page we are viewing
::       count=@u      ::  the amount of messages per page
::       pages=@u      ::  the total number of page
::       messages=(list graph-dm)
::       metadata=contact-mtd
::   ==
::
:: +$  chat-previews     (map ship message-preview)
+$  chat-previews     (list message-preview)
+$  message-preview
  $:  
    path=cord
    to=(set ship)
    type=chat-type
    =source
    last-time-sent=@da
    last-message=(list content)
    metadata=(list contact-mtd)
    invite-id=(unit @uvH)
    unread-count=@ud
  ==
::
::  %contact-store
::
+$  rolodex  (map ship contact)
+$  contact
  $:  nickname=@t
      bio=@t
      status=@t
      color=@ux
      avatar=(unit @t)
      cover=(unit @t)
      groups=(set resource)
      last-updated=@da
  ==
:: 
::
::
+$  action
  $%  
      :: [%accept-dm =ship]
      :: [%decline-dm =ship]
      :: [%pendings ships=(set ship)]
      :: [%screen screen=?]
      :: 
      [%send-dm =ship =post]
      [%read-dm =ship]
      [%create-group-dm ships=(set ship)]
      [%send-group-dm =resource =post]
      [%read-group-dm =resource]
  ==
::
+$  reaction
  $%  
      [%previews =chat-previews]              ::  loads a list of all dms
      [%dm-received =chat]                    ::  a newly received dm-message
      [%group-dm-created =message-preview]    ::  a newly created group dm
      [%invite-dm =message-preview]           ::  a pending request for dm 
  ==
::
::  Scry views
::
+$  view
  $%  
      [%inbox =chat-previews]               ::  loads a slim preview of data for fast loading
      [%dm-log =chat]                       ::  loads the full message list and metadata for a chat
      :: [%paged-chat =paged-chat]          ::  loads a windowed chat using offset and count
  ==
::
::
::  %group-store types
::
+$  groups  (map resource group)
::
+$  group-tag  ?(role-tag)
::
+$  tag  $@(group-tag [app=term =resource tag=term])
::
+$  role-tag
  ?(%admin %moderator %janitor)
::
+$  tags  (jug tag ship)
::
+$  group
  $:  members=(set ship)
      =tags
      =policy
      hidden=?
  ==

::  $policy: access control for a group
::
++  policy
  =<  policy
  |%
  ::
  +$  policy
    $%  invite
        open
    ==
  ::  $diff: change group policy
  +$  diff
    $%  [%invite diff:invite]
        [%open diff:open]
        [%replace =policy]
    ==
  ::  $invite: allow only invited ships
  ++  invite
    =<  invite-policy
    |%
    ::
    +$  invite-policy
      [%invite pending=(set ship)]
    ::  $diff: add or remove invites
    ::
    +$  diff
      $%  [%add-invites invitees=(set ship)]
          [%remove-invites invitees=(set ship)]
      ==
    --
  ::  $open: allow all unbanned ships of approriate rank
  ::
  ++  open
    =<  open-policy
    |%
    ::
    +$  open-policy
      [%open ban-ranks=(set rank:title) banned=(set ship)]
    :: $diff: ban or allow ranks and ships
    ::
    +$  diff
      $%  [%allow-ranks ranks=(set rank:title)]
          [%ban-ranks ranks=(set rank:title)]
          [%ban-ships ships=(set ship)]
          [%allow-ships ships=(set ship)]
      ==
    --
  --
--