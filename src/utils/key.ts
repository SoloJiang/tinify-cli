export function getTinifyKey(): string {
  if (process.env.TINIFY_TOKEN) {
    return process.env.TINIFY_TOKEN;
  }
  throw new Error('TINIFY_TOKEN is not set in env');
}