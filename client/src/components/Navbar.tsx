import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Profile } from "./Profile";
import { LayoutDashboard } from "lucide-react";

export function Navbar() {
  const auth = useAuth();

  return (
    <div>
      <nav className="flex justify-between bg-slate-200 p-3 items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Note</h1>
        </div>
        <div className="flex gap-3">
          {(() => {
            if (auth.user == null) {
              return (
                <>
                  <Link to="/register">
                    <Button>Register</Button>
                  </Link>
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                </>
              );
            } else {
              return (
                <div className="flex gap-5 items-center">
                  <Link to="/dashboard">
                    <div className="flex justify-center gap-2 text-lg items-center">
                      <LayoutDashboard size={30} />
                      Dashboard
                    </div>
                  </Link>
                  <Profile />
                </div>
              );
            }
          })()}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
