::  :trove|add-node [~zod %space] 'name' 'a description' 'url' '.pdf'
::
:-  %say
|=  $:  [now=@da eny=@uvJ bec=beak]
        spat=(pair ship cord)
        trail=path
        title=@t
        desc=@t
        url=cord
        ext=cord
    ==
=+  node
  :-  ?:(=(p.bec p.spat) %record %remote)
  [url [%0 now p.bec title desc ext]]
[%trove-action spat %add (sham trail node) trail node]