---
inject: true
to: src/CovidApp.tsx
before: __HYGEN_INJECTED_SCREEN_ABOVE__
skip_if: <Stack.Screen name=<%= name %>
---
        <Stack.Screen name="<%= name %>" component={<%= name %>Screen} options={noHeader} />