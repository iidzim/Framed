import React from "react";

import { useRouter } from "next/router";

import MaxWidthContainer from "@components/common/MaxWidthContainer";
import MainLayout from "@layouts/MainLayout";

const ProfilePage = () => {
  const router = useRouter();
  return (
    <MainLayout title={`${router.query.username}`}>
      <MaxWidthContainer>
        <p className="text-2xl font-semibold text-gray-800">
          Profile page for {router.query.username}
        </p>
      </MaxWidthContainer>
    </MainLayout>
  );
};

export default ProfilePage;
