'use client';

import { useState, createContext, useContext, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

// Create a context for user state
const UserContext = createContext(undefined);

/**
 * Provider component for user state management
 * @param {object} props - The component props
 * @param {React.ReactNode} props.children - The child components
 */
export function UserProvider({ children }) {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [userExists, setUserExists] = useState(null);

  // Check if user exists when wallet address changes
  useEffect(() => {
    async function checkUserExists() {
      if (!address || !isConnected) {
        // Reset state when disconnected
        setUserExists(null);
        return;
      }
      
      try {
        setIsCheckingUser(true);
        const response = await fetch(`/api/users?walletAddress=${address}`);
        const data = await response.json();
        
        if (data.success) {
          setUserExists(data.exists);
          
          // If user doesn't exist, redirect to registration
          if (!data.exists) {
            toast({
              title: "Registration Required",
              description: "Please complete your profile to continue.",
              duration: 5000,
            });
            router.push('/apps/account/register');
          }
        } else {
          throw new Error(data.message || 'Failed to check user status');
        }
      } catch (error) {
        console.error('Error checking user status:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Couldn't verify your account status. Please try again.",
        });
      } finally {
        setIsCheckingUser(false);
      }
    }

    checkUserExists();
  }, [address, isConnected, router]);

  return (
    <UserContext.Provider
      value={{
        isCheckingUser,
        userExists,
        setUserExists, // Exposing the setter function for use in other components
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

/**
 * Custom hook for using user state
 * @returns {object} User state
 */
export function useUser() {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}