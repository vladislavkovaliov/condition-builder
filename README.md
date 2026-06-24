# Condition Builder

> Inspired by [Flutter condition_builder](https://pub.dev/packages/condition_builder)

A tiny TypeScript/JavaScript utility for clean multi-way conditional logic — no if/else chains, no nested ternaries.

```typescript
import { ConditionBuilder } from 'wi-condition-builder'

const result = new ConditionBuilder<string>()
    .on(() => role === 'admin', 'Dashboard')
    .on(() => role === 'editor', 'Editor Panel')
    .on(() => role === 'viewer', 'Read-only View')
    .build(() => 'Login Screen')
```

## Features

- **First-match wins** — conditions are evaluated in declaration order
- **Lazy evaluation** — values can be passed as thunks (functions), evaluated only when matched
- **Optional fallback** — provide a default via `.build(() => defaultValue)`
- **Null-safe** — if no condition matches and no fallback is given, returns `null`

## Install

```bash
npm install wi-condition-builder
```

## Usage

### Basic

```typescript
const result = new ConditionBuilder<number>()
    .on(() => true, 1)
    .on(() => false, 2)
    .build(() => 3)

// result === 1
```

### Lazy (thunk) values

Pass a function if the value is expensive to compute or has side effects:

```typescript
const result = new ConditionBuilder<string>()
    .on(() => isLoading, () => fetchData())
    .on(() => isCached, () => readCache())
    .build(() => 'fallback')
```

## API

### `new ConditionBuilder<T>()`

Creates an empty builder.

### `.on(predicate, value): this`

| Param       | Type                | Description                                         |
|-------------|---------------------|-----------------------------------------------------|
| `predicate` | `() => boolean`     | Called at build time to check this condition        |
| `value`     | `T \| (() => T)`   | Returned if predicate matches. Use `() => T` for lazy evaluation |

Returns `this` for chaining.

### `.build(fallback?)`

```typescript
build(): T | null
build(fallback: () => T): T
```

| Param      | Type          | Description                              |
|------------|---------------|------------------------------------------|
| `fallback?`| `() => T`     | Called if no condition matched           |

Returns `T` if a condition matched or fallback was used, or `null` if no fallback provided.

## Real-world example

```typescript
type Page = 'dashboard' | 'settings' | 'profile' | 'login'

const currentPage = new ConditionBuilder<Page>()
    .on(() => user.role === 'admin', 'dashboard')
    .on(() => !!user.session, 'profile')
    .on(() => true, 'login')
    .build()
```

Without ConditionBuilder:

```typescript
const currentPage = user.role === 'admin'
    ? 'dashboard'
    : user.session
        ? 'profile'
        : 'login'
```

## Comparison

Without this library, the same logic requires nested ternaries or mutable variables:

```typescript
// Nested ternary — hard to read with 3+ conditions
const result = condition1 ? value1
    : condition2 ? value2
    : condition3 ? value3
    : fallback

// if/else — verbose, mutable variable needed
let result: string
if (condition1) {
    result = value1
} else if (condition2) {
    result = value2
} else {
    result = value3
}
```

## License

MIT
