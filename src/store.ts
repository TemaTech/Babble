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
  name: string;
  avatar: File | null;
  avatarPreview: string;
}

export const profileData = atom<ProfileData>({
  name: "",
  avatar: null,
  avatarPreview: "",
});

interface ChatLastMessage {
  text: string;
  sentBy: string;
  sentAt: string;
}

interface NewChat {
  type: "personal" | "group";
  members: string[];
  createdBy: string;
  createdAt: string;
  title: string;
  lastMessage: ChatLastMessage;
  avatar: string;
}

export const newChat = atom<NewChat>({
  type: "personal",
  members: [],
  createdBy: "",
  createdAt: "",
  title: "",
  lastMessage: {
    text: "",
    sentAt: "",
    sentBy: "",
  },
  avatar: "",
});

interface NewGroupChatAvatars {
  avatar: File | null;
  avatarPreview: string;
}

export const newGroupChatAvatars = atom<NewGroupChatAvatars>({
  avatar: null,
  avatarPreview: "",
});

export const chatListSearchQuery = atom<string>("");

interface Chat {
  type: "personal" | "group";
  members: string[];
  createdBy: string;
  createdAt: string;
  title: string;
  lastMessage: ChatLastMessage;
  avatar: string;
  id: string;
  isPartnerOnline: boolean;
}

export const userChats = atom<Chat[]>([]);

export const chatDivRef = atom<React.MutableRefObject<HTMLDivElement | null> | null>(null);
