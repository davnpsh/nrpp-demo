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

interface FirstProps {
  data: { non_terminal: string; first: string[] }[];
  latex: boolean;
}

export default function First({ data, latex }: FirstProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>First</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <pre>Non-terminal</pre>
              </TableHead>
              <TableHead>
                <pre>First</pre>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) =>
              latex ? (
                <TableRow key={index}>
                  <TableCell>
                    <TeX math={row.non_terminal} />
                  </TableCell>
                  <TableCell>
                    <TeX math={fix_latex(`\\{ ${row.first.join(", ")} \\}`)} />
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={index}>
                  <TableCell>
                    <pre>{row.non_terminal}</pre>
                  </TableCell>
                  <TableCell>
                    <pre>
                      {"{ "}
                      {row.first.join(", ")}
                      {" }"}
                    </pre>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
