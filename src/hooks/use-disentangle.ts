
export type Disentangle = () => void;

export const disentangles: Disentangle[] = [];
/**
 * @function useDisentangle
 * unload
 */
export const useDisentangle = (disentangle: Disentangle) => {
  disentangles.push(disentangle)
}