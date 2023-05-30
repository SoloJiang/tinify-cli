import tinify from 'tinify';
import * as colors from 'colorette';
import fs from 'fs';
import { join, parse, resolve } from 'path';
import { BaseCommandOptions } from '../commands/base';
import { ErrorInfo } from '../types/error';
import { formatError, logError } from '../utils/error';
import { isDirectory } from '../utils/file';
import { getTinifyKey } from '../utils/key';
import { isJPG, isPNG, isWebp } from '../utils/imageType';

tinify.key = getTinifyKey();

export async function transform(options: BaseCommandOptions, toWebp?: boolean) {
  console.log('Transforming...');
  const { all, cwd, dir, name: filename } = options;
  if (all) {
    const { tasks, errors } = transformFiles(
      fs
        .readdirSync(resolve(cwd, dir))
        .map((filename) => resolve(cwd, dir, filename)),
      options,
      toWebp,
    );
    await Promise.all(tasks);
    errors.forEach((err) => {
      logError(err);
    });
  }
  if (filename) {
    const filepath = resolve(cwd, dir, filename);
    try {
      transformSingleFile(filepath, options, toWebp);
    } catch (err) {
      const formattedError = formatError(filepath, err);
      logError(formattedError);
    }
  }
}

export async function transformSingleFile(
  filepath: string,
  options: BaseCommandOptions,
  toWebp?: boolean,
) {
  try {
    const { cwd, dir, output } = options;

    if (isPNG(filepath) || isJPG(filepath) || isWebp(filepath)) {
      const source = tinify.fromFile(filepath);
      source.preserve('copyright', 'creation');
      // Compute output dir
      const parsedFilePath = parse(filepath);
      const sourceDir = resolve(cwd, dir);
      const outputPath = join(
        output,
        parsedFilePath.dir.replace(sourceDir, ''),
      );
      if (toWebp) {
        const converted = source.convert({
          type: 'image/webp',
        });
        await converted.toFile(join(outputPath, `${parsedFilePath.name}.webp`));
      } else {
        await source.toFile(join(outputPath, parsedFilePath.base));
      }
      console.log(colors.green(`Transformed ${filepath}`));
      return;
    }
    console.log(colors.yellow(`Skipped ${filepath}`));
  } catch (err) {
    throw new Error(err);
  }
}

export function transformFiles(
  filepaths,
  options: BaseCommandOptions,
  toWebp?: boolean,
) {
  let errors: ErrorInfo[] = [];
  const tasks = filepaths.map((filepath) => {
    // Exclude directories
    if (isDirectory(filepath)) return Promise.resolve();
    return new Promise(async (resolveFn: (value: void) => void) => {
      try {
        await transformSingleFile(filepath, options, toWebp);
      } catch (err) {
        errors.push(formatError(filepath, err));
      }
      resolveFn();
    });
  });
  return {
    tasks,
    errors,
  };
}
