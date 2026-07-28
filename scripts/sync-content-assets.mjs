import fs from "node:fs";
import path from "node:path";

// content/assets 是老师维护的唯一资源源目录。
// public/content/assets 是自动生成目录，请勿手动编辑。
// 两边保持相同目录层级，因此配置路径可直接写成 /content/assets/文件名。
const projectRoot = process.cwd();
const source = path.join(projectRoot, "content", "assets");
const target = path.join(projectRoot, "public", "content", "assets");
const expectedTarget = path.join(projectRoot, "public", "content", "assets");
const legacyTarget = path.join(projectRoot, "public", "content-assets");

if (target !== expectedTarget) {
  throw new Error(`Unexpected asset target: ${target}`);
}

if (!fs.existsSync(source)) {
  throw new Error("Missing content/assets directory. This directory stores teacher-managed images and files.");
}

fs.rmSync(target, { recursive: true, force: true });
fs.rmSync(legacyTarget, { recursive: true, force: true });
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.cpSync(source, target, { recursive: true });

const fileCount = fs.readdirSync(target, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile()).length;

console.log(`Synced ${fileCount} teacher-managed asset(s) from content/assets.`);
