// Converts the recieved package object into 
export function standardize(obj: any): object {
  return { ...obj, initiatedAt: new Date(obj.initiatedAt) };
}