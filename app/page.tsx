"use client";

import { useState, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import { NRPP } from "@davnpsh/nrpp";
import Productions from "@/components/ownui/Productions";
import First from "@/components/ownui/First";
import Follow from "@/components/ownui/Follow";
import M from "@/components/ownui/M";
import TDP from "@/components/ownui/TDP";

export default function Page() {
  const [latexEnabled, setLatexEnabled] = useState(true);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [parser, setParser] = useState<NRPP | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [tdp, setTdp] = useState<any | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Set file content
        const content = e.target?.result as string;
        setFileContent(content);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a .txt file");
      setFileContent(null);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAnalyze = () => {
    if (fileContent) {
      // Declare new parser
      try {
        setParser(new NRPP(fileContent));
      } catch {}
    }
  };

  const handleTest = () => {
    // Declare new tdp
    try {
      setTdp(parser?.TDP_table(inputValue));
    } catch {}
  };

  return (
    <div className="container mx-auto p-4 space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4 select-none">nrpp</h1>

      {/* LaTeX Rendering Toggle */}
      <div className="flex items-center space-x-2">
        <Switch
          id="latex-toggle"
          checked={latexEnabled}
          onCheckedChange={setLatexEnabled}
        />
        <Label htmlFor="latex-toggle">
          <TeX math="\LaTeX" /> rendering (experimental)
        </Label>
      </div>

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
            <Button onClick={handleAnalyze}>Analyze</Button>
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

      {/* Parser area */}
      {parser && (
        <>
          <Productions
            productions={parser.grammar.export()}
            latex={latexEnabled}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <First data={parser.first.export()} latex={latexEnabled} />
            <Follow data={parser.follow.export()} latex={latexEnabled} />
          </div>
          <M data={parser.M_table.export()} latex={latexEnabled} />

          {/* Input with Button */}
          <Card>
            <CardHeader>
              <CardTitle>Top-Down parsing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter string"
                  className="flex-grow"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <Button onClick={handleTest}>Test</Button>
              </div>
            </CardContent>
          </Card>

          {tdp && <TDP data={tdp.export()} recognizes={tdp.recognize} latex={latexEnabled} />}
        </>
      )}
    </div>
  );
}
