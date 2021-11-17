// @ts-expect-error
const fs = require('fs');

fs.readFile('src/components/icons/icon/selection.json', (error: any, data: string) => {
  if (error) {
    throw error;
  }
  fs.writeFile('src/components/icons/types/index.ts', 'export type TIconName =', (error2: any) => {
    if (error2) {
      throw error2;
    }
    console.log('File is created successfully.');
    const jsonParsed = JSON.parse(data);
    const { icons } = jsonParsed;
    let i = 0;
    for (; i < icons.length; i++) {
      const icon = icons[i];
      const type = `| '${icon.properties.name}'`;
      fs.appendFile('src/components/icons/types/index.ts', type, (error3: any) => {
        if (error3) {
          throw error3;
        }
      });
    }
  });
});
