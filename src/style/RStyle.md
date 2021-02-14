### Type shortcuts

#### `RStyleRef`
A React `RStyle` reference, a shortcut for `React.RefObject<RStyle>`

#### `RStyleLike`
A style object, a shortcut for `RStyleRef | RStyle | StyleLike`

### Shortcuts for creating `<RStyle>` references

#### `useRStyle()`
Create a memoized style reference, a shortcut for `React.useRef() as RStyleRef`

#### `createRStyle()`
Create a style reference, a shortcut for `React.createRef() as RStyleRef`
