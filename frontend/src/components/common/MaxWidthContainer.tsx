import React from "react";

const MaxWidthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-7xl flex-col justify-center pt-20">
      {children}
    </div>
  );
};

export default MaxWidthContainer;
