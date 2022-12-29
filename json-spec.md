# JSON responses and request structures

## General Overview
- State Object:
  - troves - a map of spaces (likes groups) to a tuple of [team (map path permission) trove], where a trove is the file structure
    - team - an array of admin ships, member ships and moderator ships - members and admins are dictated by "spaces"
    - (map path permission) - probably don't attempt to use this, intead use the permission scry detailed later
    - trove - You can think of this as a map of nesting path keyss (e.g. /this and /this/that) each of which should resolve to a map of `id`s to `node`s
    - id - a string of an unsigned base32 number (urbit style so `0v12345.67890`)
    - node - a `{type: "record" | "remote", url: "http://link.me", data: {<data>}}`
      - data - file metadata: `{from: "32223100", by: "~zod", title: "a file", description "some file", extension ".pdf"}`

- Available Pokes:
> Note - All pokes are [space poke] - you must specify to which space's trove this poke applies. For the poke part of things you have the following options. For spaces, scry `hosts`

  - Moderation - These must be members, just another permission class
    - `add-moderators` adds moderators to the trove, these must be members
    - `rem-moderators` removes moderators from a trove
  - Errata
    - `repeat` copy one file to another space/folder location (or same space, different folder)
    - `reperm` repermissions a folder and handles cascade effects
    - `rehome` take a `"remote"` type node, resubmit it as a `"record"` type (by sending the file to your own S3/IPFS node).
      - This one needs to be done on the front end, only - and just sent as a `rem-node` and `add-node` to the back end
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

- `/x/team/<host-ship>/<space-name>/json`
  * you must provide the ship name and space name
  * you get the team in return

- `/x/regs/<host-ship>/<space-name>/json`
  * **NOTE:** Probably don't use this - just use /folder/perms, below
  * you must provide the ship name and space name
  * you get the (map path permissions) in return

- `/x/folder/<host-ship>/<space-name>/<folder-path>/json`
  * you must provide the ship name, space name **AND** folder path
  * you get in return a `<map of files> | NULL`, NULL if the folder doesn't exist.

- `/x/folder/perms/<host-ship>/<space-name>/<folder-path>/json`
  * you must provide the ship name, space name **AND** folder path
  * you get the instant permissions at that folder, even if the folder doesn't exist (yet)

- `/x/node/<host-ship>/<space-name>/<file-id>/<folder-path>/json`
  * you have to provide all that shit
  * you get NOTHING - no you get the node info

- Available Subscriptions
Just the one, at `/web-ui`

## Responses

> NOTE: Responses may be received, from time to time, "unprompted", as a result of OTHER USERS' ACTIONS. This is to be expected and should be interpreted as canonical.


### `start` / initial state

On initial subscription:

```json
// initial subscription / full state
{
  "start": {
    "space": "~sampel-palnet/some-space-name",
    "regs": [
      {
        "/some-folder": { // this is a 'perms' object
          "files": {
            "add": ["admin", "member"],
            "edit": ["some", "role", "names"],
            "move": ["some", "role", "names"],
            "delete": ["some", "role", "names"]
          },
          "folders": {
            "read": ["admin", "member"],
            "add": ["admin", "member"],
            "edit": ["some", "role", "names"],
            "move": ["some", "role", "names"],
            "delete": ["some", "role", "names"],
            "ch-mod": ["some", "role", "names"]
          }
        },
        "/some-other-folder": {
          // perms object as above
        },
        // etc additional folders
        "": { // default case / root - THIS ALWAYS EXISTS (even prior to the trove existing)
          // perms object as above
        }
    ],
    "trove": [
      "/some/path/some-folder": {
        "0v12345.abcde": { // file/node id
          "type": "remote",
          "url": "https://aws.com/file/whatever",
          "dat": {
            "from": 32223100, // unix time in seconds
            "by": "~sampel-palnet",
            "title": "Readable Filename",
            "description": "Long description of File...",
            "extension": ".pdf"
          }
        },
        "0v12345.cdefg": {
          "type": "record",
          "url": "https://aws.com/file/whatever",
          "dat": {
            "from": 32223100,
            "by": "~sampel-palnet",
            "title": "Readable Filename 2",
            "description": "Long description of File...",
            "extension": ".txt"
          }
        }
      },
      "/some/path/some-other-folder": {
        "0v12345.defgh": {
          "type": "remote",
          "url": "https://aws.com/file/whatever",
          "dat": {
            "from": 32223100,
            "by": "~sampel-palnet",
            "title": "Readable Filename 3",
            "description": "Long description of File...",
            "extension": ".jpg"
          }
        }
      }
    ]
  }
}
```

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

