import { User } from "@prisma/client";

type AdminSettingsProps = { src?: User | null };
export function AdminSettings({ src }: AdminSettingsProps) {
  return (
    <div className="">
      <h4>Admin Settings</h4>
      <form action="nothing">
        <input type="text" name="email" />
      </form>
    </div>
  );
}

export default AdminSettings;
