---
inject: true
to: src/CovidApp.tsx
before: __HYGEN_INJECTED_IMPORTS_ABOVE__
skip_if: <%= name %>Screen
---
<% ClassName = `${name}Screen` %>
import { <%= ClassName %> } from '@covid/features/<%= feature %>/<%= ClassName %>';