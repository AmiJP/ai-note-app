import { Bot } from "lucide-react";

export function ErrorPage() {
  return (
    <div className="flex flex-col  h-screen justify-center items-center">
      <Bot size={128} />
      <h1 className="text-3xl">Oops!</h1>
      <h1 className="text-3xl">404 - Page Not Found</h1>
    </div>
  );
}
