
// ----------------------------------------------------------------------

import LoaderComponent from "@/components/ui/loader";
import { Suspense } from "react";

const PageFrenteCaixa = async () => {
  return (
    <div >
      <Suspense fallback={<LoaderComponent />}>
        <div >
          <h1>Frente Caixa</h1>
        </div>
      </Suspense>
    </div>
  );
};



export default PageFrenteCaixa;
