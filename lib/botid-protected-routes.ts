export type BotIdProtectedRoute = {
  path: string;
  method: string;
  advancedOptions?: {
    checkLevel?: "basic" | "deepAnalysis";
  };
};

export const botIdProtectedRoutes: BotIdProtectedRoute[] = [
  {
    path: "/api/parents-signup",
    method: "POST",
    advancedOptions: { checkLevel: "basic" },
  },
];
