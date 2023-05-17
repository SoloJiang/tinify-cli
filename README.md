> 🚧 Developing
# @tinify_cli/cli
<p align="center">
  <a href="https://www.npmjs.com/package/@tinify_cli/cli"><img src="https://badgen.net/npm/dm/@tinify_cli/cli" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@tinify_cli/cli"><img src="https://badgen.net/npm/v/@tinify_cli/cli" alt="Version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license" /></a>
  <a href="https://github.com/SoloJiang/tinify-cli/pulls"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
</p>

A compress image resource cli tool [througth by tinify](https://tinypng.com/developers).

## Why
- Convert other image type to webp
- Compress any image files in your local
- Watch mode, it can listen the assets dir, and auto execute convert or compress action

## Set up
First of all, it need get [tinify token](https://tinypng.com/developers). Copy it to your env file(like `~/.zshrc` in Mac OSX) as `TINIFY_TOKEN=xxxxxxx`.

Finally, execute the command:

```bash
source ~/.zshrc
```

## Usage

### Compress

```bash
$ tinify compress
```

### Generate to Webp

```bash
$ tinify generate
``` 

### Common options

#### `--all`
**short：** `-a`

Transform all files in the directory.

#### `--watch`
**short：** `-w`

Watch mode, the transform action wont\'t act immediately when the command is executed.

#### `--name`
**short：** `-n`

The name of the file to transform. 
> Note: With this option, the `--all` will be invalid.

#### `--cwd`
**short：** `-c`

The working directory of where @tinify_cli/cli command will be executed in, all other paths options are relative to this path.

#### `--dir`
**short：** `-d`

The directory to transform.

#### `--output`
**short：** `-o`

The directory to store the transformed files.
