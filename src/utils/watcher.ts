import { watch, FSWatcher } from 'chokidar';
import { join } from 'path';
import { BaseCommandOptions } from '../commands/base';
import { throttle } from './throttle';

type UpdateFileAction = (filepaths: string[]) => void;

class Watcher {
  #instance: FSWatcher;
  #pendingTransformFiles: string[] = [];
  #updateFileAction: UpdateFileAction;
  constructor(options: BaseCommandOptions, updateFileAction: UpdateFileAction) {
    const { cwd, dir, output } = options;
    this.#instance = watch(join(cwd, dir), {
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 600,
      },
      ignored: new RegExp(join(cwd, output)),
    });
    this.#updateFileAction = updateFileAction;

    console.log('Watching for file changes...\n');
    this.#instance
      .on('add', this.addPendingTransformFile)
      .on('change', this.addPendingTransformFile);
  }
  addPendingTransformFile = (filepath: string) => {
    if (this.#pendingTransformFiles.includes(filepath)) return;
    this.#pendingTransformFiles.push(filepath);
    this.#executePendingTransformFiles();
  };
  #executePendingTransformFiles = throttle(() => {
    this.#updateFileAction?.(this.#pendingTransformFiles);
    this.#pendingTransformFiles = [];
  }, 600);
}

export function createWatcher(
  options: BaseCommandOptions,
  updateFileAction: UpdateFileAction,
) {
  return new Watcher(options, updateFileAction);
}
