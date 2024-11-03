import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TeX from "@matejmazur/react-katex";
import { fix_latex } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface TDPProps {
  data: {
    stack: string;
    in: string;
    out: string | null;
  }[];
  recognizes: boolean;
  latex: boolean;
}

export default function TDP({ data, recognizes, latex }: TDPProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Result: {recognizes ? <Check className="inline-block" /> : <X className="inline-block"  />}</CardTitle>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <pre>Stack</pre>
              </TableHead>
              <TableHead>
                <pre>In</pre>
              </TableHead>
              <TableHead>
                <pre>Out</pre>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latex
              ? data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TeX math={fix_latex(row.stack)} />
                    </TableCell>
                    <TableCell>
                    <TeX math={fix_latex(row.in)} />
                    </TableCell>
                    <TableCell>
                    <TeX math={row.out ? fix_latex(row.out.replace(/->/g, " \\rightarrow ")) : ""} />
                    </TableCell>
                  </TableRow>
                ))
              : data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <pre>{row.stack}</pre>
                    </TableCell>
                    <TableCell>
                      <pre>{row.in}</pre>
                    </TableCell>
                    <TableCell>
                      <pre>{row.out}</pre>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
