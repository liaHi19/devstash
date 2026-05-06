# Form Building

## Overview

General setup for forms

## Requirements

- React-Hook-Form (mode: "onBlur")
- Zod schema v4 (shared validation on backend and frontend part)
- shadcn ui for form layout https://ui.shadcn.com/docs/forms/react-hook-form
- frontend error - `<FormMessage />`
- backend error - toast
- if need use params value together with form (searchParams) or additional value that it's not in form directly:
  - useActionState
  - startTransition
  - example:

  ```jsx
  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.append("additionalValue", additionalValue);

    startTransition(() => {
      action(formData);
    });
  });
  ```

**Important**
use zod version 4 https://zod.dev/api
