import { AlertContainer } from "@/components/Alert";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { AlertProvider } from "@/contexts/AlertContext";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
	const { locale } = await params;

	if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
		notFound();
	}

	const messages = await getMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			<AlertProvider>
				<Nav />
				{children}
				<Footer />
				<AlertContainer />
			</AlertProvider>
		</NextIntlClientProvider>
	);
}
