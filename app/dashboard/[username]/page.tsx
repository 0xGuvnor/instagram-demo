interface Props {
  params: { username: string };
}

function ProfilePage({ params: { username } }: Props) {
  return <div>{username}</div>;
}
export default ProfilePage;
