/-  *realm-wallet
/+  bech32=bip-b173, bip32, ethereum
|%
++  bip44-codes
  ^-  (map network @ud)
  %-  my
  :~  [%bitcoin 0]
      [%btctestnet 1]
      [%ethereum 60]
  ==
::
++  new-address
  |=  [xpub=@t =network idx=@ud]
  =,  hmac:crypto
  =,  secp:crypto
  =+  ecc=secp256k1
  =/  code  (~(got by bip44-codes) network)
  =/  xpub-bip32  (from-extended:bip32 (trip xpub))
  =/  path  "{<idx>}"
  =/  derived-pub  (derive-path:xpub-bip32 path)
  :-  ?-  network
        %bitcoin
          (address:derived-pub %main)
        %btctestnet
          (address:derived-pub %testnet)
        %ethereum
          (address-from-pub:key:ethereum (serialize-point.ecc pub:derived-pub))
      ==
  =/  path  "m/44'/{<code>}'/0'/0/{<idx>}"
  (crip path)
::
++  split-xpub
  |=  xpub=@
  ^-  [@ @]
  :-  (rsh 8 xpub)
  (end 8 xpub)
::
++  btc-address
  |=  [ki=@ ci=@]
  ^-  address
  *address
::
++  hex-from-cord
  |=  transaction
  0
::
++  json-to-transaction
  =,  dejs:format
  |=  =json
  ^-  transaction
  =/  tx
    ^-  help-transaction
    %.  json
    :~  (ot ~[hash+so network+(su (perk %bitcoin %ethereum ~)) type+(su (perk %sent %received ~)) initiated-at+so completed-at+so:dejs-soft:format our-address+so their-patp+so:dejs-soft:format their-address+so status+(su (perk %pending %failed %succeeded ~)) failure-reason+so:dejs-soft:format notes+so])
    ==
  :*  hash.tx
      network.tx
      type.tx
      initiated-at.tx
      completed-at.tx
      our-address.tx
      ?~  their-patp.tx  ~
      [~ `@p`(slav %p u.their-patp.tx)]
      their-address.tx
      status.tx
      failure-reason.tx
      notes.tx
  ==
::
++  transaction-to-json
  =,  enjs:format
  |=  =transaction
  ^-  json
  %-  pairs
    :~  ['hash' [%s hash.transaction]]
        ['network' [%s network.transaction]]
        ['type' [%s type.transaction]]
        ['initiatedAt' [%s initiated-at.transaction]]
        :-  'completedAt'
          ?~  completed-at.transaction  ~
          [%s u.completed-at.transaction]
        ['ourAddress' [%s our-address.transaction]]
        :-  'theirPatp'
          ?~  their-patp.transaction  ~
          [%s (crip (scow %p u.their-patp.transaction))]
        ['theirAddress' [%s their-address.transaction]]
        ['status' [%s status.transaction]]
        :-  'failureReason'
          ?~  failure-reason.transaction  ~
          [%s u.failure-reason.transaction]
        ['notes' [%s notes.transaction]]
    ==
::
++  dejs-action
  =,  dejs:format
  |=  jon=json
  ^-  action
  %.  jon
  %-  of
  :~  [%set-xpub (ot ~[network+(su (perk %bitcoin %btctestnet %ethereum ~)) xpub+so])]
      [%set-settings (ot ~[network+(su (perk %bitcoin %btctestnet %ethereum ~)) mode+(su (perk %default %on-demand ~)) who+(su (perk %nobody %friends %anybody ~)) blocked+(as (se %p)) share-index+ni])]
      [%set-wallet-creation-mode (ot ~[mode+(su (perk %on-demand %default ~))])]
      [%set-sharing-mode (ot ~[who+(su (perk %nobody %friends %anybody ~))])]
      [%set-sharing-permissions (ot ~[type+(su (perk %allow %block ~)) who+(se %p)])]
      [%set-default-index (ot ~[network+(su (perk %bitcoin %btctestnet %ethereum ~)) index+ni])]
      [%set-wallet-nickname (ot ~[network+(su (perk %bitcoin %btctestnet %ethereum ~)) index+ni nickname+so])]
      [%create-wallet (ot ~[sndr+(se %p) network+(su (perk %bitcoin %btctestnet %ethereum ~)) nickname+so])]
      [%set-transaction (ot ~[network+(su (perk %bitcoin %btctestnet %ethereum ~)) net+so wallet+ni hash+json-to-ux transaction+json-to-transaction])]
      [%save-transaction-notes (ot ~[network+(su (perk %bitcoin %btctestnet %ethereum ~)) net+so wallet+ni hash+so notes+so])]
  ==
