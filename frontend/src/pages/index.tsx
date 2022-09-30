import type { NextPage } from "next";

import ImageCard from "@components/cards";
import MaxWidthContainer from "@components/common/MaxWidthContainer";
import MainLayout from "@layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <MainLayout title="Home">
      <MaxWidthContainer>
        <div className="grid h-full w-full grid-cols-1 gap-6 px-2 py-16 sm:grid-cols-2 md:grid-cols-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <ImageCard
              key={index}
              href={`/p/${index}`}
              imageUrl={
                index % 2 === 0
                  ? "https://images.unsplash.com/photo-1659705601423-d68098cb6017?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  : "https://images.unsplash.com/photo-1659720879195-d5a108231648?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              }
              imageAlt="Random image"
              author={{
                name: "John Doe",
                username: "johndoe",
                avatar:
                  "https://images.unsplash.com/photo-1659705601423-d68098cb6017?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
          ))}
        </div>
      </MaxWidthContainer>
    </MainLayout>
  );
};

export default Home;
