import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-cloud">
      <AdminSidebar />
      <div className="flex flex-1 flex-col lg:pl-56">
        <AdminTopbar />
        <main className="flex-1 p-5 pt-16 sm:p-8 lg:pt-8">{children}</main>
      </div>
    </div>
  );
}

// import AdminSidebar from "@/components/admin/AdminSidebar";
// import AdminTopbar from "@/components/admin/AdminTopbar";

// export default function AdminProtectedLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex min-h-screen bg-cloud">
//       <AdminSidebar />
//       <div className="flex flex-1 flex-col">
//         <AdminTopbar />
//         <main className="flex-1 p-5 sm:p-8">{children}</main>
//       </div>
//     </div>
//   );
// }
