import { atom } from 'jotai'

export const authPageMode = atom<"signIn" | "signUp" | "requestPasswordReset">("signIn");

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

interface ProfileData {
  name: string | undefined;
  avatar: File | undefined;
  avatarPreview: string | undefined;
}

export const profileData = atom<ProfileData>({
  name: undefined,
  avatar: undefined,
  avatarPreview: undefined,
});
