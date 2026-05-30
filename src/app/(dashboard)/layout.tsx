import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <main className="min-h-full p-[32px]">
          {children}
        </main>
      </div>
    </div>
  );
}
