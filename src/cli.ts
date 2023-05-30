#!/usr/bin/env node

import { Cli } from 'clipanion';
import pkgJson from '../package.json';
import { GenerateCommand } from './commands/generate';
import { CompressCommand } from './commands/compress';
import { HelpCommand } from './commands/help';
import { VersionCommand } from 'clipanion/lib/advanced/builtins/version';

const cli = new Cli({
  binaryName: pkgJson.name,
  binaryVersion: pkgJson.version,
});

cli.register(HelpCommand);
cli.register(CompressCommand);
cli.register(GenerateCommand);
cli.register(VersionCommand);
cli.runExit(process.argv.slice(2));