// scripts/copy-mf.js
const fs = require("fs-extra");
const path = require("path");

const hostDist = path.resolve(__dirname, "../packages/host/dist");
const mfAccountDist = path.resolve(__dirname, "../packages/mf-account/dist");
const mfTransactionsDist = path.resolve(
  __dirname,
  "../packages/mf-transactions/dist"
);

async function copy() {
  console.log("📦 Copying MF builds into Host dist folder...");

  await fs.ensureDir(path.join(hostDist, "mf-account"));
  await fs.copy(mfAccountDist, path.join(hostDist, "mf-account"));

  await fs.ensureDir(path.join(hostDist, "mf-transactions"));
  await fs.copy(mfTransactionsDist, path.join(hostDist, "mf-transactions"));

  console.log("✅ MF builds copied!");
}

copy().catch((err) => {
  console.error("❌ Error copying MF builds:", err);
  process.exit(1);
});
