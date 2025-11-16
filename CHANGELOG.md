# Changelog

## [2.0.0](https://github.com/samdouble/fikasio-react-ui-components/compare/v1.1.1...v2.0.0) (2025-11-16)


### ⚠ BREAKING CHANGES

* **Selector:** use render function prop instead of Component

### Features

* **DropDown:** improve visual by removing extra padding ([8e808ec](https://github.com/samdouble/fikasio-react-ui-components/commit/8e808ec1c6dd8c7a923853c493304a619a8767b4))
* **SearchBar:** improve visual by removing extra padding ([b3a3e6d](https://github.com/samdouble/fikasio-react-ui-components/commit/b3a3e6dd7d36f92f0f6d2e03bbae8f1d64c73e7c))
* **Select:** improve visual by removing extra padding ([7fa9d0f](https://github.com/samdouble/fikasio-react-ui-components/commit/7fa9d0f49c418a9a8f7762aaa0a8db17cc3b6b8f))
* **Selector:** improve visual by removing extra padding ([de1e11b](https://github.com/samdouble/fikasio-react-ui-components/commit/de1e11bc6fed56086616ebc386b3bedcfc49dec4))
* **Selector:** use render function prop instead of Component ([17d3e26](https://github.com/samdouble/fikasio-react-ui-components/commit/17d3e2664470dd77b0d70648fbf32dae00304ef4))

## [1.1.1](https://github.com/samdouble/fikasio-react-ui-components/compare/v1.1.0...v1.1.1) (2025-11-15)


### Features

* **DatePicker:** show DatePicker popper at the bottom ([1531f97](https://github.com/samdouble/fikasio-react-ui-components/commit/1531f97d8e92414281e2ae2026a44ad4e53153b7))
* **SearchBar:** improve look by removing padding on options ([99f1277](https://github.com/samdouble/fikasio-react-ui-components/commit/99f1277fa577ccaf98791ebdc08ecef2ec8ca9f3))
* **Success,Error,Warning:** improve look by removing radiuses ([a93a1fb](https://github.com/samdouble/fikasio-react-ui-components/commit/a93a1fb9330be3d161aee61a604441ba49d10462))


### Bug Fixes

* **SearchBar:** correctly vertically align magnifying glass icon ([a955099](https://github.com/samdouble/fikasio-react-ui-components/commit/a955099ffe6e17914534ca99d4b1eeede60f46b6))

## 1.0.0 (2025-11-08)

## [0.11.5](https://github.com/samdouble/fikasio-react-ui-components/compare/v0.11.4...v0.11.5) (2024-12-30)


### Bug Fixes

* **select:** fixed bug where the value would not change ([4c1c0ff](https://github.com/samdouble/fikasio-react-ui-components/commit/4c1c0ff4cde7690a75bcbb8f606c5de30d8b30c4))

## [0.11.4](https://github.com/samdouble/fikasio-react-ui-components/compare/v0.11.3...v0.11.4) (2024-12-27)


### Bug Fixes

* use npm set command to setup registry ([f14406d](https://github.com/samdouble/fikasio-react-ui-components/commit/f14406d33470cb7ba89f7d2dd32a3ffb3b84a4e7))

## [0.11.3](https://github.com/samdouble/fikasio-react-ui-components/compare/v0.11.2...v0.11.3) (2024-12-27)


### Bug Fixes

* use yarn to install dependencies in publish workflow ([1050993](https://github.com/samdouble/fikasio-react-ui-components/commit/1050993b3aa448726e254f827928718a34d9e068))

## [0.11.2](https://github.com/samdouble/fikasio-react-ui-components/compare/v0.11.1...v0.11.2) (2024-12-27)


### Bug Fixes

* use PAT instead of GITHUB_TOKEN to trigger workflow to npm ([a0e98e4](https://github.com/samdouble/fikasio-react-ui-components/commit/a0e98e445046dbaab432caf175dd98076d0f157e))

## [0.11.1](https://github.com/samdouble/fikasio-react-ui-components/compare/v0.11.0...v0.11.1) (2024-12-26)


### Bug Fixes

* publish on npm on Release Please PR merge ([40fb561](https://github.com/samdouble/fikasio-react-ui-components/commit/40fb561a81886699105c511e59136e24281e0e97))

## [0.11.0](https://github.com/samdouble/fikasio-react-ui-components/compare/0.10.2...v0.11.0) (2024-12-26)


### Features

* added displayFunction prop to DatePicker ([89aeb8e](https://github.com/samdouble/fikasio-react-ui-components/commit/89aeb8ebcfad72f643e9a7433e77dbe665a81554))
* added onSubmit prop to the SearchBar ([962f435](https://github.com/samdouble/fikasio-react-ui-components/commit/962f435e09654524bb1f0822f49cb997e1f0d9e1))


### Bug Fixes

* fixed issue with SearchBar styles ([ca18b84](https://github.com/samdouble/fikasio-react-ui-components/commit/ca18b84aad8183fe1c26eab1e6ff105253e71838))
* fixed styling issue with SearchBar ([19c3543](https://github.com/samdouble/fikasio-react-ui-components/commit/19c3543261a677bd46f8b468fb8939c52ffb6a2a))

### 0.10.3
- Added `displayFunction` prop to the DatePicker component
- Added `onSubmit` prop to the SearchBar
- Fixed issue with SearchBar styles

### 0.10.2
- Fixed issue with SearchBar icon position

### 0.10.1
- Added `onChange` and `onSelect` props to the SearchBar

### 0.10.0
- Improved SearchBar component
- Improved Selector component

### 0.9.5
- Fixed Select menu positioning inside dynamic container

### 0.9.3
- Added `menuPortalTarget` and `menuShouldScrollIntoView` props to the Select component

### 0.9.3
- Improved Select menu positioning

### 0.9.1
- Fixed DatePicker positioning

### 0.9.0
- Added the Success component

### 0.8.0
- Added the Error component

### 0.7.3
- Added `name` prop to the Select component

### 0.7.1
- Made small improvements to the Input component

### 0.7.0
- Added DropdownOptions
- Added Input

### 0.6.0
- Added Table
- Added Warning

### 0.5.1
- Made Select both controllable and uncontrollable

### 0.5.0
- Added Button
- Added Select

### 0.4.1
- Made the AutosaveTextarea controllable with `onChange` and `value` props

### 0.4.0
- Added Dot
- Added SearchBar
- Added Selector
- Added the `childrenCenter`, `childrenLeft`, `childrenRight` and `childrenTop` props to the Footer component

### 0.3.6
- Fixed bug with showing/hiding DatePicker

### 0.3.3
- Improved DatePicker with an icon, showing the value and many options

### 0.3.2
- Added the `ref` prop to AutosaveTextarea
- Hide scrollbar when the text is longer than the AutosaveTextarea's width

### 0.3.1
- Added `max-width: 100%` on AutosaveTextarea

### 0.3.0
- Added AutosaveTextarea

### 0.2.0
- Added Checkbox

### 0.1.0
- Added DatePicker
