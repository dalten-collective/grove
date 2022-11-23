# JSON responses and request structures

## General Overview
- Trove State
  * Trove maintains, per Space (read group) you're aware of, the following:
    - **Moderators** - a set of ships who are members w/ elevated permissions
      > NOTE: "Administrators" and "Members" are defined by Spaces, and get scried in for front end display
    - **Regulations** - a series of rules for who can do what, per file (see permission object)
    - **Trove** - A folder/file structure

- Trove Pokes
  * Pokes all take a `trove-action` mark, and are sent as a `[space poke]` pair.
  * To identify which spaces are available, review the initial state or scry `/x/hosts/json`

  - Moderation - These must be members, just another permission class
    - `add-moderators` adds moderators to the trove, these must be members
    - `rem-moderators` removes moderators from a trove

  - Errata
    - `repeat` copy one file to another space/folder location (or same space, different folder)
    - `reperm` repermissions a folder and handles cascade effects
    - `rehome` 
      * REHOME is a Front End Activity.
      * This is low priority.
      * Activity: Take a `"remote"` type node, resubmit it as a `"record"` type (by sending the file to your own S3/IPFS node).

  - Files
    - `add-node` adds a file to a folder
    - `rem-node` removes a file from a folder
    - `edit-node` edits either the title, description or both of a file
    - `move-node` moves (delete, add elsewhere) a file from here to there

  - Folder
    - `add-folder` adds a folder to the system (with an empty map of files), maybe permissioned
    - `rem-folder` deletes a folder and its subfolders
    - `move-folder` moves a folder from this container to that, adjusts its permissions

- Available Scries
> Note - You should always be getting back relevant information from your pokes / other activity occurring in the system. Nonetheless, these scries are always, also, available to provide up-to-date information

- `/x/state/json`
  * returns the state, as on initial subscription

- `/x/hosts/json`
  * returns all spaces you know about that may or may not have active troves (they get bunted just to keep up to speed, but may not have files - I can change this to whether you have an active subscription - let me know if you need that)
  * response:
  
  ```json
  [ "~zod/test", "~wet/this", "~rabsef-bicrym/my-trove" ]
  ```

- `/x/team/<host-ship>/<space-name>/json`
  * you must provide the ship name and space name
  * response:

  ```json
  [
    {
      "~zod/test" : {
        "admins" : ["~zod", "~wet"],  // some array of ships
        "moderators" : [],
        "members" : ["~zod", "~wet", "~dys"]
      }
    }
  ]
  ```

- `/x/teams/json`
  * get all teams
  * response:

  ```json
  [
    {
      "~zod/test" : {
        "admins" : ["~zod"],
        "moderators" : ["~dev"],
        "members" : ["~zod", "~dev", "~rabsef-bicrym"]
      }
    }
  ]
  ```

- `/x/regs/<host-ship>/<space-name>/json`
  * **NOTE:** Probably don't use this - just use /folder/perms, below
  * you must provide the ship name and space name
  * response:

  ```json
  {
    "/" : {<permission object>},
    "/folder-one" : {<permission object>},
    "/folder-one/sub-folder" : {<permission object>}
  }
  ```

- `/x/folder/<host-ship>/<space-name>/<folder-path>/json`
  * you must provide the ship name, space name **AND** folder path
  * response:
  
    either:

    ```json
    null
    ```

    or:
    
    ```json
    {
      "0v12345.abcde" : {<node objects>},  // some files
      "0v23456.bcdef" : {<node objects>}
    }
    ```


- `/x/folder/perms/<host-ship>/<space-name>/<folder-path>/json`
  > NOTE: AKA PERMISSION OBJECT

  * you must provide the ship name, space name **AND** folder path
  * response:

  ```json
  {
    "files" :
      {
        "add" : ["admin", "member"],
        "edit" : ["admin"],
        "move" : ["admin"],
        "delete" : ["admin"]
      },
    "folders" :
      {
        "read" : ["admin", "member", "moderator"],
        "add" : ["admin"],
        "edit" : ["admin"],
        "move" : ["admin"],
        "delete" : ["admin"],
        "ch-mod" : ["admin"]
      }
  }
  ```

- `/x/node/<host-ship>/<space-name>/<file-id>/<folder-path>/json`
  > NOTE: AKA NODE OBJECT

  * you have to provide all that shit
  * response:

  ```json
  {
    "type" : "remote" || "record",  // one or the other
    "url" : "http://ipfs.node/path/to/file",
    "data" :
      {
        "from" : "3112330",  //unix time
        "by" : "~wet",
        "title" : "a file",
        "description" : "a really nice file, check it out",
        "extension" : ".exe"
      }
  }
  ```

- Available Subscriptions
Just the one, at `/web-ui`

## Responses

> NOTE: Responses may be received, from time to time, "unprompted", as a result of OTHER USERS' ACTIONS. This is to be expected and should be interpreted as canonical.


### `start` / initial state

On initial subscription:

```json
// initial subscription / full state
{
  "version" : "0",
  "troves" : 
    {
      "~zod/test" : 
        {
          "team" : { "moderators" : ["~zod", "~wet"] },  // note, get admins and members, if you need them, using a scry
          "regs" : 
            {
              "/" : { <permission object> },
              "/folder-one" : {<permisison object>},
              "/folder-one/sub-folder" : {<permission object>}
            },
          "trove" : 
            {
              "0v12345.abcde" : { <node object> }
            }
        }
    }
}
```

