import { DbConfig } from './types';
import fs = require('fs');

export default (dbPath: string) => {
  // generic function that reads from a "table" file
  const getObject = <T>(path: string): { [x: string]: T } => JSON.parse(fs.readFileSync(`${dbPath}/${path}`, 'utf-8'));

  // function that writes to a "table" file
  const putObject = (path: string, data: any) =>
    fs.writeFileSync(`${dbPath}/${path}`, JSON.stringify(data, null, ' '), 'utf-8');

  return {
    bootstrap: (config: DbConfig) => {
      // Bootstrap: creates the db folder and files
      fs.exists(dbPath, (dbExists) => {
        if (!dbExists) {
          fs.mkdirSync(dbPath);
        }

        Object.values(config).forEach((dbObject) => {
          const { path, defaultData } = dbObject;
          fs.exists(path, (exists) => {
            if (exists) {
              return;
            }

            fs.writeFile(`${dbPath}/${path}`, JSON.stringify(defaultData ?? {}, null, ' '), () => {});
          });
        });
      });
    },

    // generic get: return the list of objects if no id is passed or the object with the specified id
    get: <T>(path: string) => (id?: string): T | T[] =>
      id === undefined ? Object.values(getObject<T>(path)) : getObject<T>(path)[id],

    // generic save: save the object to the "table" file
    save: <T>(path: string) => (id: string, newData: T): T => {
      const data = getObject<T>(path);
      data[id] = { ...newData };
      putObject(path, data);
      return newData;
    },
  };
};
