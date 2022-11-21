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
        "some-folder": { // this is a 'perms' object
          "files": {
            "add": ["admin", "moderator"],
            "edit": ["some", "role", "names"],
            "move": ["some", "role", "names"],
            "delete": ["some", "role", "names"]
          },
          "folders": {
            "read": ["admin", "moderator"],
            "add": ["admin", "moderator"],
            "edit": ["some", "role", "names"],
            "move": ["some", "role", "names"],
            "delete": ["some", "role", "names"],
            "ch-mod": ["some", "role", "names"]
          }
        },
        "some-other-folder": {
          // perms object as above
        },
        // etc additional folders
        "": { // default case / root
          // perms object as above
        }
    ],
    "trove": [
      "some/path/some-folder": {
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
      "some/path/some-other-folder": {
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

### Add file (node == file)

mark: `trove-action`

```json
{
  "add-node": {
    "trail": "path/for/file",
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
```

Will return (on original subscription socket)

```json
{
  "space": "~sampel-palnet/some-space-name",
  "add": {
    "node": {
      "id": "0v0.123.456",
      "trail": "path/for/file",
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

### 




