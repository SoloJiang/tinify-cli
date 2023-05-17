import { Command } from 'clipanion';
import { transform, transformFiles } from '../api/transform';
import { BaseCommand } from './base';
import { createWatcher } from '../utils/watcher';
import { mkdirSync } from 'fs';

export class CompressCommand extends BaseCommand {
  static paths = [['compress']];
  static usage = Command.Usage({
    description: 'Compress a file or directory.',
  });
  async execute(): Promise<number | void> {
    const commandOptions = this.getOptions();
    // Ensure the output directory exists.
    mkdirSync(commandOptions.output, { recursive: true });
    if (this.watch) {
      createWatcher(
        commandOptions,
        (filepaths) => transformFiles(filepaths, commandOptions),
      );
      return;
    }
    await transform(commandOptions);
  }
}