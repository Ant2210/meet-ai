import { redirectIfAuthenticated } from "@/lib/auth-utils";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";

const SignInPage = async () => {
  await redirectIfAuthenticated();

  return <SignInView />;
};

export default SignInPage;