## Spaces Removed

From time to time, a space may be removed - meaning you lost access or deleted it, if it was your own. This will be automatically handled by the backend. The frontend will get a:

```json
{
  "remove" :
    { "space-path" : "~sampel-palnet/test-space" }
}
```

On this event, rescry the state or delete the trove or otherwise identify that this trove ceased to exist, for the user (be it their own or someone elses, same result).

## Requests / Pokes / Scries

All pokes will be of the form:

```javascript
urbitAPI      // however you've instantiated the object
    .poke({
      app: "trove",
      mark: "some-mark-name",
      json: { }, // some json here
    })
```

The `json` entry above should take one of the following forms:

### Add Moderators

mark: `trove-action`

> User must be the host

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "poke" : { "add-moderators" : ["~zod", "~wet"] }
}
```

Will return (on original subscription socket)

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "add" : {
    "team" : {
      "moderators" : ["~zod" "~wet"],  // NOTE: if you send me non-members, they will be removed here - so if you sent ~rabsef and ~rabsef wasn't part of this trove, he won't become a moderator and you'll get an empty set back.
  }
}
```
---

### Rem Moderators

mark: `trove-action`

> User must be the host

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "poke" : { "rem-moderators" : ["~zod", "~wet"] }
}
```

Will return (on original subscription socket)

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "rem" : {
    "team" : {
      "moderators" : ["~zod" "~wet"],
  }
}
```
---


### Add file (node == file)

mark: `trove-action`

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "poke" : {
    "add-node" : {
      "trail" : "/path/for/file",
      "node" : {
        "url" : "https://aws.com/myfile",
        "dat" : {
          "title" : "the-filename",
          "description" : "Optional long description",
          "extension" : ".png"
        }
      }
    }
  }
}
```

Will return (on original subscription socket)

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "add" : {
    "node" : {
      "trail" : "/path/for/file",
      "node" : {
        "0v23456.abcde" : {
          "type" : "remote",
          "url" : "https://aws.com/myfile",
          "dat" : {
            "from" : 32223100,
            "by" : "~sampel-palnet",
            "title" : "the-filename",
            "description" : "Optional long description",
            "extension" : ".png"
          }
        }
      }
  }
}
```
---

### Remove file (node == file)

mark: `trove-action`

> ID must exist, User must have `delete:file` permissions @ that folder

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "poke" : {
    "rem-node" : {
      "id" : "0v12345.abcde",
      "trail" : "/path/for/file"  // this is a folder
    }
  }
}
```

Will return (on original subscription socket)

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "rem" : {
    "node" : {
      "trail" : "/path/for/file",
      "id" : "0v12345.abcde"
  }
}
```
---

### Edit file (node == file)

mark: `trove-action`

> ID must exist, User must have `edit:file` permissions @ that folder

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "poke" : {
    "edit-node" : {
      "id" : "0v12345.abcde",
      "trail" : "/path/for/file",
      "tut" : null || "new file title",
      "dus" : null || "new file description"
      }
    }
  }
}
```

Will return (on original subscription socket)

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "upd" : {
    "node" : {
      "id" : "0v12345.abcde",
      "trail" : "/path/for/file",
      "title" : null || "new title", // if null, keep old title
      "description" : null || "new description" // if null, keep old description
  }
}
```
---

### Move file (node == file)

mark: `trove-action`

> ID must exist, User must have `move:file` perms @ `from`, `add:file` perms @ `to`.
> `to` must already exist

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "poke" : {
    "move-node" : {
      "id" : "0v12345.abcde",
      "from" : "/path/to/file",
      "to" : "/new/folder/path"
      }
    }
  }
}
```

Returns Add Nodes and Remove Nodes as appropriate.
---

### Add folder

mark: `trove-action`

Include a `pur` object to set permissions on creation:

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "poke" : {
    "add-folder" : {
      "trail" : "/path/for/file",
      "nam" : "the-folder-name",
      "pur" : { <permission object> }
    }
  }
}
```

Alternatively, to use the permissions of the parent folder,
pass a `null` for `pur`:

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "poke" : {
    "add-folder" : {
      "trail" : "/path/for/file",
      "nam" : "the-folder-name",
      "pur" : null
    }
  }
}

```

Will return

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "add" : {
    "folder" : {
      "trail" : "/path/for/file",
      "perms" : null || {<permission object>}
  }
}
```
---

### Remove folder

mark: `trove-action`

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "poke" : {
    "rem-folder" : "/path/to/delete"
  }
}
```

Will return

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "rem" : {
    "folder" : { "trail" : "/path/for/file" }
}
```
---

### Move folder

mark: `trove-action`

```json
{
  "space" : "~sampel-palnet/some-space-name",
  "poke" : {
    "rem-folder" : {
      "from" : "/path/to/folder",
      "to" : "/path/new/folder"  // cannot already exist
    }
  }
}
```

Returns `add-node` `rem-folder` and `add-folder` as appropriate
---
