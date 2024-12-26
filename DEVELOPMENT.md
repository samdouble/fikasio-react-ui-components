# Development

## Running locally

1. Run the following command from the root folder of the repo:

```
yarn
yarn storybook
```

2. The Storybook should be available on a web browser at **localhost:6006**.

## Running the tests

1. Run the following command from the root folder of the repo:

```
yarn test
```

2. For visual regression tests:

```
yarn test-ct
```

## Installing new dependencies

1. Run the following commands from the root folder of the repo:

```
yarn add <dependency>
```

## Fixing vulnerabilities

1. Run the following commands from the root folder of the repo:

```
npm i --package-lock-only
npm audit fix
rm yarn.lock
yarn import
rm package-lock.json
```

## Creating a new version

1. Change version number in **package.json**
2. Update **CHANGELOG.md** to describe your changes
3. Push your code
4. Merge in `master` (production) branch
5. Merge the Release Please branch

## Main languages, technologies and frameworks

- TypeScript
- React
- Storybook (development)
- npm
- Release-Please
