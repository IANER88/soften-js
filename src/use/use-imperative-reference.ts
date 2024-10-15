import { Reference } from "@/use/use-reference";

type createReferences = () => ({});

export default function useImperativeReference(
  reference: Reference,
  createReference: createReferences
) {
  reference.reference = createReference();
}