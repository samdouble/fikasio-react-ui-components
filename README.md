[![CI](https://github.com/samdouble/fikasio-react-ui-components/actions/workflows/checks.yml/badge.svg)](https://github.com/samdouble/fikasio-react-ui-components/actions/workflows/checks.yml?branch=master)
[![Coverage Status](https://coveralls.io/repos/samdouble/fikasio-react-ui-components/badge.svg?branch=master&service=github)](https://coveralls.io/github/samdouble/fikasio-react-ui-components?branch=master)
[![Socket Badge](https://badge.socket.dev/npm/package/@fikasio/react-ui-components/latest)](https://badge.socket.dev/npm/package/@fikasio/react-ui-components/latest)

[![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=fff)](https://jestjs.io/)
[![Playwright](https://custom-icon-badges.demolab.com/badge/Playwright-2EAD33?logo=playwright&logoColor=fff)](https://playwright.dev/)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=fff)](https://storybook.js.org/)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](https://www.npmjs.com/)

# @fikasio/react-ui-components

## Installation

Use **npm**:

```
npm install --save @fikasio/react-ui-components
```

or **Yarn**:

```
yarn add @fikasio/react-ui-components
```

## Usage

Import components from the package in your React application, for example:

```
import { Footer } from '@fikasio/react-ui-components';
```

## Components

### AutosaveTextarea

<img src="docs/screenshots/autosave-textarea.png" alt="AutosaveTextarea" width="480" />

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| className               | string          | No              | Additional CSS class name for the textarea      |
| defaultValue            | string          | No              | Initial text content of the textarea            |
| name                    | string          | No              | Name attribute for the textarea input           |
| onSave                  | function        | No              | Handler called when content should be saved     |
| placeholder             | string          | No              | Placeholder text when textarea is empty         |
| style                   | CSSProperties   | No              | Additional CSS styles for the textarea          |
| value                   | string          | No              | Controlled text content value                   |

### Breadcrumb

<img src="docs/screenshots/breadcrumb.png" alt="Breadcrumb" width="280" />

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| className               | string          | No              | Additional CSS class name for the Breadcrumb    |
| items                   | array           | No              | Trail items (`label`, optional `href` and `onClick`). The last item is the current page |
| separator               | ReactNode       | No              | Separator rendered between items. Defaults to `/` |
| style                   | CSSProperties   | No              | Additional CSS styles for the Breadcrumb        |

### Button

<img src="docs/screenshots/button.png" alt="Button" width="90" />

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| className               | string          | No             | Additional CSS class name for the button         |
| disabled                | boolean         | No             | Whether the button is disabled                   |
| onClick                 | function        | No             | Handler called when button is clicked            |
| style                   | CSSProperties   | No             | Additional CSS styles for the button             |

### Checkbox

<img src="docs/screenshots/checkbox.png" alt="Checkbox" width="280" />

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| className               | string          | No             | Additional CSS class name for the checkbox      |
| defaultIsChecked        | boolean         | No             | Initial checked state of the checkbox           |
| isChecked               | boolean         | No             | Controlled checked state of the checkbox        |
| name                    | string          | No             | Name attribute for the checkbox input           |
| onClick                 | function        | No             | Click handler function for the checkbox         |
| style                   | CSSProperties   | No             | Additional CSS styles for the Checkbox          |

### DatePicker

<img src="docs/screenshots/datepicker.png" alt="DatePicker" width="340" />

By default the calendar header uses single carets to move by month and double carets to move by year.

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| className               | string          | No              | Additional CSS class name for the DatePicker    |
| dateFormat              | string          | No              | Format for date value (e.g. 'yyyy-MM-dd')       |
| defaultValue            | Date            | No              | Initial date value                              |
| displayFormat           | string          | No              | Format for displaying the date                  |
| displayFunction         | function        | No              | Function for displaying the date                |
| isOpen                  | boolean         | No              | Controls whether the picker is open             |
| name                    | string          | No              | Name attribute for the input                    |
| onChange                | function        | No              | Handler called when date selection changes      |
| onClose                 | function        | No              | Handler called when picker closes               |
| onOpen                  | function        | No              | Handler called when picker opens                |
| onRemoveValue           | function        | No              | Handler called when value is cleared            |
| shouldCloseOnSelect     | boolean         | No              | Whether to close picker after selection         |
| showMonthDropdown       | boolean         | No              | Show a month dropdown in the calendar header    |
| showRemoveValue         | boolean         | No              | Show option to clear the selected value         |
| showTimeSelect          | boolean         | No              | Enable time selection                           |
| showYearDropdown        | boolean         | No              | Show a year dropdown instead of the year carets |
| style                   | CSSProperties   | No              | Additional CSS styles for the DatePicker        |
| timeCaption             | string          | No              | Label shown above time selector                 |
| timeFormat              | string          | No              | Format for time value (e.g. 'HH:mm')            |
| timeIntervals           | number          | No              | Interval in minutes between time options        |
| value                   | Date            | No              | Controlled date value                           |

### Dot

<img src="docs/screenshots/dot.png" alt="Dot" width="120" />

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| className               | string          | No              | Additional CSS class name for the Dot           |
| color                   | string          | No              | Color of the dot (any valid CSS color)          |
| size                    | number          | No              | Size of the dot in pixels                       |
| style                   | CSSProperties   | No              | Additional CSS styles for the dot               |

### Error

<img src="docs/screenshots/error.png" alt="Error" width="420" />

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| children                | string/ReactNode| Yes             | Content to display in the error message         |
| className               | string          | No              | Additional CSS class name for the Error         |
| style                   | CSSProperties   | No              | Additional CSS styles for the Error             |

### Footer

<img src="docs/screenshots/footer.png" alt="Footer" width="800" />

The Footer component provides a flexible layout with multiple sections for content placement. It can contain children elements in the center, left, right, and top positions.

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| childrenCenter          | ReactNode       | No              | Content to be displayed in the center section   |
| childrenLeft            | ReactNode       | No              | Content to be displayed in the left section     |
| childrenRight           | ReactNode       | No              | Content to be displayed in the right section    |
| childrenTop             | ReactNode       | No              | Content to be displayed in the top section      |
| className               | string          | No              | Additional CSS class name for the Footer        |
| style                   | CSSProperties   | No              | Additional CSS styles for the Footer            |

### Icon

<img src="docs/screenshots/icon.png" alt="Icon" width="640" />

SVG icons rendered with `currentColor` so they inherit the surrounding text color. Use `<Icon name="cog" />`, or import named icons such as `CogIcon` and `UserIcon` directly.

Available names:

- `archive`
- `bars`
- `bell`
- `book`
- `bullseye`
- `calendar-alt`
- `caret-left`
- `caret-right`
- `check`
- `check-square`
- `clock`
- `cog`
- `copy`
- `download`
- `edit`
- `ellipsis`
- `list`
- `magnifying-glass`
- `message`
- `plus`
- `power-off`
- `project-diagram`
- `shapes`
- `sitemap`
- `sliders`
- `stopwatch`
- `th`
- `times`
- `user`

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| name                    | string          | Yes             | Icon to render                                  |
| className               | string          | No              | Additional CSS class name for the icon          |
| size                    | `'sm'` \| `'md'` \| `'1x'` \| `'lg'` | No | Icon size. `'md'` is equivalent to `'1x'`. Defaults to `'1x'` |
| style                   | CSSProperties   | No              | Additional CSS styles for the icon              |

### Input

<img src="docs/screenshots/input.png" alt="Input" width="360" />

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| className               | string          | No              | Additional CSS class name for the Input         |
| defaultValue            | string          | No              | Initial value for uncontrolled input            |
| disabled                | boolean         | No              | Whether the input is disabled                   |
| name                    | string          | No              | Name attribute for the input                    |
| onChange                | function        | No              | Handler called when input value changes         |
| placeholder             | string          | No              | Placeholder text shown when input is empty      |
| style                   | CSSProperties   | No              | Additional CSS styles for the Input             |
| value                   | string          | No              | Controlled input value                          |

### SearchBar

<img src="docs/screenshots/search-bar.png" alt="SearchBar" width="360" />

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| className               | string          | No              | Additional CSS class name for the SearchBar     |
| defaultValue            | string          | No              | Initial value for uncontrolled input            |
| onChange                | function        | No              | Handler called when input value changes         |
| onSelect                | function        | No              | Handler called when an option is selected from the menu |
| onSubmit                | function        | No              | Handler called when the Enter key is pressed    |
| options                 | array           | No              | Suggestion options that will appear below       |
| placeholder             | string          | No              | Placeholder text when textarea is empty         |
| style                   | CSSProperties   | No              | Additional CSS styles for the SearchBar         |
| value                   | string          | No              | Controlled input value                          |

### Select

<img src="docs/screenshots/select.png" alt="Select" width="280" />

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| className               | string          | No              | Additional CSS class name for the Select        |
| defaultValue            | string          | No              | Initial value for uncontrolled select           |
| disabled                | boolean         | No              | Whether the select is disabled                  |
| name                    | string          | No              | Name attribute for the select                   |
| onChange                | function        | No              | Handler called when select value changes        |
| options                 | array           | Yes             | Array of options to display in the select       |
| style                   | CSSProperties   | No              | Additional CSS styles for the Select            |
| value                   | string          | No              | Controlled select value                         |

### Selector

<img src="docs/screenshots/selector.png" alt="Selector" width="280" />

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| className               | string          | No              | Additional CSS class name for the Selector      |
| defaultValue            | string          | No              | Initial value for uncontrolled select           |
| name                    | string          | No              | Name attribute for the select                   |
| onChange                | function        | No              | Handler called when select value changes        |
| options                 | array           | No              | Array of options to display in the select       |
| render                  | function        | No              | Describes how to render the main button         |
| style                   | CSSProperties   | No              | Additional CSS styles for the Selector          |
| value                   | string          | No              | Controlled select value                         |

### Success

<img src="docs/screenshots/success.png" alt="Success" width="420" />

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| className               | string          | No              | Additional CSS class name for the Success       |
| style                   | CSSProperties   | No              | Additional CSS styles for the Success           |

### Tabs

<img src="docs/screenshots/tabs.png" alt="Tabs" width="480" />

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| className               | string          | No              | Additional CSS class name for the Tabs          |
| defaultValue            | string          | No              | Initial value for uncontrolled tabs             |
| onChange                | function        | No              | Handler called when the selected tab changes    |
| options                 | array           | No              | Tabs to display (`label`, `value`, optional `content` and `disabled`) |
| style                   | CSSProperties   | No              | Additional CSS styles for the Tabs              |
| value                   | string          | No              | Controlled selected tab value                   |

### Warning

<img src="docs/screenshots/warning.png" alt="Warning" width="420" />

#### Props

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| className               | string          | No              | Additional CSS class name for the Warning       |
| style                   | CSSProperties   | No              | Additional CSS styles for the Warning           |

## Hooks

### useTheme

Reads the current library theme, and optionally sets it. The default is `light`. Allowed values are `light` and `dark`.

Call it near the root of your app to set the theme:

```
import { useTheme, Button } from '@fikasio/react-ui-components';

function App() {
  useTheme('dark');

  return (
    <Button>Save</Button>
  );
}
```

Call it with no argument to read the current theme:

```
const theme = useTheme();
```

#### Parameters

| Name                    | Type            | Required        | Description                                     |
|-------------------------|:----------------|:----------------|:------------------------------------------------|
| newTheme                | string          | No              | Theme to apply (`'light'` or `'dark'`). Invalid values are ignored and log an error |

#### Returns

The current theme: `'light'` or `'dark'`.

## Development

See DEVELOPMENT.md.
