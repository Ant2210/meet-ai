import { redirectIfAuthenticated } from "@/lib/auth-utils";
import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";

const SignUpPage = async () => {
  await redirectIfAuthenticated();

  return <SignUpView />;
};

export default SignUpPage;
