import '@/app/globals.css';
import { ImageIcon, Sparkles } from 'lucide-react'

import Nav from '@/components/Nav';

import SidebarLinks from '@/components/SidebarLinks';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen">
      <Nav />
      <main className="grid grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-[12rem_auto]">
        <aside className="md:my-6">
          <SidebarLinks
            links={[
              {
                icon: <ImageIcon className="w-5 h-5" />,
                label: 'Photos',
                path: '/'
              },
              {
                icon: <Sparkles className="w-5 h-5" />,
                label: 'Creations',
                path: '/creations'
              }
              
            ]}
          />
        </aside>
        <div>{ children }</div>
      </main>
      <Footer />
    </div>
  )
}