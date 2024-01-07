"use client";

import { UserSchema } from "@/lib/schemas";
import { UserWithExtras } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProfileAvatar from "./ProfileAvatar";
import UserAvatar from "./UserAvatar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { updateProfile } from "@/lib/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

interface Props {
  profile: UserWithExtras;
}

function ProfileForm({ profile }: Props) {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      id: profile.id,
      image: profile.image || "",
      name: profile.name || "",
      username: profile.username || "",
      bio: profile.bio || "",
      gender: profile.gender || "",
      website: profile.website || "",
    },
  });

  const { isDirty, isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof UserSchema>) => {
    const { message } = await updateProfile(values);
    toast(message);
  };

  return (
    <div className="max-w-xl space-y-8 py-10 lg:p-10">
      <div className="flex items-center gap-x-2 md:gap-x-5">
        <ProfileAvatar user={profile}>
          <div className="flex md:w-20 md:justify-end">
            <UserAvatar user={profile} className="size-11 cursor-pointer" />
          </div>
        </ProfileAvatar>

        <div>
          <p className="font-medium">{profile.username}</p>
          <ProfileAvatar user={profile}>
            <p className="cursor-pointer text-sm font-bold text-blue-500 hover:text-white">
              Change profile photo
            </p>
          </ProfileAvatar>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row md:items-center">
                  <FormLabel className="w-20 font-bold md:text-right">
                    Website
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Website URL" disabled />
                  </FormControl>
                </div>
                <FormDescription className="text-xs md:ml-24">
                  Editing your website URL is only available on mobile. Visit
                  the Instasnaps app and edit your profile to change the website
                  in your bio.
                </FormDescription>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row md:items-center">
                  <FormLabel className="w-20 font-bold md:text-right">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} className="resize-none" />
                  </FormControl>
                </div>
                <FormDescription className="text-xs md:ml-24">
                  {field.value?.length} / 150
                </FormDescription>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col gap-x-8 gap-y-2 md:flex-row md:items-center">
                  <FormLabel className="w-20 font-bold md:text-right">
                    Gender
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Prefer not to say" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="n/a">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormDescription className="text-xs md:ml-24">
                  This won&apos;t be part of your public profile.
                </FormDescription>
                <FormMessage className="md:ml-24" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={!isDirty || !isValid || isSubmitting}
            className="md:ml-24"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
export default ProfileForm;
