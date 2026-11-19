import { spawn } from 'node:child_process';
// Preview hosts can pass Vite-style flags; Eleventy only needs the port.
const args = process.argv.slice(2);
let port = '8080';
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--port') port = args[++i];
  else if (args[i].startsWith('--port=')) port = args[i].split('=')[1];
}
if (!/^\d+$/.test(port)) throw new Error('Invalid port');
const child = spawn(process.execPath, ['node_modules/@11ty/eleventy/cmd.cjs', '--serve', `--port=${port}`], { stdio: 'inherit' });
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => child.kill(signal));
child.on('exit', code => process.exit(code ?? 1));
