// Reference: https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error

declare namespace svelteHTML {
  // enhance attributes
  interface HTMLAttributes<T> {
      // If you want to use on:beforeinstallprompt
      'on:outOfView'?: (event) => void;
  }
}
