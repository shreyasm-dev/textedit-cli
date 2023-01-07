#!/usr/bin/env node

import sourceMapSupport from 'source-map-support';
import { program } from 'commander';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { exec } from 'child_process';

sourceMapSupport.install();

const pkg = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8'));

program
  .name(pkg.name)
  .version(pkg.version)
  .description(pkg.description);

program
  .arguments('<file>')
  .action((file) => {
    const filePath = resolve(process.cwd(), file);
    exec(`open -a TextEdit ${filePath}`);
  });

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
