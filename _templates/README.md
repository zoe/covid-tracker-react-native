# Overview

[Hygen docs](http://www.hygen.io/docs/generators)

Hygen is a generator supports
- Templates (ejs)
- Prompt
- Cli docs
- Shell commands execution
- Config paths (e.g `.hygen.js` to map templates for both `backend` & `frontend`)
- Define helper methods (e.g transform values)

# Setup

On macOSX:

```
$ brew tap jondot/tap
$ brew install hygen
```

Globally with npm (or yarn):
```
$ npm i -g hygen
```

# Hygen structure

```
$ hygen screen new [NAME]
         |      ^----- action
         `------------ generator
```

## Cli arguments

```
$ hygen mailer new --name foobar --message hello --version 1
```

Template (`_template/screen/new/email.html.t`)

```
---
to: app/emails/<%= name %>.html
---
<h1>Hello <%= name %></h1>
<%= message %>
(version <%= version %>)
```

# Examples

Generating a new screen. 

use `--feature` for folder name, files will be generated under `/src/features/__FEATURE_NAME__`

```
$ hygen coordinator new Test --feature test

$ hygen screen new # No passed params, this will trigger prompts
$ hygen screen new Intro --feature test

# Inject screen flow & nav method in coordinator

$ hygen screen new ShowCase --feature test --coordinatorName Test

```