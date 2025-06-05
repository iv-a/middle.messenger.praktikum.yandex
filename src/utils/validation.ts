const nameRegex = /^[A-ZА-Я][a-zа-я-]*(?:-[A-ZА-Я][a-zа-я]*)*$/;
const loginRegex = /^(?=.{3,20}$)(?!^\d+$)[A-Za-z0-9_-]+$/;
const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9_-]*[A-Za-z0-9]\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
const phoneRegex = /^\+?\d{10,15}$/;

type FieldName =
  | 'first_name'
  | 'second_name'
  | 'login'
  | 'email'
  | 'password'
  | 'confirm_password'
  | 'phone'
  | 'message';

export function validateField(
  field: FieldName,
  value: string,
  allValues?: Partial<Record<FieldName, string>>,
): string {
  switch (field) {
    case 'first_name':
    case 'second_name':
      if (!value) return 'This field must not be empty.';
      if (!nameRegex.test(value)) {
        return 'Must start with an uppercase letter; letters and hyphen only.';
      }
      return '';
    case 'login':
      if (!value) return 'Login must not be empty.';
      if (!loginRegex.test(value)) {
        return '3–20 characters, Latin letters, digits, no spaces, allowed: “-” and “_”, not digits only.';
      }
      return '';
    case 'email':
      if (!value) return 'Email must not be empty.';
      if (!emailRegex.test(value)) {
        return 'Invalid email format.';
      }
      return '';
    case 'password':
      if (!value) return 'Password must not be empty.';
      if (!passwordRegex.test(value)) {
        return '8–40 characters, must include at least one uppercase letter and one digit.';
      }
      return '';
    case 'confirm_password':
      if (!value) return 'Please repeat the password.';
      if (!allValues || typeof allValues.password !== 'string') {
        return 'Unable to verify password match.';
      }
      if (value !== allValues.password) {
        return 'Passwords do not match.';
      }
      return '';
    case 'phone':
      if (!value) return 'Phone number must not be empty.';
      if (!phoneRegex.test(value)) {
        return '10–15 digits, may start with "+".';
      }
      return '';
    case 'message':
      if (!value.trim()) return 'Message must not be empty.';
      return '';
    default:
      return '';
  }
}
