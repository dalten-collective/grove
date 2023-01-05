1. build the dist folder
2. add the dist folder to /your-urbit/trove/app/
3. `|commit %trove`
4. If you have any "missing mark files" grab them from the urbit git repo and put them in the /your-urbit/trove/app/mar folder
5. -garden!make-glob %desk /path/to/dist (e.g. -garden!make-glob %trove /app/dist)
6. find glob in /your-pier/.urb/put, store on cloud
7. update desk.docket-0 file glob-http url and hash as below

```js
  base+%trove
  glob-http+['https://trove.nyc3.cdn.digitaloceanspaces.com/glob-0v2.incs9.gqope.m1u23.lugs2.nadf7.glob' 0v2.incs9.gqope.m1u23.lugs2.nadf7]
  version+[0 0 1]
  website+'https://google.com/'
```
