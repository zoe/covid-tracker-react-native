---
inject: true
to: src/CovidApp.tsx
before: __HYGEN_INJECTED_IMPORTS_ABOVE__
skip_if: "import { <%= name %>Screen } from"
---
import { <%= name %>Screen } from '@covid/features/<%= feature %>/<%= name %>Screen';