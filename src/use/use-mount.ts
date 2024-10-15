export type Mount = () => void;
export const mounts: Mount[] = [];

export default function useMount(mount: Mount) {
  mounts.push(mount)
}