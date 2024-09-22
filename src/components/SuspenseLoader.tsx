import { Suspense } from "react";
import { ReactNode } from "react";
import Loader from "./loader";

const SuspenseLoader = ({ children } : { children: ReactNode }) => {
  return (
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  );
};

export default SuspenseLoader;