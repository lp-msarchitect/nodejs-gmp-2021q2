import csv from 'csvtojson';
import path from 'path';
import stream from 'stream';
import os from 'os';

import { createReadStream, createWriteStream, PathLike, statSync, promises as fsp } from 'fs';

export const transformCSVFile = (csvFilePath: PathLike, txtFilePath: PathLike): void => {
  try {
    const readStream = createReadStream(csvFilePath);
    const writeStream = createWriteStream(txtFilePath);

    const lineByLineStream = new stream.Transform({ readableObjectMode: true });

    lineByLineStream._transform = function (chunk, encoding, done): void {
      let strData = chunk.toString();

      if (this.invalidLine) {
        strData = this.invalidLine + strData;
      }

      const lines = strData.split(os.EOL);

      this.invalidLine = lines.pop();
      lines.forEach((line: string) => {
        this.push(line);
      });
      done();
    };

    lineByLineStream._flush = function (done): void {
      if (this.invalidLine) {
        this.push([this.invalidLine]);
      }

      this.invalidLine = null;
      done();
    };

    const transformStream = csv({
      delimiter: ';',
      ignoreEmpty: true,
    });

    readStream.pipe(lineByLineStream).pipe(transformStream).pipe(writeStream);
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
  }
};

export const getCSVFiles = async (): Promise<string[]> => {
  const paths: string[] = await fsp.readdir(path.resolve(__dirname, '.csv'));
  const filesPaths = paths.filter(
    (filePath) => !statSync(path.resolve(__dirname, '.csv', filePath)).isDirectory(),
  );
  return filesPaths.filter((file) => path.extname(file) === '.csv');
};
