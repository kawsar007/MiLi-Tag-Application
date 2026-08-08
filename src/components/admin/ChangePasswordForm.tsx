"use client";

import { AlertCircle, CheckCircle, Eye, EyeOff, Key, Lock, Shield } from "lucide-react";
import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    currentPassword?: string[];
    newPassword?: string[];
    confirmNewPassword?: string[];
  }>({});

  // Password strength validation
  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push("At least 8 characters");
    }
    if (!/[A-Za-z]/.test(password)) {
      errors.push("At least one letter");
    }
    if (!/\d/.test(password)) {
      errors.push("At least one number");
    }
    return errors;
  };

  const passwordErrors = validatePassword(newPassword);
  const isPasswordValid = passwordErrors.length === 0 && newPassword.length > 0;
  const isPasswordDifferent = newPassword !== currentPassword && newPassword.length > 0;
  const doPasswordsMatch = newPassword === confirmNewPassword && confirmNewPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setFieldErrors({});

    // Basic validation before API call
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setMessage({ type: "error", text: "All fields are required" });
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setFieldErrors({ confirmNewPassword: ["New password and confirmation do not match"] });
      return;
    }

    if (newPassword === currentPassword) {
      setFieldErrors({ newPassword: ["New password must be different from your current password"] });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/mili-tag/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmNewPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors from API
        if (response.status === 422 && data.issues) {
          setFieldErrors(data.issues);
          throw new Error("Please fix the validation errors");
        }
        throw new Error(data.error || "Failed to change password");
      }

      setMessage({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setFieldErrors({});
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to change password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm">
      <div className="border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-white px-6 py-4">
        <h2 className="flex items-center gap-2 font-semibold text-slate-900">
          <Key className="h-5 w-5 text-indigo-600" />
          Change Password
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        {message && (
          <div
            className={`mb-6 rounded-lg px-4 py-3 text-sm ${message.type === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
              }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-5">
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-700">
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setFieldErrors({ ...fieldErrors, currentPassword: undefined });
                }}
                className={`w-full rounded-lg border ${fieldErrors.currentPassword ? "border-red-300" : "border-slate-200"
                  } bg-white pl-10 pr-12 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all`}
                placeholder="Enter current password"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showCurrentPassword ? "Hide password" : "Show password"}
              >
                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {fieldErrors.currentPassword && (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3.5 w-3.5" />
                {fieldErrors.currentPassword[0]}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setFieldErrors({ ...fieldErrors, newPassword: undefined });
                }}
                className={`w-full rounded-lg border ${fieldErrors.newPassword ? "border-red-300" : "border-slate-200"
                  } bg-white pl-10 pr-12 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all`}
                placeholder="Enter new password"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {fieldErrors.newPassword && (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3.5 w-3.5" />
                {fieldErrors.newPassword[0]}
              </p>
            )}
            {/* Password Requirements */}
            {newPassword.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-xs font-medium text-slate-600">Password must include:</p>
                <ul className="space-y-0.5">
                  {[
                    { label: "At least 8 characters", valid: newPassword.length >= 8 },
                    { label: "At least one letter", valid: /[A-Za-z]/.test(newPassword) },
                    { label: "At least one number", valid: /\d/.test(newPassword) },
                  ].map((req) => (
                    <li key={req.label} className="flex items-center gap-1.5 text-xs">
                      {req.valid ? (
                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <AlertCircle className="h-3 w-3 text-slate-400" />
                      )}
                      <span className={req.valid ? "text-emerald-600" : "text-slate-500"}>
                        {req.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-slate-700">
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="confirmNewPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => {
                  setConfirmNewPassword(e.target.value);
                  setFieldErrors({ ...fieldErrors, confirmNewPassword: undefined });
                }}
                className={`w-full rounded-lg border ${fieldErrors.confirmNewPassword ? "border-red-300" : "border-slate-200"
                  } bg-white pl-10 pr-12 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all`}
                placeholder="Confirm new password"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {fieldErrors.confirmNewPassword && (
              <p className="mt-1.5 flex items-center gap-1 text-sm text-red-600">
                <AlertCircle className="h-3.5 w-3.5" />
                {fieldErrors.confirmNewPassword[0]}
              </p>
            )}
            {confirmNewPassword.length > 0 && newPassword.length > 0 && (
              <p className={`mt-1.5 flex items-center gap-1 text-xs ${doPasswordsMatch ? "text-emerald-600" : "text-red-600"
                }`}>
                {doPasswordsMatch ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  <AlertCircle className="h-3 w-3" />
                )}
                {doPasswordsMatch ? "Passwords match" : "Passwords do not match"}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Changing Password...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Change Password
              </>
            )}
          </button>

          {/* Password Policy Note */}
          <div className="rounded-lg bg-slate-50 px-4 py-3">
            <p className="text-xs text-slate-600">
              <Shield className="mb-1 mr-1 inline h-3 w-3" />
              Password must be at least 8 characters long and include at least one letter and one number.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}