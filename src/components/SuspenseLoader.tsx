import { Suspense, lazy } from "react";
import Loader from "./loader";

const SuspenseLoader = ({ path } : { path: string }) => {

  const Img = lazy(() => import(`../imageLoaders/${path}`));

  return (
    <Suspense fallback={<Loader />}>
      <Img />
    </Suspense>
  );
};

export default SuspenseLoader;