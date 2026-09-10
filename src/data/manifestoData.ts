import { StateTerritoryAudit, ManifestoPromise } from '../types';
import { NATIONAL_BIG_TICKET_PROMISES, NATIONAL_STATS_OVERVIEW } from './nationalManifestoData';
import { NORTH_STATES_DATA } from './statesNorth';
import { SOUTH_STATES_DATA } from './statesSouth';
import { WEST_EAST_STATES_DATA } from './statesWestEast';
import { CENTRAL_NE_STATES_DATA } from './statesCentralNE';

export { NATIONAL_BIG_TICKET_PROMISES, NATIONAL_STATS_OVERVIEW };

export const ALL_STATES_TERRITORIES: StateTerritoryAudit[] = [
  ...NORTH_STATES_DATA,
  ...SOUTH_STATES_DATA,
  ...WEST_EAST_STATES_DATA,
  ...CENTRAL_NE_STATES_DATA,
];

// Calculate aggregated stats across all 36 States & UTs + National
export function getAggregatedManifestoStats() {
  let fulfilled = 0;
  let broken = 0;
  let totalPromises = 0;

  // National
  NATIONAL_BIG_TICKET_PROMISES.forEach((p) => {
    totalPromises++;
    if (p.status === 'Fulfilled') fulfilled++;
    else if (p.status === 'Broken') broken++;
  });

  // States & UTs
  ALL_STATES_TERRITORIES.forEach((state) => {
    state.promises.forEach((p) => {
      totalPromises++;
      if (p.status === 'Fulfilled') fulfilled++;
      else if (p.status === 'Broken') broken++;
    });
  });

  const trustScorePct = Math.round((fulfilled / totalPromises) * 1000) / 10;
  const brokenScorePct = Math.round((broken / totalPromises) * 1000) / 10;

  return {
    totalPromises,
    fulfilled,
    broken,
    trustScorePct,
    brokenScorePct,
    totalStatesAndUTs: ALL_STATES_TERRITORIES.length,
  };
}
