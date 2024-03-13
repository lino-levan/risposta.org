# Style Guide

This is an informal document that describes how our code should be written in an
ideal world. It's not a strict set of rules, but rather a set of guidelines that
we should strive to follow.

## Linters / Formatters

We use Deno's built-in linter and formatter to ensure that our code is
consistent and free of errors. You can run the linter and formatter with the
following commands:

```bash
deno task check
deno fmt
```

For your code to be accepted, it should pass the linter and formatter without
any errors.

## Naming

We use a mix of camelCase, PascalCase, and underscore_case for naming. Types and
classes should use PascalCase, variables and functions should use camelCase, and
constants should use underscore_case.

If interacting with the database (which uses underscore_case), you can use the
same naming convention in your code. Otherwise, use camelCase.

## Comments

We use comments to explain complex code or to provide context for future
developers. Comments should be written in English and should be concise and to
the point.

## Code Structure

If your code interacts with the database, it should be split into single-export
files and put into the `db/` directory. Otherwise, it should be split into
single-export files and put into the `lib/` directory.

## Patterns

Prefer async/await over promises.

```typescript
// Bad
fetch("https://api.com/users/1")
  .then((response) => response.json())
  .then((user) => console.log(user))
  .catch((error) => console.error(error));

// Good
try {
  const response = await fetch("https://api.com/users/1");
  const user = await response.json();
  console.log(user);
} catch (error) {
  console.error(error);
}
```

Prefer arrow functions over function expressions.

```typescript
// Bad
const add = function (a, b) {
  return a + b;
};

// Good
const add = (a, b) => {
  return a + b;
};
```
