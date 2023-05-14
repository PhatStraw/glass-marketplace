import Talk from "talkjs";
import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { prisma } from "../../utils/prisma-helper"
export default function Chat({to}) {
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;
  const chatboxEl = useRef();
  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);
  

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));
    
    if (talkLoaded) {
      const run = async () => {
        const from = await fetch("/api/user", {
          method: "POST",  
          body: JSON.stringify({ email: user.primaryEmailAddress.emailAddress }),
        });
        const data = await from.json();
    
        const currentUser = new Talk.User({
          id: data.id.toString() ,
          name: data.name ,
          email: data.email,
          welcomeMessage: "Hello!",
          role: "default",
        });
  
        const otherUser = new Talk.User({
          id: to.id.toString() ,
          name: to.name,
          email: to.email,
          welcomeMessage: "Hello!",
          role: "default",
        });
  
        const session = new Talk.Session({
          appId: "tlEBvYsS",
          me: currentUser,
        });
  
        const conversationId = Talk.oneOnOneId(currentUser, otherUser);
        const conversation = session.getOrCreateConversation(conversationId);
        conversation.setParticipant(currentUser);
        conversation.setParticipant(otherUser);
  
        const chatbox = session.createChatbox();
        chatbox.select(conversation);
        chatbox.mount(chatboxEl.current);
  
        return () => session.destroy();
      };
      run();
    }
  }, [talkLoaded, id, user, to]);

  return (
    <div style={{ height: "100vh", paddingTop: "4rem" }} ref={chatboxEl} />
  );
}

export async function getStaticPaths() {
  // Fetch the list of item IDs from your API or database
  const users = await prisma.user.findMany();
  // Map the item IDs to an array of objects with the `params` key
  const paths = users.map((user) => ({ params: { id: user.id.toString() } }));

  return {
    paths,
    fallback: false, // or 'blocking' or 'true'
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  const to = JSON.parse(JSON.stringify(user));
  return {
    props: {
      to,
    },
  };
}
