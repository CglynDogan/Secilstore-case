'use client'

import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './ThemeProvider'
import { DndProvider } from './DndProvider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <DndProvider>
          <ThemeProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </ThemeProvider>
        </DndProvider>
      </Provider>
    </SessionProvider>
  )
}