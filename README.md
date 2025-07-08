## Condition Builder

Inspired by Flutter condition_builder

A tiny JavaScript utility that helps you write clean, readable multi-way conditional logic without if/else and without nested complex ternary statements.

- the order of conditions matters — the first condition that matches will be used
- you can optionally provide a fallback using build(() => defaultValue)
- if no condition matches and no fallback is provided, an error will be thrown to alert you
- the build() method is empty it will return null

## Why use it?

Condition Builder is designed to simplify anything based on multiple runtime conditions

Instead of writing nested if/else or ternary (?/:) operators, you define your logic declaratively:

```typescript
const result = ConditionBuilder<number>
    .on(() => true, () => 1)
    .on(() => false, () => 2)
    .build(() => 3);
```

## Comparison: With vs Without ConditionBuilder

With ConditionBuilder

```typescript
const result = ConditionBuilder<number>
    .on(() => true, () => 1)
    .on(() => false, () => 2)
    .build(() => 3);
```

Without ConditionBuilder (using ternary)

```typescript

const result = false ? 2 : true ? 1 : 3;

// -------

let result = -1;

if (true) {
    result = 1;
} else if (false) {
    result = 2;
} else {
    result = 3;
}

```
