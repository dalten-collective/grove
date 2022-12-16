import { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import { getSubscription } from './subscription';
// import { scries, scriesWithCb } from './scries';
import { pokes } from './pokes';
import { handleEvent } from '../state/events';
import { getActions, getScryActions, useStore } from '../state/store';

export const useTrove = () => {
  const [ship, urbit] = useUrbit();
  const [troveSub, setTroveSub] = useState(null);
  const scries = useStore(getScryActions);
  const factActions = useStore(getActions);

  useEffect(() => {
    if (ship && !troveSub) {
      const troveSub = getSubscription(urbit, handleEvent(urbit, factActions));
      setTroveSub(troveSub);
    }
    () => urbit.unsubscribe(troveSub);
  }, [ship, troveSub]);

  return { urbit, ship, scries, pokes };
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
