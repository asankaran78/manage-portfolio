import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100, },
  {
    field: 'userId',
    headerName: 'User ID',
    width: 100,
    align: 'center',

  },
  {
    field: 'title',
    headerName: 'Title',
    width: 400,
    align: 'center',

  },
  {
    field: 'completed',
    headerName: 'Completed',
    width: 80,
    align: 'center'
  },

];

export default function DataGridDemo({ rows }) {

  return (
    <div style={{ width: '60%', margin: 'auto', marginTop: '2rem' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        autoHeight
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

export const getStaticProps = async () => {

  const rows = await fetch(
    "https://jsonplaceholder.typicode.com/todos/").then(res => res.json())
  return {
    props: { rows },
  }
}