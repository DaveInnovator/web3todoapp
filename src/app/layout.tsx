import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'My Next App',
  description: 'Next.js + Wagmi + React Query',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
