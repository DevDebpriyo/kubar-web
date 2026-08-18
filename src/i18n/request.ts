import { getRequestConfig } from "next-intl/server";
import { load as parseYaml } from "js-yaml";
import rawMessages from "../../messages/en.yml";

export default getRequestConfig(async () => {
  const locale = "en";

  const messages = parseYaml(rawMessages) as Record<string, unknown>;

  return {
    locale,
    messages,
  };
});
