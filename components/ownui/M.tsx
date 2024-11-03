import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import "katex/dist/katex.min.css";
import TeX from "@matejmazur/react-katex";
import { fix_latex } from "@/lib/utils";

interface MProps {
  data: Array<{ [key: string]: string }>;
  latex: boolean;
}

export default function M({ data, latex }: MProps) {
  const keys = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <Card className="overflow-x-auto">
      <CardHeader>
        <CardTitle>M table</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-center">
              <TableHead className="text-center">
                <pre>Non-terminal</pre>
              </TableHead>
              {keys.slice(1).map((key) => (
                <TableHead key={key} className="text-center">
                  {latex ? <TeX math={fix_latex(key)} /> : <pre>{key}</pre>}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-center">
            {data.map((row, index) => (
              <TableRow key={index}>
                {keys.map((key) => (
                  <TableCell key={key}>
                    {latex ? (
                      <TeX math={fix_latex(row[key].replace(/->/g, " \\rightarrow "))} />
                    ) : (
                      <pre>{row[key]}</pre>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
