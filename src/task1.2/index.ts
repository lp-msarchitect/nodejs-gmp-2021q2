import path from 'path';
import { getCSVFiles, transformCSVFile } from './utils';

getCSVFiles().then((files) => {
  files.forEach((file, i, files) => {
    const csvFilePath = path.resolve(__dirname, '.csv', file);
    const txtFilePath = path.resolve(__dirname, '.csv', path.parse(file).name + '.txt');
    transformCSVFile(csvFilePath, txtFilePath);
    console.log(
      `Start convert file(${i + 1}/${files.length})\nfrom: ${csvFilePath}\nto: ${txtFilePath}\n`,
    );
  });
  console.log('All files converted');
});
