import readline from 'readline';
import { reverseStr } from './reverse';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  console.log(reverseStr(input));
});
