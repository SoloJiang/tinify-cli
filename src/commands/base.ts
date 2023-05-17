import { Command, Option } from 'clipanion';
import { resolve } from 'path';

export abstract class BaseCommand extends Command {
  all: boolean = Option.Boolean('-a,--all', false, {
    description: 'Transform all files in the directory.',
  });
  output: string = Option.String('-o,--output', 'output', {
    description: 'The directory to store the transformed files.',
  });
  dir: string = Option.String('-d,--dir', '', {
    description: 'The directory to transform.',
  });
  cwd = Option.String('-c,--cwd', process.cwd(), {
    description: 'The working directory of where tinify-cli command will be executed in, all other paths options are relative to this path.',
  });
  name = Option.String('-n,--name', '', {
    description: 'The name of the file to transform.',
  });
  watch = Option.Boolean('-w,--watch', false, {
    description: 'Watch mode, the transform action wont\'t act immediately when the command is executed.',
  });
  getOptions(): BaseCommandOptions {
    return {
      all: this.all,
      output: resolve(this.cwd, this.output),
      cwd: this.cwd,
      dir: this.dir,
      name: this.name,
    };
  }
}

export interface BaseCommandOptions {
  all: boolean;
  output: string;
  cwd: string;
  dir: string;
  name: string;
}