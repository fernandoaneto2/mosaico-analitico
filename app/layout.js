import "./globals.css";

export const metadata = {
  title: "Mosaico Analítico — Clínica e Transmissão | João Pessoa/PB",
  description:
    "Mosaico Analítico — consultório de psicologia e psicanálise em João Pessoa/PB. Conheça as profissionais e o nosso espaço de escuta para todas as idades.",
  openGraph: {
    title: "Mosaico Analítico — Clínica e Transmissão",
    description:
      "Consultório de psicologia e psicanálise em João Pessoa/PB. Escuta acolhedora para crianças, adolescentes, adultos e terceira idade.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport = { themeColor: "#20304F", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
