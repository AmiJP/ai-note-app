import { Home } from "lucide-react";

export function HomePage() {
  return (
    <div className="flex flex-col  h-screen justify-center items-center">
      <Home size={128} />
      <h1 className="text-3xl">Home page</h1>
    </div>
  );
}
