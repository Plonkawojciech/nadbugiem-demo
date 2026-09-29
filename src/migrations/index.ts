import * as migration_20260929_200544_initial from './20260929_200544_initial';

export const migrations = [
  {
    up: migration_20260929_200544_initial.up,
    down: migration_20260929_200544_initial.down,
    name: '20260929_200544_initial'
  },
];
