---
inject: true
to: src/features/<%= feature %>/index.ts
before: __HYGEN_INJECT_CLASS_ABOVE__
---
export { <%= h.screenName(name) %> } from './<%= h.screenName(name) %>';