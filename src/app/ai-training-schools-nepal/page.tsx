import SectorTrainingPage, { sectorMetadata } from "@/components/training/SectorTrainingPage";
import { SCHOOLS } from "@/content/training/sectors/schools";

export const metadata = sectorMetadata(SCHOOLS);

/** /ai-training-schools-nepal — guide §7. All copy is in the content file. */
export default function Page() {
  return <SectorTrainingPage sector={SCHOOLS} />;
}
