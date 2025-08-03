import * as migration_20250801_093051 from './20250801_093051';
import * as migration_20250801_093601 from './20250801_093601';

export const migrations = [
  {
    up: migration_20250801_093051.up,
    down: migration_20250801_093051.down,
    name: '20250801_093051',
  },
  {
    up: migration_20250801_093601.up,
    down: migration_20250801_093601.down,
    name: '20250801_093601'
  },
];
