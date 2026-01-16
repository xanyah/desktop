import styled from '@emotion/styled'

export const StyledQuillWrapper = styled.div`
  .quill-wrapper {
    .ql-container {
      font-family: inherit;
      font-size: inherit;
    }

    .ql-editor {
      min-height: 150px;
      max-height: 400px;
      overflow-y: auto;
    }

    .ql-toolbar {
      border-top-left-radius: 0.375rem;
      border-top-right-radius: 0.375rem;
      background: #f9fafb;
      border-color: hsl(var(--input));
    }

    .ql-container {
      border-bottom-left-radius: 0.375rem;
      border-bottom-right-radius: 0.375rem;
      border-color: hsl(var(--input));
    }

    .ql-editor.ql-blank::before {
      color: hsl(var(--muted-foreground));
      font-style: normal;
    }

    /* Button hover effects */
    .ql-toolbar button:hover,
    .ql-toolbar button:focus {
      color: hsl(var(--primary));
    }

    .ql-toolbar button.ql-active {
      color: hsl(var(--primary));
    }

    .ql-toolbar .ql-stroke {
      stroke: currentColor;
    }

    .ql-toolbar .ql-fill {
      fill: currentColor;
    }

    .ql-toolbar button:hover .ql-stroke,
    .ql-toolbar button:focus .ql-stroke,
    .ql-toolbar button.ql-active .ql-stroke {
      stroke: hsl(var(--primary));
    }

    .ql-toolbar button:hover .ql-fill,
    .ql-toolbar button:focus .ql-fill,
    .ql-toolbar button.ql-active .ql-fill {
      fill: hsl(var(--primary));
    }
  }
`
