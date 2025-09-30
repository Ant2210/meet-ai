import { redirectIfNotAuthenticated } from "@/lib/auth-utils";
import { HomeView } from "@/modules/home/ui/views/home-view";

const Home = async () => {
  await redirectIfNotAuthenticated();

  return <HomeView />;
};

export default Home;
