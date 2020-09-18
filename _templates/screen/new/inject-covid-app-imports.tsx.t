---
inject: true
to: src/CovidApp.tsx
before: __HYGEN_INJECTED_IMPORTS_ABOVE__
skip_if: "import { <%= h.screenName(name) %> } from"
---
import { <%= h.screenName(name) %> } from '@covid/features/<%= feature %>/<%= h.screenName(name) %>';