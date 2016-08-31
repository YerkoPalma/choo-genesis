# <%= projectName %> [![built with choo v3](https://img.shields.io/badge/built%20with%20choo-v3-ffc3e4.svg?style=flat-square)](https://github.com/yoshuawuyts/choo)

> Offline first choo app for designers and web developers

## Features

- Offline first
    - Use [localforage](https://github.com/localForage/localForage) for local data storage
    - Use [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API), through [sw-precache](https://github.com/GoogleChrome/sw-precache), to cache assets
- [Trello design pattern](https://github.com/trello/trellisheets/blob/master/styleguide.md) for stylesheets
- Super simple! (*)

(*) _Because all the work to make it offline first happen without your intervention, is all automatic thanks to npm build scripts and choo hooks_

## Considerations

- Service workers require https protocol.
- Test arent working yet ([ref](https://github.com/mantoni/choo-test/issues/1))
- Generators don't work, and the whole template actually, until [this](https://github.com/trainyard/choo-cli/issues/16) gets fixed

## Licencia

MIT © [Yerko Palma](https://github.com/YerkoPalma)
