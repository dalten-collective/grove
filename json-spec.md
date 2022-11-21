# JSON responses and request structures
# JSON responses and request structures

## Responses

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
        "": { // default case / root
          // perms object as above
        }
    ],
    "trove": [
      "/some/path/some-folder": {
        "0v0.123.abc": { // file/node id
          "type": "%remote",
          "url": "https://aws.com/file/whatever",
          "dat": {
            "from": 32223100, // unix time in seconds
            "by": "~sampel-palnet",
            "title": "Readable Filename",
            "description": "Long description of File...",
            "extension": ".pdf"
          }
        },
        "0v0.222.jkjk": {
          "type": "%record",
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
        "0v0.999.xxx": {
          "type": "%remote",
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
      "id": "0v0.123.456",
      "trail": "/path/for/file",
      "node": {
        "0v0.123.456": {
          "type": "%remote",
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

TODO:
`initiate member admin owner`

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
      "perms": {  // permissions object
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

## Responses

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
        "": { // default case / root
          // perms object as above
        }
    ],
    "trove": [
      "/some/path/some-folder": {
        "0v0.123.abc": { // file/node id
          "type": "%remote",
          "url": "https://aws.com/file/whatever",
          "dat": {
            "from": 32223100, // unix time in seconds
            "by": "~sampel-palnet",
            "title": "Readable Filename",
            "description": "Long description of File...",
            "extension": ".pdf"
          }
        },
        "0v0.222.jkjk": {
          "type": "%record",
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
        "0v0.999.xxx": {
          "type": "%remote",
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
      "id": "0v0.123.456",
      "trail": "/path/for/file",
      "node": {
        "0v0.123.456": {
          "type": "%remote",
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

TODO:
`initiate member admin owner`

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
      "perms": {  // permissions object
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




