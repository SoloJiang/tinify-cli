import * as colors from 'colorette';
import { ErrorInfo } from '../types/error';

export function formatError(filepath: string, error: any): ErrorInfo {
  return {
    filepath,
    reason: error.toString(),
  };
}

export function logError(errorInfo: ErrorInfo) {
  console.log(colors.red(`Transform ${errorInfo.filepath} failed:\n${errorInfo.reason}`));
}