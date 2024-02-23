import { FC, useMemo } from "react";
import { Table, Flex } from "antd";
import type { TableProps } from "antd";
import PokemonItem from "../interfaces/PokemonItem.interface";

interface DataType {
  letter: string;
  quantity: number;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Letra",
    dataIndex: "letter",
    key: "letter",
  },
  {
    title: "Cantidad",
    dataIndex: "quantity",
    key: "quantity",
  },
];

const SummaryTable: FC<{ data: PokemonItem[] }> = ({ data }) => {
  const dataSource = useMemo(() => {
    const counter: Record<string, number> = {};

    data.forEach((item) => {
      const letter = item.name[0].toUpperCase();
      counter[letter] = (counter[letter] || 0) + 1;
    });

    return Object.keys(counter).map((letra) => ({
      letter: letra,
      quantity: counter[letra],
    }));
  }, [data]);

  return (
    <Flex vertical>
      <p style={{ fontWeight: "bold", fontSize: 26 }}>
        Resumen{" "}
        <span style={{ fontSize: 14, fontWeight: "normal" }}>
          (Pagina Actual)
        </span>
      </p>
      <Table pagination={false} columns={columns} dataSource={dataSource} />
    </Flex>
  );
};

export default SummaryTable;