### Add file (node == file)

mark: `trove-action`

```json
{
  "space": "~sampel-palnet/some-space-name",
  "poke": {
    "add-node": {
      "trail": "/path/for/file",
      "node": {
        "url": "https://aws.com/myfile",
        "dat": {
          "from": 161234567,
          "by": "~zod"
          "title": "the-filename",
          "description": "Optional long description",
          "extension": ".png"
        }
      }
    }
  }
}
```

Will return (on original subscription socket)

```json
{
  "space": "~sampel-palnet/some-space-name",
  "add": {
    "node": {
      "trail": "/path/for/file",
      "node": {
        "0v23456.abcde": {
          "type": "remote",
          "url": "https://aws.com/myfile",
          "dat": {
            "from": 32223100,
            "by": "~sampel-palnet",
            "title": "the-filename",
            "description": "Optional long description",
            "extension": ".png"
          }
        }
      }
  }
}
```
---
### Remove file (node == file)

mark: `trove-action`

> Only send extant files, please.
> Only send when you have delete files permissions @ that folder level, please.

```json
{
  "space": "~sampel-palnet/some-space-name",
  "poke": {
    "rem-node": {
      "id": "0v12345.abcde",
      "trail": "/path/for/file"
      }
    }
  }
}
```

Will return (on original subscription socket)

```json
{
  "space": "~sampel-palnet/some-space-name",
  "rem": {
    "node": {
      "trail": "/path/for/file",
      "id": "0v12345.abcde"
  }
}
```
---

### Add folder

mark: `trove-action`

Include a `pur` object to set permissions on creation:

```json
{
  "space": "~sampel-palnet/some-space-name",
  "poke": {
    "add-folder": {
      "trail": "/path/for/file",
      "nam": "the-folder-name",
      "pur": {  // permissions object
        "files": {
          "add": ["admin", "owner"],
          "edit": ["some", "role", "names"],
          "move": ["some", "role", "names"],
          "delete": ["some", "role", "names"]
        },
        "folder": {
          "read": ["admin", "owner"],
          "add": ["some", "role", "names"],
          "edit": ["some", "role", "names"],
          "move": ["some", "role", "names"],
          "delete": ["some", "role", "names"],
          "ch-mod": ["some", "role", "names"]
        }
      }
    }
  }
}
```

Alternatively, to use the permissions of the parent folder,
pass a `null` for `pur`:

```json
{
  "space": "~sampel-palnet/some-space-name",
  "poke": {
    "add-folder": {
      "trail": "/path/for/file",
      "nam": "the-folder-name",
      "pur": null
    }
  }
}

```

Will return

```json
{
  "space": "~sampel-palnet/some-space-name",
  "add": {
    "folder": {
      "trail": "/path/for/file",
      "perms": {  // permissions object, or NULL
        "files": {
          "add": ["admin", "owner"],
          "edit": ["some", "role", "names"],
          "move": ["some", "role", "names"],
          "delete": ["some", "role", "names"]
        },
        "folder": {
          "read": ["admin", "owner"],
          "add": ["some", "role", "names"],
          "edit": ["some", "role", "names"],
          "move": ["some", "role", "names"],
          "delete": ["some", "role", "names"],
          "ch-mod": ["some", "role", "names"]
        }
      }
  }
}
```

