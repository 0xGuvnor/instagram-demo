import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function SettingsLayout({ children }: Props) {
  return (
    <div className="flex">
      <Tabs
        defaultValue="edit-profile"
        className="fixed left-0 top-0 flex h-full min-h-screen w-[250px] flex-col space-y-8 px-6 py-12 md:ml-20 lg:ml-64 lg:border-r"
        orientation={"vertical"}
      >
        <h4 className="ml-1 text-xl font-extrabold text-white">Settings</h4>
        <TabsList className="flex h-full flex-col items-start justify-start bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} asChild>
              <Button
                variant={"ghost"}
                size={"lg"}
                className="w-full !justify-start px-3 data-[state=active]:bg-zinc-100 dark:hover:bg-neutral-900 dark:data-[state=active]:bg-neutral-800"
              >
                {tab.title}
              </Button>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="ml-[200px] min-h-screen flex-1 bg-white xl:ml-32 dark:bg-neutral-950">
        {children}
      </div>
    </div>
  );
}
export default SettingsLayout;

type SettingsTab = {
  title: string;
  value: string;
};

const tabs: SettingsTab[] = [
  { title: "Edit profile", value: "edit-profile" },
  { title: "Professional account", value: "professional-account" },
  { title: "Notifications", value: "notifications" },
  { title: "Privacy and security", value: "privacy-and-security" },
  { title: "Login activity", value: "login-activity" },
  { title: "Emails from Instasnaps", value: "emails-from-instasnaps" },
];
