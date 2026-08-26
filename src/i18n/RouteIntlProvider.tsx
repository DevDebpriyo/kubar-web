import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";
import { getMessages } from "next-intl/server";

export async function RouteIntlProvider({
  children,
  namespaces,
}: {
  children: React.ReactNode;
  namespaces: readonly string[];
}) {
  const allMessages = await getMessages();
  const messages: AbstractIntlMessages = {};

  for (const namespace of namespaces) {
    const value = allMessages[namespace];
    if (value !== undefined) messages[namespace] = value;
  }

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
