import { Admin, Resource, EditGuesser, ShowGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { EmployeeList } from "./employees/EmployeeList";
import { EmployeeCreate } from "./employees/EmployeeCreate";
import { EmployeeEdit } from "./employees/EmployeeEdit";
import { EmployeeShow } from "./employees/EmployeeShow";
import { InternCreate } from "./interns/InternCreate";
import { InternList } from "./interns/InternList";

const dataProvider = jsonServerProvider("http://localhost:3002");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="employees"
      list={EmployeeList}
      create={EmployeeCreate}
      edit={EmployeeEdit}
      show={EmployeeShow}
    />
    <Resource
      name="interns"
      list={InternList}
      create={InternCreate}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);

export default App;
