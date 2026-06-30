import AccountForm from "@/components/account-form";
import { checkAuth } from "@/lib/checkAuth";
import { getUserTableByIdService } from "@/services/user-service";

export default async function AccountPage() {
  const session = await checkAuth()
  const data = await getUserTableByIdService(session.user.id)
  return (
    <main>
      {data && <AccountForm data={data}/>}
    </main>
  );
}
