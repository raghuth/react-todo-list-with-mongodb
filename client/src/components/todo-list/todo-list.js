import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  TextField,
  Button,
} from "@material-ui/core";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./todo-list.css";

function TodoList(props) {
  //const { _id } = props.match.params;
  let { _id } = useParams();
  //console.log("_id ::::", _id);
  const [customers, setCustomers] = useState([]);
  const [input, setInput] = useState({
    customerName: "",
  });
  const [FirstNameError, setFirstNameError] = useState(false);

  useEffect(() => {
    // axios
    //   .get("http://localhost:8000/api/update-todo/" + props.match.params.id)
    //   .then((res) => {
    //     const { name} = res.data;
    //     setFormValues({ name});
    //   })
    //   .catch((err) => console.log(err));
    getCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCustomer = () => {
    fetch("http://localhost:8000/api/todo")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setCustomers(jsonRes));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const deleteTodo = (event) => {
    console.log(event);
    axios
      .delete("http://localhost:8000/delete/" + _id)
      .then((res) => {
        if (res.status === 200) {
          alert("Todo successfully deleted");
          event.preventDefault();
        } else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  const handleSubmit = (event) => {   
    event.preventDefault();
    // setFirstNameError(false);  
    if(input.customerName.trim().length == 0) return;
    const newCustomerList = {
      name: input.customerName,
    };
    axios.post("http://localhost:8000/api/create", newCustomerList, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("new customer created ")
    getCustomer();
    input.customerName = ""; 
    // if (input.customerName === "") {
    //   console.log("value is o")
    //   setFirstNameError(true);   
    // }
    //  if(input.customerName.trim().length == 0) return;
    //  if (input.customerName) {
    //    const newCustomerList = {
    //     name: input.customerName,
    //   };
    //   axios.post("http://localhost:8000/api/create", newCustomerList, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   console.log("new customer created ")
    //   getCustomer();
    //   input.customerName = "";
    // }
   
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={<AccountBalanceIcon className="card-header-icon" />}
              title="Endpoints"
              subheader="Create and manage platform endpoints."
              className="card-grid"
            />
            <CardContent></CardContent>
            <CardActions disableSpacing></CardActions>
            <CardContent>
              <div style={{ paddingTop: 24 }}>
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <TextField
                    label="CustomerName"
                    variant="outlined"
                    fullWidth
                    style={{ marginBottom: 40 }}
                    name="customerName"
                    value={input.customerName || ""}
                    onChange={handleChange}
                    required
                    error={FirstNameError}
                  />              
                   <Button
                    onClick={(e) => handleSubmit(e)}
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    SUBMIT
                  </Button>
                </form>
              </div>
              {customers?.map((data, i) => (
                <div key={i} className="right-side-icons">
                  {data.name}
                  <Link className="edit-link" to={"/update-todo/" + _id}>
                    <EditIcon className="point" />
                  </Link>
                  <DeleteIcon
                    className="delete-icon point"
                    onClick={(event) => deleteTodo()}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default TodoList;
