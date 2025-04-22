"use client";

import Header from "@components/Header/index.jsx";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {


  return (
    <>
        <Header
          logo="/your-logo.svg"
          logoAlt="Your Company"
          menuItems={[
            { label: "Home", href: "/" },
            { label: "Features", href: "/features" },
            { label: "Pricing", href: "/pricing" },
            { label: "About", href: "/about" }
          ]}
          rightItems={[
            <Link key="apps" href="/apps">
              <Button>Apps</Button>
            </Link>,
          ]}
          glassMorphism={true}
         />
    </>
  );
}
