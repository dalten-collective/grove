::  :grove|add-node [~zod %space] 'name' 'a description' 'url' '.pdf'
::
:-  %say
|=  $:  [now=@da eny=@uvJ bec=beak]
        flag=(pair ship term)
        trail=path
        title=@t
        desc=@t
        url=cord
        ext=cord
    ==
=+  node
  :-  ?:(=(p.bec p.flag) %record %remote)
  [url [%0 now p.bec title desc ext]]
[%grove-action flag %add (sham trail node) trail node]