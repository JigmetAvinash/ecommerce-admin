import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/providers/modal-provider'
import { ToasterProvider } from '@/providers/toast-provier'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin Dashboard',
  description: 'E-Commerce Dashboard for admin of store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<ToasterProvider />
					<ModalProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
