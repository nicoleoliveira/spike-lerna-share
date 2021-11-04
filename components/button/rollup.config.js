import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

import { nodeResolve } from '@rollup/plugin-node-resolve';

const input = "src/index.ts";

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

const plugins = [ nodeResolve(), typescript({ typescript: require("typescript") }) ];

export default [
  {
    input,
    output: { name: 'button', file: pkg.module, format: "esm", sourcemap: true },
    plugins,
    external
  }
];