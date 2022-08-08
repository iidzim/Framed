import React from "react";

import { IPicture } from "@interfaces";
import Image from "next/image";

import { ImagePreviewCard } from "@components/cards";
import Link from "@components/common/Link";
import MaxWidthContainer from "@components/common/MaxWidthContainer";
import MainLayout from "@layouts/MainLayout";

const PicPage = ({ pic }: { pic: IPicture }) => {
  return (
    <MainLayout title={`${pic.title}`}>
      <MaxWidthContainer>
        <div className="relative flex min-h-[90vh] w-full justify-between px-2 pb-4 sm:px-0">
          <aside className=" flex w-72 items-end px-4">
            <div>
              <div className="py-3">
                <p className="text-xl font-semibold text-gray-900">
                  {pic.title}
                </p>
                <p className="text-base  text-gray-600">{pic.description}</p>
              </div>
              <Link href={`/${pic.author.username}`}>
                <div className="flex max-w-max items-center gap-x-3 py-2">
                  <Image
                    className="rounded-full"
                    src={pic.author.avatar}
                    alt={pic.author.name}
                    width={40}
                    height={40}
                    layout="fixed"
                  />
                  <div>
                    <p className="text-gray-900">{pic.author.name}</p>
                    <p className="text-xs font-light text-gray-500">
                      {pic.date}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </aside>
          <div className="w-full ">
            <ImagePreviewCard
              imageUrl={pic.url}
              imageAlt={pic.title}
              author={{
                name: pic.author.name,
                username: pic.author.username,
                avatar: pic.author.avatar,
              }}
            />
          </div>
        </div>
      </MaxWidthContainer>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx: any) => {
  return {
    props: {
      pic: {
        title: "Halo",
        id: ctx.query.id,
        date: "2020-01-01",
        url: "https://images.unsplash.com/photo-1659705601423-d68098cb6017?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        author: {
          name: "John Doe",
          username: "johndoe",
          avatar:
            "https://images.unsplash.com/photo-1659705601423-d68098cb6017?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        },
      },
    },
  };
};

export default PicPage;
