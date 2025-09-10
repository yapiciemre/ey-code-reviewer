import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { ReviewOutput } from './components/ReviewOutput';
import { reviewCode } from './services/geminiService';
import { LANGUAGES } from './constants';
import type { SuperStructuredReview } from './types';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [language, setLanguage] = useState<string>(LANGUAGES[0].value);
  const [review, setReview] = useState<SuperStructuredReview | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setReview(null);

    try {
      const result = await reviewCode(code, language);
      setReview(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [code, language]);

  const handleLoadExample = useCallback((exampleCode: string, exampleLang: string) => {
    setCode(exampleCode);
    setLanguage(exampleLang);
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2 flex flex-col">
            <CodeInput
              code={code}
              setCode={setCode}
              language={language}
              setLanguage={setLanguage}
              onReview={handleReview}
              isLoading={isLoading}
              onLoadExample={handleLoadExample}
            />
          </div>
          <div className="lg:w-1/2 flex flex-col">
            <ReviewOutput review={review} isLoading={isLoading} error={error} />
          </div>
        </div>
        <footer className="text-center py-8 mt-8 text-brand-text-light text-sm">
            <p>© 2025 Emre YAPICI — AI-assisted portfolio project.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;