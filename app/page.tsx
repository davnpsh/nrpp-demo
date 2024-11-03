"use client";

import { useState, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";

export default function Page() {
  const [fileContent, setFileContent] = useState<string | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileContent(content);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a .txt file");
      setFileContent(null);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4 select-none">nrpp</h1>

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>
            Upload a file where each line is a production/rule{" "}
            <TeX math="A \rightarrow \alpha" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              className="flex-grow"
              accept=".txt"
              onChange={handleFileUpload}
            />
            <Button>Analize</Button>
          </div>

          {fileContent && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">File contents:</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-40">
                {fileContent}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
