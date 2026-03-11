import { Command } from 'commander';
import chalk from 'chalk';
import { readdirSync, statSync } from 'fs';
import { extname, join } from 'path';

const program = new Command();

program
  .name('filecount')
  .description('Count files by extension in a directory')
  .argument('<dir>', 'directory to scan')
  .option('-r, --recursive', 'scan subdirectories', false)
  .action((dir: string, opts: { recursive: boolean }) => {
    const counts = countFiles(dir, opts.recursive);
    for (const [ext, count] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
      console.log(`${chalk.cyan(ext.padEnd(12))} ${count}`);
    }
  });

function countFiles(dir: string, recursive: boolean): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory() && recursive) {
      const sub = countFiles(fullPath, true);
      for (const [ext, count] of Object.entries(sub)) {
        counts[ext] = (counts[ext] || 0) + count;
      }
    } else if (stat.isFile()) {
      const ext = extname(entry) || '(none)';
      counts[ext] = (counts[ext] || 0) + 1;
    }
  }
  return counts;
}

export function run(argv: string[]) {
  program.parse(argv);
}
