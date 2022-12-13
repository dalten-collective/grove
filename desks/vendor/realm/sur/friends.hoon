::  friends [realm]
::
/-  resource, contact-store, membership
|%
::
::  $friends: specifically used for the our space.
::
+$  friends     (map ship friend)
+$  is-public   ?
::
::  $friend: specifically used for the our space, keeps track of another
::    ship and allows metadata.
::
+$  friend-state  ?(%added %mutual)
+$  friend-tags   (set cord)
+$  friend  
  $:  pinned=?
      tags=friend-tags
      status=?(%fren %following %follower)
  ==  
::
::
+$  action
  $%  
      [%add-friend =ship]
      [%edit-friend =ship pinned=? tags=friend-tags]
      [%remove-friend =ship]
      ::  Poke friend actions
      [%be-fren ~]
      [%yes-fren ~]
      [%bye-fren ~]
  ==
::
+$  reaction
  $%  
      [%friends =friends]
      [%friend =ship =friend]     ::  reacts when on update to existing friend
      [%new-friend =ship =friend] ::  reacts when a new friend is addedd
      [%bye-friend =ship]         ::  reacts when a friend is removed 
  ==
::
::  Scry views
::
+$  view
  $%  
      [%friends =friends]
  ==
::
--
