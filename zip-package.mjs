import { execSync } from 'child_process';
import { createWriteStream } from 'fs';
import { existsSync, rmSync } from 'fs';
import archiver from 'archiver';

execSync('npm run build', { stdio: 'inherit' });

if (existsSync('deploy.zip')) {
  rmSync('deploy.zip');
}

const output = createWriteStream('deploy.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => console.log('deploy.zip created')); 
archive.pipe(output);
archive.directory('dist', 'dist');
archive.directory('worker', 'worker');
archive.file('wrangler.toml', { name: 'wrangler.toml' });
archive.file('package.json', { name: 'package.json' });
archive.finalize();
