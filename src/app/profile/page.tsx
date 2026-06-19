import { LocalStorageDemo } from "@/components/LocalStorageDemo";

export default function Profile() {
  return (
    <div className="flex justify-center items-start pt-10 min-h-full">
      <LocalStorageDemo pageName="Profile" />
    </div>
  );
}
