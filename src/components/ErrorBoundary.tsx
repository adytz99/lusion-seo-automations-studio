
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logSecurityEvent } from '@/utils/security';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error securely without exposing sensitive information
    logSecurityEvent('Application error caught', {
      errorMessage: error.message,
      errorStack: error.stack?.substring(0, 500), // Limit stack trace length
      componentStack: errorInfo.componentStack?.substring(0, 500)
    });
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              Oops! Ceva nu a mers bine
            </h1>
            <p className="text-white/70 mb-6">
              A apărut o eroare neașteptată. Vă rugăm să reîmprospătați pagina.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Reîmprospătează pagina
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
