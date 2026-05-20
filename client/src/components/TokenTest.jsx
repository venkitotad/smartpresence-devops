import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function TokenTest() {
  const { getToken } = useAuth();

  useEffect(() => {
    (async () => {
      const token = await getToken({ template: "default" });
      console.log("🧩 Clerk token:", token ? token.slice(0, 30) + "..." : "❌ none");
    })();
  }, []);

  return <div>Testing Clerk Token...</div>;
}
