const nameRegex = /^[A-ZА-Я][a-zа-я-]*(?:-[A-ZА-Я][a-zа-я]*)*$/;
const loginRegex = /^(?=.{3,20}$)(?!^\d+$)[A-Za-z0-9_-]+$/;
const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9_-]*[A-Za-z0-9]\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;
const phoneRegex = /^\+?\d{10,15}$/;
const allowedAvatarTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
];

type FieldName =
  | 'avatar'
  | 'first_name'
  | 'second_name'
  | 'display_name'
  | 'login'
  | 'email'
  | 'password'
  | 'confirm_password'
  | 'phone'
  | 'message';

export function validateField(
  field: FieldName,
  value: string | File | null | undefined,
  allValues?: Partial<Record<FieldName, string>>,
): string {
  if (field !== 'avatar' && value instanceof File) {
    return 'Invalid input.';
  }
  const str = typeof value === 'string' ? value : '';

  switch (field) {
    case 'avatar':
      if (!value) return 'Avatar must not be empty.';
      if (!(value instanceof File)) {
        return 'Invalid file.';
      }
      if (!allowedAvatarTypes.includes(value.type)) {
        return 'Allowed file types: JPEG, JPG, PNG, GIF, WebP.';
      }
      return '';
    case 'first_name':
    case 'second_name':
    case 'display_name':
      if (!str) return 'This field must not be empty.';
      if (!nameRegex.test(str)) {
        return 'Must start with an uppercase letter; letters and hyphen only.';
      }
      return '';
    case 'login':
      if (!str) return 'Login must not be empty.';
      if (!loginRegex.test(str)) {
        return '3–20 characters, Latin letters, digits, no spaces, allowed: “-” and “_”, not digits only.';
      }
      return '';
    case 'email':
      if (!str) return 'Email must not be empty.';
      if (!emailRegex.test(str)) {
        return 'Invalid email format.';
      }
      return '';
    case 'password':
      if (!str) return 'Password must not be empty.';
      if (!passwordRegex.test(str)) {
        return '8–40 characters, must include at least one uppercase letter and one digit.';
      }
      return '';
    case 'confirm_password':
      if (!str) return 'Please repeat the password.';
      if (!allValues || typeof allValues.password !== 'string') {
        return 'Unable to verify password match.';
      }
      if (str !== allValues.password) {
        return 'Passwords do not match.';
      }
      return '';
    case 'phone':
      if (!str) return 'Phone number must not be empty.';
      if (!phoneRegex.test(str)) {
        return '10–15 digits, may start with "+".';
      }
      return '';
    case 'message':
      if (!str.trim()) return 'Message must not be empty.';
      return '';
    default:
      return '';
  }
}
