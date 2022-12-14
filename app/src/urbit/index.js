import { useEffect, useState } from 'react';
// import { addFolderPoke } from './pokes';
import { getSubscription, subscription } from './subscription';
import { getHosts } from './scries';
import Urbit from '@urbit/http-api'


export const useTrove = () => {
  const [ship, urbit] = useUrbit();
  const [troveSub, setTroveSub] = useState(null);

  useEffect(() => {
    // const testPoke = async () => {
    //   const poke = await addFolderPoke(urbit);
    //   console.log('poke', poke);
    //   return poke;
    // };
    if (urbit) {
      if (!troveSub) {
        const troveSub = getSubscription(urbit);
        setTroveSub(troveSub);
      } else {
        // getEverything(urbit); TODO
        getHosts(urbit);
        // testPoke();
      }
    }
    () => urbit.unsubscribe(troveSub);
  }, [ship, troveSub]);

  return [ship];
};

export const useUrbit = () => {
  const [urbit, setUrbit] = useState(null);
  const [ship, setShip] = useState(null);
  const [code, setCode] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!ship) {
      const urbit = getUrbitApi('trove');
      setUrbit(urbit);
      setShip(urbit.ship);
    }
  }, [ship]);
  return [ship, urbit];
};

export const getUrbitApi = (desk = 'trove') => {
  const api = new Urbit('', '', desk);
  api.ship = window.ship;
  return api;
};
