import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import { fix_latex } from "@/lib/utils";

interface ProductionsProps {
  productions: { header: string; body: string }[];
  latex: boolean;
}

export default function Productions({ productions, latex }: ProductionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 p-4 rounded-md">
          {latex ? (
            <>
              {productions.map((production, index) => (
                <p key={index}>
                  <TeX
                    math={fix_latex(
                      `${production.header} \\rightarrow ${production.body}`
                    )}
                  />
                </p>
              ))}
            </>
          ) : (
            <>
              {productions.map((production, index) => (
                <pre key={index}>
                  {production.header}
                  {"->"}
                  {production.body}
                </pre>
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
