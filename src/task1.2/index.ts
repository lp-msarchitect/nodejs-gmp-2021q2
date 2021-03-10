import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';

const csvFilePath = path.resolve(__dirname, '.csv', 'input.csv');
const txtFilePath = path.resolve(__dirname, '.csv', 'output.txt');

fs.readdir(path.resolve(__dirname, '.csv'), (err, files) => {
  files
    .filter((file) => path.extname(file) === '.csv')
    .forEach((file, i, files) => {
      const csvFilePath = path.resolve(__dirname, '.csv', file);
      const txtFilePath = path.resolve(__dirname, '.csv', path.parse(file).name + '.txt');

      console.log(
        `Start convert file(${i + 1}/${files.length})\nfrom: ${csvFilePath}\nto: ${txtFilePath}\n`,
      );

      try {
        const readStream = fs.createReadStream(csvFilePath);
        const writeStream = fs.createWriteStream(txtFilePath);
        const transformStream = csv({
          delimiter: ';',
          ignoreEmpty: true,
        });

        readStream.pipe(transformStream).pipe(writeStream);
      } catch (error) {
        console.log(`Something went wrong: ${error}`);
      }
    });
  console.log('All files converted');
});
