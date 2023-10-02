# Development

## Running locally

1. Run the following command from the root folder of the repo:

```
yarn storybook
```

2. The Storybook should be available on a web browser at **localhost:6006**.

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
4. Merge in master (production) branch

## Main languages, technologies and frameworks

- TypeScript
- React
- Storybook (development)
