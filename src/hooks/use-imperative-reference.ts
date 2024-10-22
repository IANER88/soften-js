import { Reference } from "@/hooks/use-reference";

type createReferences = () => ({});

export default function useImperativeReference(
  reference: Reference,
  createReference: createReferences
) {
  reference.reference = createReference();
}