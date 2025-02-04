import getConversations from "@/actions/getConversations";
import getCurrentUser from "@/actions/getCurrentUser";
import getUsers from "@/actions/getUsers";
import Sidebar from "@/components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [conversations, users, user] = await Promise.all([
    getConversations(),
    getUsers(),
    getCurrentUser(),
  ]);

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <ConversationList
          users={users}
          user={user}
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}
