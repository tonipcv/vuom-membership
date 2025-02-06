import React from 'react';
import { Table } from 'antd';
import { TargetData } from '../lib/targetAnalysisData';

interface TargetAnalysisTableProps {
  data: TargetData[];
  capital: number;
  selectedTargets: string[];
}

const TargetAnalysisTable: React.FC<TargetAnalysisTableProps> = ({ data, capital, selectedTargets }) => {
  const columns = [
    {
      title: 'Alvo',
      dataIndex: 'alvo',
      key: 'alvo',
    },
    {
      title: 'Operações',
      dataIndex: 'operacoes',
      key: 'operacoes',
    },
    {
      title: '% Vitória',
      dataIndex: 'vitoria',
      key: 'vitoria',
      render: (vitoria: number) => `${vitoria}%`,
    },
    {
      title: 'Lucro',
      dataIndex: 'lucro',
      key: 'lucro',
      render: (lucro: number) => {
        const value = (lucro / 100) * capital;
        return `R$ ${value.toFixed(2)}`;
      },
    },
  ];

  const filteredData = data.filter(item => selectedTargets.includes(item.alvo));

  return (
    <Table
      dataSource={filteredData}
      columns={columns}
      rowKey="alvo"
      pagination={false}
      summary={(pageData) => {
        const totalOperacoes = pageData.reduce((sum, row) => sum + row.operacoes, 0);
        const weightedVitoria = pageData.reduce((sum, row) => sum + (row.vitoria * row.operacoes), 0) / totalOperacoes;
        const totalLucro = pageData.reduce((sum, row) => sum + ((row.lucro / 100) * capital), 0);

        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>{totalOperacoes}</Table.Summary.Cell>
              <Table.Summary.Cell index={2}>{weightedVitoria.toFixed(2)}%</Table.Summary.Cell>
              <Table.Summary.Cell index={3}>R$ {totalLucro.toFixed(2)}</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};

export default TargetAnalysisTable; 