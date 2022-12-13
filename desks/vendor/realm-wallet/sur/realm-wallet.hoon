|%
::  basic types
::
+$  address  @u
+$  network  ?(%bitcoin %btctestnet %ethereum)
+$  transaction
  $:  hash=@t
      =network
      type=?(%sent %received)
      initiated-at=@t
      completed-at=(unit @t)
      our-address=@t
      their-patp=(unit @p)
      their-address=@t
      =status
      failure-reason=(unit @t)
      notes=@t
  ==
+$  help-transaction
  $:  hash=@t
      =network
      type=?(%sent %received)
      initiated-at=@t
      completed-at=(unit @t)
      our-address=@t
      their-patp=(unit @t)
      their-address=@t
      =status
      failure-reason=(unit @t)
      notes=@t
  ==
+$  status  ?(%pending %failed %succeeded)
+$  eth-type  ?(%erc20 %erc721 %eth)
+$  wallet  [=address path=@t nickname=@t transactions=(map net=@t (map @t transaction))]
+$  mode  ?(%on-demand %default)
+$  pending-tx  [txh=(unit @ux) from=@ux to=@ux amount=@ud]
+$  txn  [block=@ud txh=@ux log-index=@ud from=@ux to=@ux amount=@ud]
+$  txn-log  (list txn)
+$  contract-type  ?(%erc20 %erc721)
+$  sharing
  $:  who=?(%nobody %friends %anybody)
      wallet-creation=mode
      whitelist=(set @p)
      blocked=(set @p)
  ==
::  poke actions
::
+$  action
  $%  [%initialize ~]
      [%set-xpub =network xpub=@t]
      [%set-settings =network =mode who=?(%nobody %friends %anybody) blocked=(set who=@p) share-index=@ud]
      [%set-wallet-creation-mode =mode]
      [%set-sharing-mode who=?(%nobody %friends %anybody)]
      [%set-sharing-permissions type=?(%allow %block) who=@p]
      [%set-default-index =network index=@ud]
      [%set-wallet-nickname =network index=@ud nickname=@t]
      [%create-wallet sndr=ship =network nickname=@t]
      [%request-address =network from=@p]
      [%receive-address =network address=(unit address)]
      [%set-transaction =network net=@t wallet=@ud hash=@ =transaction]
      [%save-transaction-notes =network net=@t wallet=@ud hash=@t notes=@t]
  ==
::  subscription updates
::
+$  update
  $%  [%address =ship =network address=(unit address)]
      [%transaction =network net=@t @ud @t transaction]
::      [%history transactions]
      [%wallet =network @t =wallet]
      [%wallets wallets]
      [%settings settings]
  ==
::  stores
::
+$  wallets  (map =network (map @ud wallet))
+$  settings
  $:  =sharing
      networks=(map network [xpub=(unit @t) default-index=@ud])
  ==
--
