import { GoogleGenAI, Type } from "@google/genai";
import type { SuperStructuredReview } from '../types';

// In a Vite project, environment variables must be accessed via `import.meta.env`
// and prefixed with VITE_ to be exposed to the client-side code.
const apiKey = import.meta.env.VITE_API_KEY;


// Provide a clear error message if the API key is not set.
// This prevents the API call from being made with an undefined key.
if (!apiKey) {
  throw new Error("VITE_API_KEY is not set. Please add it to your .env file and restart the development server.");
}

const ai = new GoogleGenAI({ apiKey });

const superReviewSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "A brief, one-paragraph summary of the code's overall quality and the most critical areas for improvement. This should be in Markdown format."
    },
    issues: {
      type: Type.ARRAY,
      description: "An array of specific issues found in the code.",
      items: {
        type: Type.OBJECT,
        properties: {
          severity: {
            type: Type.STRING,
            enum: ['Critical', 'Medium', 'Low', 'Info'],
            description: "The severity level of the issue."
          },
          category: {
              type: Type.STRING,
              description: "A brief category title for the issue (e.g., 'Hardcoded Value', 'Inefficient Loop', 'Missing Error Handling')."
          },
          description: {
            type: Type.STRING,
            description: "A detailed explanation of the issue in Markdown format, including code snippets where relevant."
          }
        },
        required: ['severity', 'category', 'description']
      }
    },
    minimalDiff: {
        type: Type.STRING,
        description: "A minimal, git-style diff of the changes required to fix the issues. Use markdown with the 'diff' language tag. Example: ```diff\\n- old code\\n+ new code\\n```. If no changes are needed, return an empty string."
    },
    refactoredCode: {
        type: Type.STRING,
        description: "The complete, refactored code snippet incorporating all suggested improvements. Use markdown with the appropriate language tag. If no refactoring is needed, return the original code."
    },
    "suggested-tests": {
        type: Type.STRING,
        description: "Suggested unit tests for the refactored code to ensure correctness. Use markdown with the appropriate language tag. Provide at least one or two key tests. If not applicable, provide 'N/A'."
    },
    complexityAnalysis: {
        type: Type.ARRAY,
        description: "An analysis of the computational complexity (Big O notation) for the main operations in the code.",
        items: {
            type: Type.OBJECT,
            properties: {
                operation: { type: Type.STRING, description: "The name of the function or operation."},
                complexity: { type: Type.STRING, description: "The Big O notation (e.g., 'O(n)', 'O(1)')." }
            },
            required: ['operation', 'complexity']
        }
    },
    todoList: {
        type: Type.ARRAY,
        description: "A list of actionable TODO items for the developer to address.",
        items: {
            type: Type.OBJECT,
            properties: {
                task: { type: Type.STRING, description: "The specific task to be done."},
                priority: { type: Type.STRING, enum: ['High', 'Medium', 'Low'], description: "The priority of the task." }
            },
            required: ['task', 'priority']
        }
    }
  },
  required: ['summary', 'issues', 'minimalDiff', 'refactoredCode', 'suggested-tests', 'complexityAnalysis', 'todoList']
};


export async function reviewCode(code: string, language: string): Promise<SuperStructuredReview> {
  // FIX: Updated model from deprecated 'gemini-1.5-flash' to 'gemini-2.5-flash' as per guidelines.
  const model = 'gemini-2.5-flash';

  const systemInstruction = `You are an expert senior software engineer acting as an automated code review service named "EY Code Reviewer".
Your task is to provide a comprehensive, structured, and actionable review of the code provided by the user.
Analyze the code across multiple dimensions:
- Edge Cases: Consider potential issues with empty inputs, nulls, or unexpected values.
- Complexity (Big-O): Analyze the time and space complexity of the algorithms.
- Performance Optimization: Suggest more efficient algorithms or language-specific optimizations.
- Modularity: Evaluate how well the code is structured and if it could be more modular.
- Documentation & Style: Check for docstrings, type hints, and adherence to common style guides for the language.
- Testability: Assess how easy the code is to test and suggest potential unit tests.
- Security Risks: Identify potential security vulnerabilities, even if minor.

Your response MUST be a single, valid JSON object that strictly adheres to the provided schema. Do not include any text, comments, markdown formatting, or code fences outside of the main JSON object.`;

  const userPrompt = `Here is the ${language} code to review:
\`\`\`${language}
${code}
\`\`\``;

  try {
    const response = await ai.models.generateContent({
        model,
        contents: userPrompt,
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: superReviewSchema
        }
    });

    const jsonText = response.text.trim();
    // A simple validation to ensure we have the core properties
    const parsed = JSON.parse(jsonText);
    if (!parsed.summary || !parsed.issues) {
        throw new Error("AI response is missing required fields.");
    }
    return parsed as SuperStructuredReview;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes("API key")) {
        throw new Error("An error occurred with the API Key. Please check if it's valid and has the correct permissions.");
    }
    throw new Error("Failed to get a valid review from the AI. The model may have returned an unexpected format. Please try again.");
  }
}