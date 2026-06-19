import { LocalStorageDemo } from "@/components/LocalStorageDemo";

export default function Home() {
  return (
    <div className="flex justify-center items-start pt-10 min-h-full">
      <LocalStorageDemo pageName="Home" />
    </div>
  );
}
