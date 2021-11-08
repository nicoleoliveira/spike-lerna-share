import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

import { nodeResolve } from "@rollup/plugin-node-resolve";

const input = "src/index.ts";

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default {
  input,
  output: {
    name: "web-components",
    file: pkg.module,
    format: "esm",
    sourcemap: true,
  },
  external,
  plugins: [
    typescript(),
    nodeResolve({ browser: true }),
  ],
};
