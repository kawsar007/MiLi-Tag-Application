import ChangePasswordForm from "@/components/admin/ChangePasswordForm";

export default async function AdminProfilePage() {

  // if (!user) {
  //   redirect("/admin");
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">
            Profile Settings
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Manage your account information and security settings
          </p>
        </div>

        {/* Profile Information Card */}
        {/* <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm">
          <div className="border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
            <h2 className="font-semibold text-slate-900">Profile Information</h2>
          </div>
          <div className="p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Full Name</p>
                  <p className="mt-0.5 text-base font-semibold text-slate-900">
                    {user.name || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Email Address</p>
                  <p className="mt-0.5 text-base font-semibold text-slate-900">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Role</p>
                  <p className="mt-0.5">
                    <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
                      {user.role || "User"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                  <UserCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Account Status</p>
                  <p className="mt-0.5">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Account Created</p>
                  <p className="mt-0.5 text-base font-semibold text-slate-900">
                    {new Date(user.createdAt).toLocaleDateString("en-BD", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Last Updated</p>
                  <p className="mt-0.5 text-base font-semibold text-slate-900">
                    {new Date(user.updatedAt).toLocaleDateString("en-BD", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Change Password Card */}
        <ChangePasswordForm />
      </div>
    </div>
  );
}