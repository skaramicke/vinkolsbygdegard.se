import fs from "fs";
import path from "path";

const contentDir = path.resolve(__dirname, "../src/data");
const manifestFile = path.resolve(__dirname, "../src/data.json");

const collections = fs.readdirSync(contentDir);

const manifest = collections.reduce((acc, collection) => {
  const collectionDir = path.join(contentDir, collection);
  const filenames = fs.readdirSync(collectionDir);

  acc[collection] = filenames.map((filename) => {
    // skip manifest.json
    if (filename === "manifest.json") {
      return null;
    }

    const filepath = path.join(collectionDir, filename);
    const slug = filename.replace(/\.json$/, "");
    const data = JSON.parse(fs.readFileSync(filepath, "utf-8"));

    return {
      slug: slug,
      ...data,
    };
  });

  return acc;
}, {} as Record<string, Array<{ filename: string; data: any }>>);

fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
