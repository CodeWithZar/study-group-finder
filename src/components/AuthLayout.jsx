import { link } from "react-router-dom";

export default function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLabel,
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradeint-to-br from-blue-900 via-blue-900 to blue-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <Link to="/login" className="text-2xl font-bold text-blue-900">
            Study Group Finder
          </Link>
          <h1 className="mt-4 text-xl font-semibold text-slate-900">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          )}
        </div>

        {children}

        {footerText && footerLink && (
          <p className="mt-6 text-center text-sm text-slate-600">
            {footerText}
            {""}
            <link
              to={footerLink}
              className="font-semibold text-blue-700 hover:text-blue-900"
            >
              {footerLabel}
            </link>
          </p>
        )}
      </div>
    </div>
  );
}
