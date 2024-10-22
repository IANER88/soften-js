import { JSX } from '@/types/jsx-runtime';
import { disentangles, type Disentangle } from '@/hooks/use-disentangle'
import { Mount, mounts } from '@/hooks/use-mount';
import { components } from '@/utils/create-component';

export default class SignalComponent {
  /**
   * 收集卸载
  */
  disentangles: Set<Disentangle> = new Set();

  /**
   * 收集挂载
   */
  mounts: Set<Mount> = new Set();

  #component: () => JSX.Element;

  constructor(component) {
    this.#component = component;
  }

  render = () => {
    const element = this.#component();
    const createDisentangle = components.at(-1);
    if (disentangles.length) {
      for (const disentangle of disentangles) {
        this.disentangles.add(disentangle);
        createDisentangle?.subscriber?.disentangles.add(disentangle);
      };
      disentangles.length = 0;
    }
    if (mounts.length) {
      for (const mount of mounts) {
        this.mounts.add(mount);
        createDisentangle?.subscriber?.mounts.add(mount);
      }
      mounts.length = 0;
    }
    components.pop();
    return element instanceof SignalComponent ? element.render() : element;
  }
}

