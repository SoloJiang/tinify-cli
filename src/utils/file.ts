import { lstatSync } from 'fs';

export function isDirectory(filepath: string): boolean {
  const stat = lstatSync(filepath);
  return stat.isDirectory();
}