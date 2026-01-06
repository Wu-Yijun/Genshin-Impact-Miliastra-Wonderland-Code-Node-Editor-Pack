# Dynamic Testing of Wiring and Connection Effects

A simple ts webpage created with node + vite (for debugging and demonstration).

Install: `npm install`

Run: `npm run dev`

The rendering function is in [GraphRender.ts](./GraphRender.ts), which quickly creates graphs by calling the [interface.ts](../interface.ts) interface through [gen.ts](./gen.ts). GraphRender can directly pass in the Graph object from the interface for rendering.

Future: May consider writing a simple test webpage to dynamically generate graphs online through code.