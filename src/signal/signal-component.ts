import { JSX } from '@/types/jsx-runtime';
import { disentangles, type Disentangle } from '../use/use-disentangle'
import { Mount, mounts } from '@/use/use-mount';


export default class SignalComponent {

  /**
   * 收集卸载
  */
  disentangles: Set<Disentangle>;

  /**
   * 收集挂载
   */
  mounts: Set<Mount>

  #component: () => JSX.Element;

  constructor(component) {
    this.disentangles = new Set();
    this.mounts = new Set();
    this.#component = component;
  }

  render = () => {
    const element = this.#component();
    if (disentangles.length) {
      for (const disentangle of disentangles) {
        this.disentangles.add(disentangle)
      };
      disentangles.length = 0;
    }
    if (mounts.length) {
      for (const mount of mounts) this.mounts.add(mount)
      // mounts.length = 0;
    }
    return element
  }
}

