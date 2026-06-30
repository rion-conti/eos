
import { authClient } from "./auth-client";

export async function checkAuthClient() {
   const { 
    data: session, 
    isPending, 
    error 
  } = authClient.useSession();

  if (isPending) return "<div>Loading...</div>";
  if (error) return "<div>Error loading session</div>";
  if (!session) return "<div>Not logged in</div>";
  return session;
}
