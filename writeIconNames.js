const path = 'src/components/icons/icon/selection.json';
const fs = require('fs');

fs.readFile(path, function (err, data) {
  if (err) {
    throw err;
  }
  fs.writeFile('src/components/icons/types/index.ts', 'export type TIconName =', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
    const jsonParsed = JSON.parse(data);
    const { icons } = jsonParsed;
    let i = 0;
    for (; i < icons.length; i++) {
      const icon = icons[i];
      const type = `| '${icon.properties.name}'`;
      fs.appendFile('src/components/icons/types/index.ts', type, function (err) {
        if (err) throw err;
      });
    }
  });
});
