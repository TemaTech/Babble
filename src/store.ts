import { User } from '@firebase/auth';
import { atom } from 'jotai'

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signUpFormData = atom<SignUpFormData>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

interface SignInFormData {
  email: string;
  password: string;
}

export const signInFormData = atom<SignInFormData>({
  email: '',
  password: '',
});

interface RequestPasswordResetFormData {
  email: string;
}

export const requestPasswordResetFormData = atom<RequestPasswordResetFormData>({
  email: '',
});

interface NewPasswordFormData {
  password: string;
  confirmPassword: string;
}

export const newPasswordFormData = atom<NewPasswordFormData>({
  password: '',
  confirmPassword: '',
});

export const currentUser = atom<User | null>(null);
