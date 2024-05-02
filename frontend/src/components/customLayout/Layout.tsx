import MantineModal from "@components/modals/addModal";
import SideBar from "@components/sideBar/SideBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="m-8">
      <aside className="w-40">
        <SideBar />
      </aside>
      <section>
        {/* <MantineModal /> */}
        {children}
      </section>
    </main>
  );
}
