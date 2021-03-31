const path = 'src/components/icons/icon/selection.json';
var fs = require('fs');

fs.readFile(path, function (err, data) {
  if (err) {
    throw err;
  }
  fs.writeFile('src/components/icons/types/index.ts', 'export type TIconName =', function (err) {
    if (err) throw err;
    console.log('File is created successfully.');
    var jsonParsed = JSON.parse(data);
    var icons = jsonParsed.icons;
    var i = 0;
    for (; i < icons.length; i++) {
      var icon = icons[i];
      var type = "| '" + icon.properties.name + "'";
      fs.appendFile('src/components/icons/types/index.ts', type, function (err) {
        if (err) throw err;
      });
    }
  });
});
