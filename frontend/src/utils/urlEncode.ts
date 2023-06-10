export function urlEncodeObject(obj: object, prefix?: string): string {
  var str = [], p;

  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + "[" + p + "]" : p;
      let v = (obj as any)[p];

      if (v !== null && v instanceof Date) {
        str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v.toDateString()));
      } else {
        str.push((v !== null && typeof v === "object") ?
          urlEncodeObject(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }

    }
  }
  return str.join("&");
}