::
++  json-to-ux
  =,  dejs:format
  |=  =json
  ^-  @ux
  (scan (trip (so json)) ;~(pfix (jest '0x') hex))
::
++  transactions-to-json
  =,  enjs:format
  |=  transactions=(map net=@t (map @t transaction))
  ^-  json
    %-  pairs
    =/  tx-list  ~(tap by transactions)
    %+  turn  tx-list
    |=  [net=@t transactions=(map @t transaction)]
    ^-  [@t json]
    :-  net
      %-  pairs
      =/  tx-list  ~(tap by transactions)
      %+  turn  tx-list
      |=  [key=@t =transaction]
      ^-  [@t json]
      [key (transaction-to-json transaction)]
::
++  enjs-update
  =,  enjs:format
  |=  =update
  ^-  json
  ?-    -.update
      %address
    %-  pairs
    ?~  address.update
      ['address' ~]~
    :~  ['address' [%s (crip (z-co:co u.address.update))]]
    ==
  ::
      %transaction
    %-  pairs
    :~  ['network' [%s network.update]]
        ['net' [%s net.update]]
        ['index' (numb +>+<.update)]
        ['key' [%s +>+>-.update]]
        ['transaction' (transaction-to-json +>+>+.update)]
    ==
  ::
      %wallet
    ^-  json
    %-  pairs
    ^-  (list [@t json])
    :~  ['network' [%s network.update]]
        ['key' [%s +>-.update]]
        ?:  ?|  =(network.update %bitcoin)
                =(network.update %btctestnet)
            ==
          ['address' [%s (crip q:(trim 2 (scow %uc address.wallet.update)))]]
        ['address' [%s (crip (z-co:co address.wallet.update))]]
        ['path' [%s path.wallet.update]]
        ['nickname' [%s nickname.wallet.update]]
    ==
  ::
      %wallets
    %-  pairs
    ^-  (list [@t json])
    |^
    =/  wallet-list  ~(tap by +.update)
    %+  turn  wallet-list
      jsonify-wallet-map
    ++  jsonify-wallet-map
      |=  [=network wallets=(map @ud =wallet)]
      ^-  [@t json]
      |^
      =/  wallet-list
        ^-  (list [@ud =wallet])
        ~(tap by wallets)
      :-  `@t`network
        %-  pairs
        ^-  (list [@t json])
        %+  turn  wallet-list
          jsonify-wallet
      ++  jsonify-wallet
        |=  [key=@ud =wallet]
        ^-  [@t json]
        :-  (crip (scow %ud key))
            %-  pairs
            ^-  (list [@t json])
            :~  ?:  ?|  =(network %bitcoin)
                        =(network %btctestnet)
                    ==
                  ['address' [%s (crip q:(trim 2 (scow %uc address.wallet)))]]
                ['address' [%s (crip (z-co:co address.wallet))]]
                ['path' [%s path.wallet]]
                ['nickname' [%s nickname.wallet]]
                ['transactions' (transactions-to-json transactions.wallet)]
            ==
      --
    --
  ::
      %settings
    %-  pairs
    ^-  (list [@t json])
    :~  ['sharingMode' [%s who.sharing.update]]
        ['walletCreationMode' [%s wallet-creation.sharing.update]]
        :: ['whitelist' [%s 'test']]
        ['defaultIndex' (numb 0)]
        :-  'blocked'
          :-  %a
            ^-  (list json)
            =/  blocklist  ~(tap in blocked.sharing.update)
            %+  turn  blocklist
              |=  blocked=@p
              [%s (scot %p blocked)]

    ==
  ==
--
