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
