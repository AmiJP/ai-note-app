import { Progress } from "@/components/ui/progress";

import * as React from "react";

export function Loader() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-md">
      <div className="flex flex-col w-1/3 items-center gap-3">
        <h1>Loading...</h1>
        <Progress value={progress} className="w-[60%]" />;
      </div>
    </div>
  );
}
