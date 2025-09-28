import { redirectIfNotAuthenticated } from "@/lib/auth-utils";
import { HomeView } from "@/modules/home/ui/views/home-view";

const Home = async () => {
  const session = await redirectIfNotAuthenticated();

  return <HomeView session={session} />;
};

export default Home;
