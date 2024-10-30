import { Metadata } from "next";

export const generateMetadata = ({
  title,
  description,
}: Metadata): Metadata => {
  return {
    title,
    description,
  };
};
