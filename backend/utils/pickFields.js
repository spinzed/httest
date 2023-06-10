function reducePackageFields(package) {
  if (!package) return;

  return {
    id: package.id,
    trackingCode: package.trackingCode,
    initiatedAt: package.initiatedAt,
    status: package.status,
  };
}

module.exports = { reducePackageFields };
