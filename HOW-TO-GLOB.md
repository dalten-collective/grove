1. build the dist folder
2. add the dist folder to /your-urbit/trove/app/dist
3. `|commit %trove`
4. If you have any "missing mark files" grab them from the urbit git repo and put them in the /your-urbit/trove/app/dist folder
5. -garden!make-glob %desk /path/to/dist  (e.g. -garden!make-glob %trove /app/dist)
6. find glob in /your-pier/.urb/put, store on cloud
7. update desk.docket-0 file glob-http url and hash as below
  ```js
  base+'trove'
  glob-http+['https://freedom-club.sfo2.digitaloceanspaces.com/glob-0v2.9cos0.iessr.6tilt.hsofp.crvsu.glob' 0v2.9cos0.iessr.6tilt.hsofp.crvsu]
  ```
