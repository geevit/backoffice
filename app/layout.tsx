import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};
const rebond = localFont({
    src: "../public/fonts/Rebond Grotesque.otf",
    variable: "--font-rebond",
});
const rebondBold = localFont({
    src: "../public/fonts/Rebond Grotesque Bold.otf",
    variable: "--font-rebond-bold",
});
const rebondItalic = localFont({
    src: "../public/fonts/Rebond Grotesque Italic.otf",
    variable: "--font-rebond-italic",
});
const rebondBoldItalic = localFont({
    src: "../public/fonts/Rebond Grotesque Bold Italic.otf",
    variable: "--font-rebond-bold-italic",
});
const rebondLight = localFont({
    src: "../public/fonts/Rebond Grotesque Light.otf",
    variable: "--font-rebond-light",
});
const rebondLightItalic = localFont({
    src: "../public/fonts/Rebond Grotesque Light Italic.otf",
    variable: "--font-rebond-light-italic",
});
const rebondMedium = localFont({
    src: "../public/fonts/Rebond Grotesque Medium.otf",
    variable: "--font-rebond-medium",
});
const rebondMediumItalic = localFont({
    src: "../public/fonts/Rebond Grotesque Medium Italic.otf",
    variable: "--font-rebond-medium-italic",
});
const rebondSemiBold = localFont({
    src: "../public/fonts/Rebond Grotesque Semibold.otf",
    variable: "--font-rebond-semi-bold",
});
const rebondSemiBoldItalic = localFont({
    src: "../public/fonts/Rebond Grotesque Semibold Italic.otf",
    variable: "--font-rebond-semi-bold-italic",
});
const rebondThin = localFont({
    src: "../public/fonts/Rebond Grotesque Thin.otf",
    variable: "--font-rebond-thin",
});
const rebondThinItalic = localFont({
    src: "../public/fonts/Rebond Grotesque Thin Italic.otf",
    variable: "--font-rebond-thin-italic",
});
const rebondHairline = localFont({
    src: "../public/fonts/Rebond Grotesque Hairline.otf",
    variable: "--font-rebond-hairline",
});
const rebondHairlineItalic = localFont({
    src: "../public/fonts/Rebond Grotesque Hairline Italic.otf",
    variable: "--font-rebond-hairline-italic",
});
const rebondExtraLight = localFont({
    src: "../public/fonts/Rebond Grotesque Extralight.otf",
    variable: "--font-rebond-extra-light",
});
const rebondExtraLightItalic = localFont({
    src: "../public/fonts/Rebond Grotesque Extralight Italic.otf",
    variable: "--font-rebond-extra-light-italic",
});
const rebondExtraBold = localFont({
    src: "../public/fonts/Rebond Grotesque Extrabold.otf",
    variable: "--font-rebond-extra-bold",
});
const rebondExtraBoldItalic = localFont({
    src: "../public/fonts/Rebond Grotesque Extrabold Italic.otf",
    variable: "--font-rebond-extra-bold-italic",
});
const roobertRegular = localFont({
    src: "../public/fonts/RoobertRegular.ttf",
    variable: "--font-roobert-regular",
});
const roobertBold = localFont({
    src: "../public/fonts/RoobertBold.ttf",
    variable: "--font-roobert-bold",
});
const roobertRegularItalic = localFont({
    src: "../public/fonts/RoobertRegularItalic.ttf",
    variable: "--font-roobert-italic",
});
const roobertBoldItalic = localFont({
    src: "../public/fonts/RoobertBoldItalic.ttf",
    variable: "--font-roobert-bold-italic",
});
const roobertLight = localFont({
    src: "../public/fonts/RoobertLight.ttf",
    variable: "--font-roobert-light",
});
const roobertLightItalic = localFont({
    src: "../public/fonts/RoobertLightItalic.ttf",
    variable: "--font-roobert-light-italic",
});
const roobertMedium = localFont({
    src: "../public/fonts/RoobertMedium.ttf",
    variable: "--font-roobert-medium",
});
const roobertMediumItalic = localFont({
    src: "../public/fonts/RoobertMediumItalic.ttf",
    variable: "--font-roobert-medium-italic",
});
const roobertSemiBold = localFont({
    src: "../public/fonts/RoobertSemiBold.ttf",
    variable: "--font-roobert-semi-bold",
});
const roobertSemiBoldItalic = localFont({
    src: "../public/fonts/RoobertSemiBoldItalic.ttf",
    variable: "--font-roobert-semi-bold-italic",
});
const roobertHeavy = localFont({
    src: "../public/fonts/RoobertHeavy.ttf",
    variable: "--font-roobert-heavy",
});
const roobertHeavyItalic = localFont({
    src: "../public/fonts/RoobertHeavyItalic.ttf",
    variable: "--font-roobert-heavy-italic",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body
                className={`bg-leaf 
            ${rebond.variable}
            ${rebondBold.variable}
            ${rebondItalic.variable}
            ${rebondBoldItalic.variable}
            ${rebondLight.variable}
            ${rebondLightItalic.variable}
            ${rebondMedium.variable}
            ${rebondMediumItalic.variable}
            ${rebondSemiBold.variable}
            ${rebondSemiBoldItalic.variable}
            ${rebondThin.variable}
            ${rebondThinItalic.variable}
            ${rebondHairline.variable}
            ${rebondHairlineItalic.variable}
            ${rebondExtraLight.variable}
            ${rebondExtraLightItalic.variable}
            ${rebondExtraBold.variable}
            ${rebondExtraBoldItalic.variable}
            ${roobertRegular.variable}
            ${roobertBold.variable}
            ${roobertRegularItalic.variable}
            ${roobertBoldItalic.variable}
            ${roobertLight.variable}
            ${roobertLightItalic.variable}
            ${roobertMedium.variable}
            ${roobertMediumItalic.variable}
            ${roobertSemiBold.variable}
            ${roobertSemiBoldItalic.variable}
            ${roobertHeavy.variable}
            ${roobertHeavyItalic.variable}

            `}>
                {children}
            </body>
        </html>
    );
}