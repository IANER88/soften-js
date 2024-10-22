export type Recrudescence = () => void;

export type RecrudescenceFn = {
  rely(): void;
  deps: Set<Set<RecrudescenceFn>>
}

const stack: RecrudescenceFn[] = [];

const useRecrudescence = (recrudescence: Recrudescence) => {
  const rely = () => {
    for (const dep of effect.deps) {
      dep.delete(effect);
    }
    effect.deps.clear();
    stack.push(effect);
    try {
      recrudescence();
    } finally {
      stack.pop();
    }
  }

  const effect: RecrudescenceFn = {
    deps: new Set(),
    rely,
  }
  rely();
}

const getRecrudescence = () => stack;

export {
  useRecrudescence,
  getRecrudescence
};