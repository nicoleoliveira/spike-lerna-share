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
    name: "button",
    file: pkg.module,
    format: "esm",
    sourcemap: true,
    plugins: [nodeResolve({ mainFields: ["browser"] }),]
  },
  external,
  plugins: [
    nodeResolve({ browser: true }),
    typescript({ typescript: require("typescript") }),
  ],
};
