import React, { useRef, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
// Import languages for syntax highlighting
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-markup'; // For HTML
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-diff';


import { LANGUAGES, JS_EXAMPLE, PYTHON_EXAMPLE, TS_EXAMPLE, JAVA_EXAMPLE, GO_EXAMPLE, CSHARP_EXAMPLE } from '../constants';
import type { Language } from '../types';
import { Spinner } from './Spinner';
import { SparklesIcon } from './icons/SparklesIcon';
import { ClearIcon } from './icons/ClearIcon';
import { JavaScriptIcon } from './icons/JavaScriptIcon';
import { PythonIcon } from './icons/PythonIcon';
import { TypeScriptIcon } from './icons/TypeScriptIcon';
import { JavaIcon } from './icons/JavaIcon';
import { GoIcon } from './icons/GoIcon';
import { CSharpIcon } from './icons/CSharpIcon';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  onReview: () => void;
  isLoading: boolean;
  onLoadExample: (code: string, language: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, language, setLanguage, onReview, isLoading, onLoadExample }) => {
  const editorRef = useRef<React.ElementRef<typeof Editor> & { _input: HTMLTextAreaElement }>(null);

  useEffect(() => {
    // Automatically focus the editor on initial load
    if (editorRef.current?._input) {
      editorRef.current._input.focus();
    }
  }, []);
  
  const handleClear = () => {
    setCode('');
    if (editorRef.current?._input) {
      editorRef.current._input.focus();
    }
  };

  const ExampleButton: React.FC<{
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
  }> = ({ onClick, icon, label }) => (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-brand-border text-brand-text-light rounded-md hover:bg-gray-700 transition-colors"
    >
      {icon}
      {label}
    </button>
  );
  
  const selectableLanguages = LANGUAGES.filter(l => l.value !== 'diff');

  return (
    <div className="bg-brand-surface rounded-lg border border-brand-border flex flex-col h-full">
      <div className="p-3 border-b border-brand-border flex items-center justify-between bg-gray-900/50 rounded-t-lg">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-brand-text">Your Code</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-brand-bg border border-brand-border rounded-md px-3 py-1.5 text-sm text-brand-text focus:ring-2 focus:ring-brand-primary focus:outline-none"
            aria-label="Select code language"
          >
            {selectableLanguages.map((lang: Language) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleClear}
          disabled={!code}
          className="p-2 text-brand-secondary hover:text-brand-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Clear code input"
        >
          <ClearIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="code-editor-wrapper font-mono text-sm">
        <Editor
          ref={editorRef}
          value={code}
          onValueChange={setCode}
          highlight={(code) => Prism.highlight(code, Prism.languages[language] || Prism.languages.clike, language)}
          padding={16}
          textareaId="code-input"
          className="bg-brand-bg"
          style={{
            fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
            fontSize: 14,
          }}
        />
      </div>
       <div className="p-3 border-t border-brand-border flex flex-wrap items-center justify-center sm:justify-between gap-2">
        <div className="text-sm text-brand-text-light flex-shrink-0">
          Try an example:
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          <ExampleButton 
            onClick={() => onLoadExample(JS_EXAMPLE, 'javascript')}
            icon={<JavaScriptIcon className="w-4 h-4" />}
            label="JavaScript"
          />
          <ExampleButton 
            onClick={() => onLoadExample(PYTHON_EXAMPLE, 'python')}
            icon={<PythonIcon className="w-4 h-4" />}
            label="Python"
          />
          <ExampleButton 
            onClick={() => onLoadExample(TS_EXAMPLE, 'typescript')}
            icon={<TypeScriptIcon className="w-4 h-4" />}
            label="TypeScript"
          />
           <ExampleButton 
            onClick={() => onLoadExample(JAVA_EXAMPLE, 'java')}
            icon={<JavaIcon className="w-4 h-4" />}
            label="Java"
          />
           <ExampleButton 
            onClick={() => onLoadExample(GO_EXAMPLE, 'go')}
            icon={<GoIcon className="w-4 h-4" />}
            label="Go"
          />
          <ExampleButton 
            onClick={() => onLoadExample(CSHARP_EXAMPLE, 'csharp')}
            icon={<CSharpIcon className="w-4 h-4" />}
            label="C#"
          />
        </div>
      </div>
      <div className="p-3 border-t border-brand-border">
        <button
          onClick={onReview}
          disabled={isLoading || !code.trim()}
          className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-hover disabled:bg-brand-border disabled:text-brand-text-light disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface focus:ring-brand-primary"
        >
          {isLoading ? (
            <>
              <Spinner />
              Analyzing...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5" />
              Review Code
            </>
          )}
        </button>
      </div>
    </div>
  );
};