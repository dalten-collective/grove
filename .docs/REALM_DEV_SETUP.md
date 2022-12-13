## Getting started

### Fake ships and Urbit

```zsh
# Make ships folder
mkdir ships
cd ships
# Download latest urbit
curl -JLO https://urbit.org/install/mac/latest
# Uncompress
tar zxvf ./darwin.tgz --strip=1
```

Now you should have the urbit files in the `ships` folder. This folder is ignored by GIT.

#### Download latest urbit repo

```zsh
git clone https://github.com/urbit/urbit
```

This will add a `urbit` folder to your local repo which is ignored by git.

#### Booting a fake ship for development

```zsh
# The -F will create a fake zod
./urbit -F zod -B ../urbit/bin/multi-brass.pill

# Optional:
#   Fake bus for networking between fake ships
./urbit -F bus -B ../urbit/bin/multi-brass.pill
```

This will start booting a comet and may take a while.

[See more docs for working with the developer environment.](https://urbit.org/docs/development/environment)

#### Symbolic linking base-dev and garden-dev

Now, you can symbolic link the urbit dev desks `base-dev` and `garden-dev`.

```zsh
cd urbit/pkg
mkdir realm
./symbolic-merge.sh base-dev realm
./symbolic-merge.sh garden-dev realm

#
```

In addition to the linkages to base-dev and garden-dev discussed above, you will also need a few additional files from landscape. You can either do a symbol merge of the entire landscape folder, or ensure that you've copied the following files from the landscape folder to the corresponding `./urbit/pkg/realm` folder.

`Option 1` - Symbolically merge the landscape folder. **Note that this will copy lots of additional files that you will not need for the current version of realm.**

```zsh
./symbolic-merge.sh landscape realm
```

`Option 2` - Copy the following `./urbit/pkg/landscape` files to the corresponding `./urbit/pkg/realm` folder:

```zsh
# app/group-store.hoon
# lib/group-store.hoon
# lib/resource.hoon
# lib/migrate.hoon
# lib/naive.hoon      # in arvo
# lib/tiny.hoon       # in arvo
# mar/css.hoon
# mar/group/update.hoon
# mar/group/view-action.hoon
# mar/group/view-update.hoon
# mar/group/action.hoon
# mar/group/update-0.hoon
# sur/group/hoon
# sur/resource.hoon
# sur/dice.hoon       # in arvo
# sur/group-store.hoon
# sur/group-view.hoon
# sur/invite-store.hoon
```

Now, you want to start your dev ship `zod`.

```zsh
./urbit zod
```

Once started, you should run the following commands on your ship.

```hoon
> |merge %realm our %base
>=
> |mount %realm
>=
```

Then we want to delete the contents of the mounted folder now in `ships/zod/realm`.

```zsh
cd ships/zod
sudo rm -r realm/*
```

And finally, we will copy the symlinked folder from our `urbit/pkg` folder from `ships/zod`.

```zsh
# make sure you are in ships/zod
cp -RL ../../urbit/pkg/realm/* realm
```

### Copying the dev desk to a fake ship.

There is a script called `./copy-desk.sh` that takes a ship name and app name.

```zsh
# Only have to run the first time
chmod +x ./copy-desk.sh
# this will copy the desk
./copy-desk.sh zod realm
```

This is how we can update and write new code from a dev folder. To have the updates take effect in our ship, run:

```hoon
|commit %realm
```

#### Installing %realm

```hoon
|install our %realm
```

#### Starting/Running %realm

```hoon
|rein %realm [& %realm]
```

#### Allow origin (CORS)

For `~zod`:

```hoon
~zod:dojo> |pass [%e [%approve-origin 'http://localhost:3000']]
```

For `~bus`:

```hoon
~bus:dojo> |pass [%e [%approve-origin 'http://localhost:3001']]
```

For `~dev`:

```hoon
~dev:dojo> |pass [%e [%approve-origin 'http://localhost:3002']]
```

READ: https://github.com/urbit/create-landscape-app/tree/master/full
