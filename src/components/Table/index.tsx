import type { IColumn, IGeneInfo } from '../../types';
import "./styles.scss";

type TProps = {
  data: Array<IGeneInfo>,
  columns: Array<IColumn> 
  noDataFallback?: string,
  error: string;
}

const TableComponent = ({ data , columns,noDataFallback="Neboli nájdené žiadne záznami",error}:TProps) => {
  return (
    <table className='table'>
      <thead>
        <tr className='table-head'>
          {columns?.map((column: IColumn) => (
            <th className='table-head-col' key={column.key}>
           {column?.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
  {data && data.length > 0 ? (
    data?.map((item: IGeneInfo, index: number) => (
      <tr className='table-row' key={index}>
        {columns?.map((column: IColumn) => (
          <td className='table-col' key={column?.key}>
            {item[column?.key]}
          </td>
        ))}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={columns?.length} >
        <h5 className="table-text-fallback">{!error ? noDataFallback:JSON.stringify(error)}</h5> 
      </td>
    </tr>
  )}
</tbody>
    </table>
  );
};

export default TableComponent;
