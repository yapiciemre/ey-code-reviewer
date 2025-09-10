import React from 'react';
import type { Language } from './types';

export const LANGUAGES: Language[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'diff', label: 'Diff' }, // For syntax highlighting
];

export const JS_EXAMPLE = `function factorial(n) {
  if (n < 0) {
    return "Number must be non-negative";
  }
  if (n == 0 || n == 1) {
    return 1;
  } else {
    let result = 1;
    for (var i = 2; i <= n; i++) {
      result = result * i;
    }
    return result;
  }
}

const res = factorial(5);
console.log('The result is: ' + res);`;

export const PYTHON_EXAMPLE = `def is_prime(num):
    if num < 2:
        return False
    for i in range(2, num):
        if num % i == 0:
            return False
    return True

def print_primes(limit):
    primes = []
    for i in range(2, limit + 1):
        if is_prime(i):
            primes.append(i)
    print(f"Prime numbers up to {limit}: {primes}")

print_primes(20)`;

export const TS_EXAMPLE = `interface User {
  id: number;
  name: string;
  email?: string;
}

function getUserInfo(user: User): string {
  let info = \`\${user.name} (ID: \${user.id})\`;
  if (user.email) {
    info += \`, Email: \${user.email}\`;
  }
  return info;
}

const user: any = { id: 1, name: 'Alice' };
console.log(getUserInfo(user));`;

export const JAVA_EXAMPLE = `import java.util.ArrayList;
import java.util.List;

public class DataProcessor {
    public static void main(String[] args) {
        List<String> data = new ArrayList();
        data.add("item1");
        data.add("item2");

        for (int i = 0; i < data.size(); i++) {
            System.out.println("Processing: " + data.get(i));
        }
    }

    // A method with potential for improvement
    public String checkValue(int value) {
        if (value > 10) {
            return "High";
        } else {
            return "Low";
        }
    }
}`;

export const GO_EXAMPLE = `package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

// FetchURL fetches the content of a single URL.
func FetchURL(url string) {
	resp, err := http.Get(url)
	if err != nil {
		fmt.Printf("Error fetching %s: %s\\n", url, err)
		return
	}
	defer resp.Body.Close()

	// This method is deprecated
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Printf("Fetched %s, size: %d bytes\\n", url, len(body))
}

func main() {
	urls := []string{
		"https://www.google.com",
		"https://www.github.com",
	}

	for _, url := range urls {
		FetchURL(url)
	}
}`;

export const CSHARP_EXAMPLE = `using System;
using System.Collections.Generic;

public class NumberProcessor
{
    // This method can be simplified using LINQ
    public List<int> GetEvenNumbers(List<int> numbers)
    {
        var evenNumbers = new List<int>();
        foreach (var number in numbers)
        {
            if (number % 2 == 0)
            {
                evenNumbers.Add(number);
            }
        }
        return evenNumbers;
    }
}`;
