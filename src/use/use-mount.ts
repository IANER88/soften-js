type MountEffect = () => void;
const list: MountEffect[] = [];

const useMount = (mount: MountEffect) => {
  list.push(mount)
}

const getMount = () => list;

export {
  useMount,
  getMount,
}