import FollowersModal from "@/components/FollowersModal";
import { fetchProfile } from "@/lib/data";

interface Props {
  params: { username: string };
}

async function FollowersPage({ params: { username } }: Props) {
  const profile = await fetchProfile(username);
  const followers = profile?.followedBy;

  return <FollowersModal followers={followers} username={username} />;
}
export default FollowersPage;
