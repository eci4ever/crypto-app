# TypeScript · React · Frontend Resources

Curated high-trust sources for the mission: writing TypeScript frontend code and maintaining `crypto-app`.

## Knowledge

- [The TypeScript Handbook — typescriptlang.org](https://www.typescriptlang.org/docs/handbook/intro.html)
  The authoritative reference, maintained by the TypeScript team at Microsoft. Use for: looking up any type feature (basics → generics → type manipulation). Read as a companion, not a cover-to-cover course.
- [The Basics / Everyday Types — TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
  Start here for the primitive types, annotations, and how inference works. Use for: the exact shape of `string`, `number`, `boolean`, unions, arrays.
- [Beginner's TypeScript — Total TypeScript (Matt Pocock)](https://www.totaltypescript.com/tutorials/beginners-typescript)
  Free, interactive, exercise-driven tutorial (problem → solution) that builds real tooling habits. Use for: hands-on practice on top of the Handbook.
- [Book: _Learning TypeScript_ — Josh Goldberg (O'Reilly)](https://learningtypescript.com)
  The best full-length book on TypeScript fundamentals for JavaScript developers. Use for: structured depth on the whole type system. The mission "beginner to advanced" maps to this book's arc.
- [Learn React (Quick Start) — react.dev](https://react.dev/learn)
  The official React docs (React 19). Use for: what a component is, JSX, props, state, rendering lists — with interactive examples.
- [Writing markup with JSX — react.dev](https://react.dev/learn/writing-markup-with-jsx)
  The official JSX reference. Use for: the exact differences between JSX and HTML (`className`, closing tags, `{}` escapes).
- [React 19 release notes — react.dev/blog](https://react.dev/blog/2024/12/05/react-19)
  What's new in the version this repo runs. Use for: knowing which features exist (e.g. refs as props, actions).
- [JavaScript Guide — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
  The canonical JavaScript reference. Use for: ES modules, functions, arrow functions, destructuring, `map`, promises/fetch.
- [JavaScript modules — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
  Definitively explains `import`/`export`, the glue of this codebase. Use for: understanding how `src` files wire together.
- [Vite Guide — vite.dev](https://vite.dev/guide/)
  The build tool this repo uses. Use for: what `npm run dev`/`build` do, dev server, HMR, and how `index.html` is the entry.
- [Vite dev server (HMR) — vite.dev](https://vite.dev/guide/features)
  Use for: understanding hot module replacement and why edits appear instantly.

## Wisdom (Communities)

- [React subreddit — r/reactjs](https://www.reddit.com/r/reactjs/)
  High-signal, well-moderated. Use for: asking "how do people solve X in React?" and sanity-checking patterns.
- [TypeScript subreddit — r/typescript](https://www.reddit.com/r/typescript/)
  Use for: type-system questions and best-practice debates.
- [Reactiflux Discord](https://www.reactiflux.com/)
  Large, active developer community with dedicated help channels. Use for: real-time questions when stuck on a React/TS problem.
- [TypeScript Community — typescriptlang.org/community](https://www.typescriptlang.org/community)
  Official list of meetups and community channels (Discord, dev.to, Stack Overflow).

> Community preference: user has not opted out of communities. Proposed resources above; confirm with the user before treating a community as their destination.

## Gaps

- **No strong free resource yet for *spaced repetition* of TypeScript fundamentals** (for storage strength). Consider pointing the user at daily 5-minute retrieval via the quiz widgets we build in lessons.
- **No resource yet on maintainer-level React patterns for this specific stack** (wouter + Zustand + TanStack Query together). The repo itself is the best primary source — lessons should read real files.
