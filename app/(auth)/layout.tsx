import React from "react";
import Provider from "../provider";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-center pt-20 gradient-background2">
      <Provider>{children}</Provider>
    </div>
  );
};

export default AuthLayout;
