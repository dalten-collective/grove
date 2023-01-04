import React, { useState, useEffect } from 'react';

import { useStore } from '../state/store';
import { useTrove } from '../urbit';

export const usePoke = (key, action, args) => {
  const { getHosts, hosts } = useStore();
  const { urbit, ship, pokes } = useTrove();
  const _hosts = getHosts();
  const [sentPoke, setSentPoke] = useState(false);
  // useEffect(() => {
  const poke = async () => {
    pokes[key][action](urbit, 'our', { ...args }, ship);
  };
  // if (ship && _hosts?.length && !sentPoke) {
  //   setSentPoke(true);
  //   testPoke();
  // }
  // }, [ship, hosts]);
  return [poke];
};

export const addFolderArgs = [
  'folder',
  'add',
  { toPath: '/', name: 'chicken', permissions: null },
];

export const remFolderArgs = ['folder', 'rem', { fromPath: '/test' }];

export const addNodeArgs = [
  'node',
  'add',
  {
    toPath: '/',
    name: 'test',
    url: 'https://www.govinfo.gov/content/pkg/GOVPUB-C13-9939b434ed7f79092cc9693f42d348bd/pdf/GOVPUB-C13-9939b434ed7f79092cc9693f42d348bd.pdf',
    description: 'im a file yooooo',
    extension: 'pdf',
  },
];

export const remNodeArgs = [
  'node',
  'rem',
  { id: '0v7.467sf.pmmph.7m31j.cccle.0onpl', fromPath: '/our/one/' },
];

export const editNodeArgs = [
  'node',
  'edit',
  {
    id: '0v7.467sf.pmmph.7m31j.cccle.0onpl',
    name: 'test',
    fromPath: '/our/one/',
    description: 'wow! im a new description XD',
  },
];

export const remainingPokes = {
  'move-folder': { fromPath: '/our/TestMoveStart', toPath: '/our/TestMoveEnd' },
  'move-node': {
    id: '0v7.467sf.pmmph.7m31j.cccle.0onpl',
    fromPath: '/our/one/',
    toPath: '/our/two/',
  },
  'add-moderators': { moderators: ['~doplyr-harbur'] },
  'rem-moderators': { moderators: ['~doplyr-harbur'] },
  // TODO: type check space
  // repeat: { id, fromPath, space, toPath },
};

export const useRemFolderPokeTest = () => {
  const { getHosts, hosts } = useStore();
  const { urbit, ship, pokes } = useTrove();
  const _hosts = getHosts();
  const [sentPoke, setSentPoke] = useState(false);
  useEffect(() => {
    const testPoke = async () => {
      pokes.folder.rem(
        urbit,
        'our',
        {
          fromPath: '/blooooooopp',
        },
        ship
      );
    };
    if (ship && _hosts?.length && !sentPoke) {
      setSentPoke(true);
      testPoke();
    }
  }, [ship, hosts]);
};

export const useAddFolderPokeTest = () => {
  const { getHosts, hosts } = useStore();
  const { urbit, ship, pokes } = useTrove();
  const _hosts = getHosts();
  useEffect(() => {
    const testPoke = async () => {
      pokes.folder.add(
        urbit,
        'our',
        { toPath: '/', name: 'test', permissions: null },
        ship
      );
    };
    if (ship && _hosts?.length) {
      testPoke();
    }
  }, [ship, hosts]);
};
