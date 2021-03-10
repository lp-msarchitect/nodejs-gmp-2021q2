import csv from 'csvtojson';
import path from 'path';
import stream from 'stream';
import { createReadStream, createWriteStream, PathLike, promises as fsp } from 'fs';

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

      const lines = strData.split('\n');

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
  const files: string[] = await fsp.readdir(path.resolve(__dirname, '.csv'));
  return files.filter((file) => path.extname(file) === '.csv');
};
