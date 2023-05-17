import { transform, transformFiles } from '../api/transform';
import { BaseCommand } from './base';
import { Command } from 'clipanion';
import { mkdirSync } from 'fs';
import { createWatcher } from '../utils/watcher';

export class GenerateCommand extends BaseCommand {
  static paths = [['generate']];
  static usage = Command.Usage({
    description: 'Genereate a file or directory to webp.',
  });
  async execute(): Promise<number | void> {
    const commandOptions = this.getOptions();
    // Ensure the output directory exists.
    mkdirSync(commandOptions.output, { recursive: true });
    if (this.watch) {
      createWatcher(commandOptions, (filepaths) =>
        transformFiles(filepaths, commandOptions, true),
      );
      return;
    }
    await transform(commandOptions, true);
  }
}
