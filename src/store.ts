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
  name: string | null;
  avatar: File | null;
  avatarPreview: string | null;
}

export const profileData = atom<ProfileData>({
  name: null,
  avatar: null,
  avatarPreview: null,
});

interface ChatLastMessage {
  text: string | null;
  sentBy: string | null;
  sentAt: string | null;
}

interface NewChat {
  type: "personal" | "group" | null;
  members: string[] | null;
  createdBy: string | null;
  createdAt: string | null;
  title: string | null;
  lastMessage: ChatLastMessage;
  avatar: string | null;
}

export const newChat = atom<NewChat>({
  type: null,
  members: null,
  createdBy: null,
  createdAt: null,
  title: null,
  lastMessage: {
    text: null,
    sentAt: null,
    sentBy: null,
  },
  avatar: null,
});

interface NewGroupChatAvatars {
  avatar: File | null;
  avatarPreview: string | null;
}

export const newGroupChatAvatars = atom<NewGroupChatAvatars>({
  avatar: null,
  avatarPreview: null,
});

export const chatListSearchQuery = atom<string | null>(null);
