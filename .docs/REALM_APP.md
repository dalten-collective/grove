# Holium Realm

A desktop environment for Urbit.

We use yarn workspace to manage the multiple modules.

## Getting started
Below is a detailed guide to getting things built or you can just download from Releases. If you download from releases, you will have to include a github token env when you open Realm for now, see docs in [`/app/release/app`](https://github.com/holium/realm/tree/main/app/release/app/README.md).

In the debug build you can bypass the invite code and email with `~admins-admins-admins` and `admin@admin.com`. 

`~hostyv` hosts several of the desks needed for Realm, you may have to manually install them for now.

## Dev setup

In order to run Urbit locally, you will need to create a local fake ship. Once these ships are
created, you can then go to [`/app/README.md`](/app/README.md) to get started with Realm.

### 1. Build UI

#### Yarn

```zsh
# In the root directory
yarn
```

#### Yarn link /libs

Link all libs (It'll take a little while):

```zsh
yarn link:all
```

Or link them individually:

`@holium/design-system`:

```zsh
cd lib/design-system
yarn build
yarn link

cd ...
## In the root directory
yarn link "@holium/design-system"
```

`@holium/realm-multiplayer`:

```zsh
cd lib/multiplayer
yarn build
yarn link

cd ...
## In the root directory
yarn link "@holium/realm-multiplayer"
```

`@holium/conduit`:

```zsh
cd lib/conduit

yarn build
yarn link

cd ...
## In the root directory
yarn link "@holium/conduit"
```


`@holium/realm-room`:

```zsh
cd lib/room

yarn build
yarn link

cd ...
## In the root directory
yarn link "@holium/realm-room"
```

See additional docs in the `/app` directory

### 2. Fake ships and Urbit

You will need to copy over the following desks:

- %courier: messaging agents
- %realm: core realm agents

```zsh
# Make ships folder
mkdir ships
cd ships
# Download latest urbit
curl -JLO https://urbit.org/install/mac/latest
# Uncompress
tar zxvf ./darwin.tgz --strip=1
rm darwin.tgz
```

#### Download latest urbit pill

First, you may need to download `git-lfs`

```zsh
brew install git-lfs
git lfs install
```

After install `git-lfs`, clone the urbit repo.

```zsh
git clone https://github.com/urbit/urbit urbit-repo
```

This will add a `urbit` folder to your local repo which is ignored by git.

#### Booting a fake ship for development

You should run these in two separate terminal windows.

**WARNING**: Never start the same ship twice or there will be networking problems.

```zsh
# The -F will create a fake zod
./urbit -F zod -B ./urbit-repo/bin/multi-brass.pill

# Optional:
#   Fake bus for networking between fake ships
./urbit -F bus -B ./urbit-repo/bin/multi-brass.pill
```

This will start booting a dev ship and may take a while.

[See more docs for working with the developer environment.](https://urbit.org/docs/development/environment)

#### Allow origin (CORS)

You will want to run the following on both ships.

```hoon
~zod:dojo> |pass [%e [%approve-origin 'http://localhost:3010']]
```

```hoon
~bus:dojo> |pass [%e [%approve-origin 'http://localhost:3010']]
```

### Starting the ship after install

Now, you want to start your dev ship `zod`.

**WARNING**: Never start the same ship twice or there will be networking problems. Make sure there is no instance of `~zod` running before running this:

```zsh
./urbit zod
```
