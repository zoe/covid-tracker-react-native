---
inject: true
to: src/features/<%= feature %>/<%= h.inflection.camelize(h.coordinatorName(coordinatorName)) %>.ts
before: __HYGEN_INJECT_SCREEN_FLOW_ABOVE__
skip_if: Modify next screen from <%= h.inflection.camelize(name) %>
---
    <%= h.inflection.camelize(name) %>: {
      // Modify next screen from <%= h.inflection.camelize(name) %>
    },