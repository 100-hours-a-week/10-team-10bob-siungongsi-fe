import React from "react";
type TitleProps = {
  children: React.ReactNode;
};

export const SectionTitle = ({ children }: TitleProps) => {
  return <h1 className="text-center text-xl font-bold">{children}</h1>;
};
