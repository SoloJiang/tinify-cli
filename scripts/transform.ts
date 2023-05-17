import * as glob from 'glob';
import esbuild from 'esbuild';
import { parseArgs } from 'node:util';
import { watch } from 'chokidar';
import { join } from 'path';
import { rmSync } from 'node:fs';

const cwd = process.cwd();
const SRC_DIR = 'src';
const DIST_DIR = 'dist';
const args = process.argv.slice(2);
const parseArgsOptions = {
  watch: {
    type: 'boolean' as const,
    short: 'w',
    default: false,
  },
};

function genResultFile(path: string | string[]) {
  return esbuild.build({
    entryPoints: Array.isArray(path) ? path : [path],
    outbase: SRC_DIR,
    outdir: DIST_DIR,
    platform: 'node',
    format: 'cjs',
    sourcemap: true,
    allowOverwrite: true,
    write: true,
  });
}

function updateResultFile(path: string) {
  console.log(`${path} changed.\n`);
  genResultFile(path)
    .catch((err) => {
      console.error(err);
    });
}

function transform() {
  const files: string[] = glob.sync(`${SRC_DIR}/**`, { nodir: true, ignore: 'node_modules/**' });
  const { values: commandArgs } = parseArgs({
    args,
    options: parseArgsOptions,
  });

  // Watch mode
  if (commandArgs.watch) {
    const watcher = watch(join(cwd, SRC_DIR), {
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 600,
      },
    });

    console.log('Watching for file changes...\n');
    watcher.on('add', updateResultFile).on('change', updateResultFile);
  } else {
    try {
      rmSync(join(cwd, DIST_DIR), {
        recursive: true,
      });
    } catch (err) {}
  }
  genResultFile(files);
}

transform();