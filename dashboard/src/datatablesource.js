export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },

  {
    field: "username",
    headerName: "Username",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

//temporary data
export const userRows = [
  {
    id: 1,
    username: "alexmartin",
    email: "alexmartin99@gmail.com",
    password: "ssskj",
    status: "active",
  },
  {
    id: 2,
    username: "saudshaikh",
    email: "saudshaikhsss02@gmail.com",
    password: "ssskj",
    status: "passive",
  },
  {
    id: 3,
    username: "romeoaffan",
    email: "romeoaffan201934@gmail.com",
    password: "sssj",
    status: "pending",
  },
];