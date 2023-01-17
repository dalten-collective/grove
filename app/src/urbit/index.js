import { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';

import { getSubscription } from './subscription';
import { pokes } from './pokes';
import { handleEvent } from '../state/events';
import { useStore } from '../state/store';
import { getActions, getScryActions } from '../state/selectors';

export const useTroveSubscription = () => {
  const [ship, urbit] = useUrbit();
  const [troveSub, setTroveSub] = useState(null);
  const factActions = useStore(getActions);

  useEffect(() => {
    if (urbit && ship && !troveSub) {
      const troveSub = getSubscription(urbit, handleEvent(urbit, factActions));
      setTroveSub(troveSub);
    }
    return () => {
      urbit?.unsubscribe(troveSub);
    };
  }, [ship]);
};

export const useTrove = () => {
  const [ship, urbit] = useUrbit();
  const scries = useStore(getScryActions);
  return { urbit, ship, scries, pokes };
};

export const useUrbit = () => {
  const [urbit, setUrbit] = useState(null);
  const [ship, setShip] = useState(null);

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
