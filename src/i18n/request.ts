import { getRequestConfig } from "next-intl/server";
import yaml from "js-yaml";
import { readFileSync } from "fs";
import { join } from "path";

export default getRequestConfig(async () => {
  const locale = "en";

  const filePath = join(process.cwd(), "messages", `${locale}.yml`);
  const raw = readFileSync(filePath, "utf8");
  const messages = yaml.load(raw) as Record<string, unknown>;

  return {
    locale,
    messages,
  };
});
