import FollowingModal from "@/components/FollowingModal";
import { fetchProfile } from "@/lib/data";

interface Props {
  params: { username: string };
}

async function FollowingPage({ params: { username } }: Props) {
  const profile = await fetchProfile(username);
  const following = profile?.following;

  return <FollowingModal following={following} username={username} />;
}
export default FollowingPage;
