export interface Language {
  value: string;
  label: string;
}

export type IssueSeverity = 'Critical' | 'Medium' | 'Low' | 'Info';

export interface Issue {
  severity: IssueSeverity;
  category: string;
  description: string; // Markdown
}

export interface Complexity {
  operation: string;
  complexity: string; // e.g., "O(n)"
}

export interface TodoItem {
    task: string;
    priority: 'High' | 'Medium' | 'Low';
}

export interface SuperStructuredReview {
  summary: string; // Markdown
  issues: Issue[];
  minimalDiff: string; // Git diff format
  refactoredCode: string; // Full code block
  "suggested-tests": string; // Full code block
  complexityAnalysis: Complexity[];
  todoList: TodoItem[];
}
