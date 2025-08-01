const fs = require("fs");
const path = require("path");

const dirsToDelete = ["node_modules", "packages/*/dist"];

const deleteFolderRecursive = (targetPath) => {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
    console.log(`Deleted: ${targetPath}`);
  }
};

dirsToDelete.forEach((pattern) => {
  if (pattern.includes("*")) {
    // handle wildcards (dist folders)
    const baseDir = pattern.split("/*")[0];
    fs.readdirSync(baseDir).forEach((pkg) => {
      const distPath = path.join(baseDir, pkg, "dist");
      deleteFolderRecursive(distPath);
    });
  } else {
    deleteFolderRecursive(pattern);
  }
});

console.log("✅ Clean completed!");
