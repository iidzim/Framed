import React from "react";

import cn from "classnames";
import Head from "next/head";

import Navbar from "@components/common/Navbar";

interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
  backgroundColor?: string;
  noWrap?: boolean;
  // if true, pageTitle will be used as the title, otherwise it will be appended to the title
  exactTitle?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  title,
  exactTitle = false,
  backgroundColor,
  noWrap = false,
}) => {
  return (
    <>
      <Head>
        <title>{exactTitle ? title : `${title} | WeFrame`}</title>
      </Head>
      <Navbar />
      <main className="flex h-full min-h-screen w-full justify-center">
        <div
          className={cn(
            "flex flex-col items-center w-full justify-center h-full max-w-7xl",
            {
              "max-w-none": noWrap,
            },
            backgroundColor
          )}
        >
          {children}
        </div>
      </main>
    </>
  );
};

export default MainLayout;
