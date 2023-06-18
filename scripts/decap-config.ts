import fs from "fs";
import yaml from "js-yaml";

interface TypeConfig {
  label: string;
  name: string;
  widget: string;
  fields?: FieldConfig[];
  types?: SubstitutionTypeConfig[];
}

type SubstitutionTypeConfig = TypeConfig | { substitute?: string };

interface TypesConfig {
  types: TypeConfig[];
}

interface FieldConfig {
  types?: SubstitutionTypeConfig[];
}

interface BaseConfig {
  collections: {
    fields: FieldConfig[];
  }[];
}

// Load YAML files
const baseConfig: BaseConfig = yaml.load(
  fs.readFileSync("./src/admin/config.yml", "utf8")
) as BaseConfig;
const typesConfig: TypesConfig = yaml.load(
  fs.readFileSync("./src/admin/types.yml", "utf8")
) as TypesConfig;

// Function to handle substitution
interface FieldConfig extends Record<string, any> {
  types?: SubstitutionTypeConfig[];
}

function substituteTypesInField(field: FieldConfig): FieldConfig {
  if (field.types) {
    field.types = substituteTypes(field.types);
  }
  return field;
}

function substituteTypes(
  types: SubstitutionTypeConfig[]
): SubstitutionTypeConfig[] {
  return types.map((type) => {
    if ("substitute" in type) {
      const substituteType = typesConfig.types.find(
        (t) => t.name === type.substitute
      );
      if (substituteType) {
        // Perform deep copy and recursively handle nested types.
        const substitutedType = JSON.parse(
          JSON.stringify(substituteType)
        ) as TypeConfig;
        if (substitutedType.types) {
          substitutedType.types = substituteTypes(substitutedType.types);
        }
        // Recursively handle nested fields.
        if (substitutedType.fields) {
          substitutedType.fields = substitutedType.fields.map(
            substituteTypesInField
          );
        }
        return substitutedType;
      }
    } else if ((type as TypeConfig).types) {
      // Handle nested types in the original type.
      const originalType = type as TypeConfig;
      originalType.types = substituteTypes(originalType.types || []);
    } else if ((type as TypeConfig).fields) {
      // Handle nested fields in the original type.
      const originalType = type as TypeConfig;
      originalType.fields = (originalType.fields || []).map(
        substituteTypesInField
      );
    }
    return type;
  });
}

// Merge configurations
baseConfig.collections.forEach((collection) => {
  collection.fields.forEach((field) => {
    if (field.types) {
      field.types = substituteTypes(field.types);
    }
  });
});

// Enslure ./public exists
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}

// Ensure ./public/admin exists
if (!fs.existsSync("./public/admin")) {
  fs.mkdirSync("./public/admin");
}

// Write to new YAML file
fs.writeFileSync("./public/admin/config.yml", yaml.dump(baseConfig), "utf8");
