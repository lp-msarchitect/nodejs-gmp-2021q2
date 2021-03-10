import csv from 'csvtojson';
import path from 'path';
import { createReadStream, createWriteStream, PathLike } from 'fs';
import { readdir } from 'fs/promises';

export const transformCSVFile = (csvFilePath: PathLike, txtFilePath: PathLike): void => {
  try {
    const readStream = createReadStream(csvFilePath);
    const writeStream = createWriteStream(txtFilePath);
    const transformStream = csv({
      delimiter: ';',
      ignoreEmpty: true,
    });

    readStream.pipe(transformStream).pipe(writeStream);
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
};

export const getCSVFiles = async (): Promise<string[]> => {
  const files: string[] = await readdir(path.resolve(__dirname, '.csv'));
  return files.filter((file) => path.extname(file) === '.csv');
};
