---
to: src/features/<%= feature %>/index.ts
---
export { default as <%= h.inflection.camelize(h.coordinatorName(name)) %> } from './<%= h.inflection.camelize(h.coordinatorName(name)) %>';
// __HYGEN_INJECT_CLASS_ABOVE__