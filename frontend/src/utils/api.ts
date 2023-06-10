import { FullPackage, FullPackageNoID, ReducedPackage } from "../types";
import { standardize } from "./package";
import { urlEncodeObject } from "./urlEncode";

const PREFIX = import.meta.env.DEV ? "http://localhost:3000/api/v1" : "/api/v1";

export function getDetailsByID(id: number, signal?: AbortSignal) {
  return fetch(PREFIX + "/get?" + urlEncodeObject({ id }), { signal })
    .then(v => v.json())
    .then(v => Promise.resolve(standardize(v) as FullPackage));
}

export function getByDate(start: Date, end: Date, signal?: AbortSignal) {
  return fetch(PREFIX + "/get/byDate?" + urlEncodeObject({ start: start.toISOString(), end: end.toISOString() }), { signal })
    .then(v => v.json())
    .then(v => Promise.resolve(v.map((a: any) => standardize(a) as ReducedPackage)));
}

export function getRecent(signal?: AbortSignal) {
  return fetch(PREFIX + "/get/recent", { signal })
    .then(v => v.json())
    .then(v => Promise.resolve(v.map((a: any) => standardize(a) as ReducedPackage)));
}

export function add(data: FullPackageNoID, signal?: AbortSignal) {
  return fetch(PREFIX + "/add?" + urlEncodeObject(data), { signal, method: "POST" })
    .then(v => v.json())
    .then(v => Promise.resolve(standardize(v) as FullPackage));
}

export function update(data: FullPackage, signal?: AbortSignal) {
  return fetch(PREFIX + "/update?" + urlEncodeObject(data), { signal, method: "POST" });
}

export function remove(id: number, signal?: AbortSignal) {
  return fetch(PREFIX + "/delete?" + urlEncodeObject({ id }), { signal, method: "POST" });
}