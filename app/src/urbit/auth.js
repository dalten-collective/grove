import React, { useState, useEffect } from 'react';
import Urbit from '@urbit/http-api';

export const openAirlock = async () => {
  const authAirlock = async () =>
    await Urbit.authenticate({
      ship: 'ranrud-navdep-danlyd-bitwep--soptyr-misdul-hatmut-marzod',
      url: 'localhost:80',
      code: 'lapfus-fanryn-saltyd-siprel',
      verbose: true,
    });

  const airlock = await authAirlock();
  airlock.subscribe('trove', '/all');
};

export const useAirlock = () => {
  const [airlock, setAirlock] = useState(null);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const authAirlock = async () => {
      const airlock = await Urbit.authenticate({
        ship: 'YOUR_SHIP_HERE',
        url: 'YOUR_VITE_PORT_HERE',
        code: 'YOUR_CODE_HERE',
        verbose: true,
      });
      setAirlock(airlock);
      setIsAuthed(true);
    };
    authAirlock();
  }, []);

  return { airlock, isAuthed };
};
