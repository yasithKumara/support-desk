import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { reset, createTicket } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);

  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.ticket);

    const dispatch = useDispatch()
    const navigate = useNavigate()

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            dispatch(reset())
            navigate('/tickets')
        }

        dispatch(reset())

    }, [isError, dispatch, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({product, description }))
  };

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <section>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" value={name} className="form-control" disabled />
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <input type="email" value={email} className="form-control" disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            >
            </textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
