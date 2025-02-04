import dynamic from "next/dynamic";
import getUsers from "../../actions/getUsers";
import UserList from "./components/UserList";
import Sidebar from "../../components/sidebar/Sidebar";
const Header = dynamic(
  () => import("../conversations/[conversationId]/components/Header"),
);
const Userlist = dynamic(() => import("./components/UserList"));
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
