import { auth } from "@/auth";
import FollowButton from "@/components/FollowButton";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileTabs from "@/components/ProfileTabs";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { fetchProfile } from "@/lib/data";
import { MoreHorizontal, Settings } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  params: { username: string };
  children: ReactNode;
}

export async function generateMetadata(
  { params: { username } }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const profile = await fetchProfile(username);

  return {
    title: `${profile?.name} (@${profile?.username})`,
  };
}

async function ProfileLayout({ params: { username }, children }: Props) {
  const profile = await fetchProfile(username);
  const session = await auth();
  const isCurrentUser = session?.user.id === profile?.id;
  const isFollowing = profile?.followedBy.some(
    (user) => user.followerId === session?.user.id,
  );

  if (!profile) {
    notFound();
  }

  return (
    <>
      <ProfileHeader username={username} />
      <div className="mx-auto max-w-4xl">
        <div className="flex gap-x-5 px-4 md:gap-x-10">
          <ProfileAvatar user={profile}>
            <UserAvatar
              user={profile}
              className="size-20 cursor-pointer md:size-36"
            />
          </ProfileAvatar>

          <div className="space-y-4 md:px-10">
            <div className="grid grid-cols-2 items-center gap-3 md:grid-cols-4">
              <p className="truncate text-xl font-semibold md:text-base">
                {profile.username}
              </p>
              {isCurrentUser ? (
                <>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="md:order-last"
                  >
                    <Settings />
                  </Button>

                  <Button
                    asChild
                    size={"sm"}
                    variant={"secondary"}
                    className="font-bold"
                  >
                    <Link href={`/dashboard/edit-profile`}>Edit profile</Link>
                  </Button>

                  <Button
                    variant={"secondary"}
                    size={"sm"}
                    className="font-bold"
                  >
                    View archive
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="md:order-last"
                  >
                    <MoreHorizontal />
                  </Button>

                  <FollowButton
                    isFollowing={isFollowing!}
                    profileId={profile.id}
                  />

                  <Button
                    variant={"secondary"}
                    size={"sm"}
                    className="font-bold"
                  >
                    Message
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-x-7">
              <p className="font-medium">
                <strong>{profile.posts.length} posts</strong>
              </p>

              <Link
                href={`/dashboard/${profile.username}/followers`}
                className="font-medium"
              >
                <strong>{profile.followedBy.length}</strong> follower
                {profile.followedBy.length === 1 ? "" : "s"}
              </Link>

              <Link
                href={`/dashboard/${profile.username}/following`}
                className="font-medium"
              >
                <strong>{profile.following.length}</strong> following
              </Link>
            </div>

            <div className="text-sm">
              <div className="font-bold">{profile.name}</div>
              <p>{profile.bio}</p>
            </div>
          </div>
        </div>

        <ProfileTabs isCurrentUser={isCurrentUser} profile={profile} />

        {children}
      </div>
    </>
  );
}
export default ProfileLayout;
