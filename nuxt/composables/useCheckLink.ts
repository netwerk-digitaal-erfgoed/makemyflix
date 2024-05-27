export const useCheckLink = (str: string): boolean => {
  try {
    return Boolean(new URL(str));
  }
  catch(e){
    return false;
  }
}
