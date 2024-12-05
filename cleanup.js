const fs = require("fs");
const path = require("path");

// Funkcja do usuwania komentarzy, nieużywanych zmiennych i funkcji
function cleanCode(content) {
  // Usuń komentarze jednolinijkowe i wielolinijkowe
  content = content.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");

  // Znajdź wszystkie zadeklarowane zmienne i funkcje
  const declaredVariables = Array.from(
    content.matchAll(/\b(let|const|var|function)\s+([a-zA-Z_$][\w$]*)/g)
  ).map((match) => match[2]);

  // Usuń nieużywane zmienne i funkcje
  declaredVariables.forEach((variable) => {
    const regex = new RegExp(`\\b${variable}\\b`, "g");
    const matches = content.match(regex);
    // Jeśli zmienna/funkcja występuje tylko w deklaracji, usuń ją
    if (matches && matches.length === 1) {
      const declarationRegex = new RegExp(
        `\\b(let|const|var|function)\\s+${variable}.*?;?`,
        "g"
      );
      content = content.replace(declarationRegex, "");
    }
  });

  // Obsługa specyficznych struktur React (np. importy, useEffect, etc.)
  content = cleanReactSpecific(content);

  return content.trim(); // Usuń nadmiarowe spacje
}

// Funkcja do obsługi specyficznych elementów React i React Native
function cleanReactSpecific(content) {
  // Usuń nieużywane importy (np. React, useState)
  const imports = Array.from(
    content.matchAll(/import\s+\{?([^}]+)\}?\s+from\s+['"][^'"]+['"]/g)
  )
    .map((match) => match[1].split(",").map((item) => item.trim()))
    .flat();

  imports.forEach((imported) => {
    const regex = new RegExp(`\\b${imported}\\b`, "g");
    const matches = content.match(regex);
    if (matches && matches.length === 1) {
      const importRegex = new RegExp(
        `import\\s+\\{?\\s*${imported}\\s*}?\\s+from\\s+['"][^'"]+['"];?`,
        "g"
      );
      content = content.replace(importRegex, "");
    }
  });

  // Usuń nieużywane komponenty
  const componentRegex =
    /function\s+([A-Z][a-zA-Z]*)\s*\([\s\S]*?\)\s*\{[\s\S]*?\}/g;
  const components = Array.from(content.matchAll(componentRegex)).map(
    (match) => match[1]
  );

  components.forEach((component) => {
    const regex = new RegExp(`\\b${component}\\b`, "g");
    const matches = content.match(regex);
    if (matches && matches.length === 1) {
      const functionRegex = new RegExp(
        `function\\s+${component}\\s*\\(.*?\\)\\s*\\{[\\s\\S]*?\\}`,
        "g"
      );
      content = content.replace(functionRegex, "");
    }
  });

  return content;
}

// Funkcja do przetwarzania plików w folderze
function processFiles(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Rekurencyjnie przetwarzaj podfoldery
      processFiles(filePath);
    } else if (
      [".js", ".ts", ".jsx", ".tsx"].some((ext) => file.endsWith(ext))
    ) {
      // Przetwarzaj tylko pliki JavaScript, TypeScript, JSX, TSX
      const content = fs.readFileSync(filePath, "utf-8");
      const cleanedContent = cleanCode(content);
      fs.writeFileSync(filePath, cleanedContent, "utf-8");
      console.log(`Oczyszczono: ${filePath}`);
    }
  });
}

// Ścieżka do folderu z plikami
const folderPath = "./folder_z_plikami"; // Zmień na swoją ścieżkę

// Uruchom proces
processFiles(folderPath);
