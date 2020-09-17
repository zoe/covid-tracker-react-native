---
inject: true
to: src/features/<%= feature %>/<%= h.inflection.camelize(h.coordinatorName(coordinatorName)) %>.ts
before: __HYGEN_INJECT_NAV_METHOD_ABOVE__
skip_if: goTo<%= h.inflection.camelize(name) %>
---
  goTo<%= h.inflection.camelize(name) %>() { 
    NavigatorService.navigate("<%= h.inflection.camelize(name) %>");
  };