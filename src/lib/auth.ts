import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AuthResponse, LoginCredentials } from '@/types/auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const API_SECRET = process.env.NEXT_PUBLIC_API_SECRET

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        try {
          const response = await fetch(`${API_URL}/Auth/Login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': API_SECRET || '',
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          })

          if (!response.ok) {
            throw new Error('Invalid credentials')
          }

          const authResponse: AuthResponse = await response.json()

          if (authResponse.status === 0 && authResponse.data) {
            return {
              id: credentials.username,
              email: credentials.username,
              accessToken: authResponse.data.accessToken,
              refreshToken: authResponse.data.refreshToken,
            }
          }

          throw new Error('Authentication failed')
        } catch (error) {
          console.error('Auth error:', error)
          throw new Error('Authentication failed')
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}