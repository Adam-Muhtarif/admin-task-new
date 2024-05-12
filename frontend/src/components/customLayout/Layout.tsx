"use client";

import { useEffect } from "react";
import SideBar from "@components/sideBar/SideBar";
import { socket } from "@utility/socket";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const onConnect = () => console.log("Websocket Connected");
  const onDisconnect = () => console.log("Websocket Disconnected");

  useEffect(() => {
    socket.connected && onConnect();
    socket.disconnected && onDisconnect();

    socket.on("postCreated", (post) => {
      console.log(`Post Created`);
      console.log(post);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <main className="m-8">
      <aside className="w-40">
        <SideBar />
      </aside>
      <section>{children}</section>
    </main>
  );
}
