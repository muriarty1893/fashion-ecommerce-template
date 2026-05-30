import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Admin from "../../views/Admin";
import { readSessionFromCookieHeader } from "../../lib/auth";

const AdminPage = async () => {
  const cookieStore = await cookies();
  const session = readSessionFromCookieHeader(cookieStore.toString());

  if (session?.role !== "admin") {
    redirect("/login");
  }

  return <Admin />;
};

export default AdminPage;
