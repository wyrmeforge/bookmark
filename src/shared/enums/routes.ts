export const Routes = {
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  Home: "/home",
  Friends: "/friends",
  ForgotPassword: "/forgot-password",
} as const;

export type Routes = (typeof Routes)[keyof typeof Routes];
