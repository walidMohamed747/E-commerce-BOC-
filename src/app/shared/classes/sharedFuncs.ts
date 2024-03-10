import { Form, FormGroup, ValidationErrors } from "@angular/forms";

export function camelCaseToWords(str) {
  return str
    .replace(/^[a-z]/g, (char) => ` ${char.toUpperCase()}`)
    .replace(/[A-Z]|[0-9]+/g, ' $&')
    .replace(/(?:\s+)/, (char) => '');
}

// export function findInvalidControls(form:FormGroup) {
//   const invalid = [];
//   const controls = form.controls;
//   for (const name in controls) {
//       if (controls[name].invalid) {
//           invalid.push(name);
//       }
//   }
//   return invalid;
// }

export function getFormValidationErrors(form:FormGroup) {
  Object.keys(form.controls).forEach((key) => {
      const controlErrors: ValidationErrors =
          form.get(key).errors;
      if (controlErrors != null) {
          Object.keys(controlErrors).forEach((keyError) => {
              console.log(
                  'Key control: ' +
                      key +
                      ', keyError: ' +
                      keyError +
                      ', err value: ',
                  controlErrors[keyError]
              );
          });
      }
  });
}
// mulitable commend line
// for i in ComponentName ; do ng g c "${i}" --skip-tests; done
