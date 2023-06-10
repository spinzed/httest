import Status from "./utils/status";

type PlainID = {
  id: ID;
};

type CorePackageAttributes = {
  trackingCode: string;
  initiatedAt: Date;
  status: Status;
};

type ExtendedPackageAttributes = {
  buyerName: string;
  carrierName: string;
  deliveryAddress: string;
  weight: number;
};

type ReducedPackage = PlainID & CorePackageAttributes;
type FullPackage = ReducedPackage & ExtendedPackageAttributes;
type FullPackageNoID = CorePackageAttributes & ExtendedPackageAttributes;