"use client";

import MantineModal from "@components/modals/addModal";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AddButton() {
  const path = usePathname();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <section className="flex justify-end items-end">
        <MantineModal />
      </section>
    </>
  );
}
