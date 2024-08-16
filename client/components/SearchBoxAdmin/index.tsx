//import { useRouter } from 'next/router';
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBoxAdmin = (props: any) => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.search(keyword);
  };

  const handleRefresh = () => {
    props.search();
  };

  return (
    <Form onSubmit={submitHandler} style={{ width: "100%" }} className="d-flex">
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <div className="div-block-9">
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Buscar productos..."
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>

          <Button type="submit" variant="light" style={{ marginLeft: "4px" }}>
            <img
              src="/images/searchIcon.png"
              loading="lazy"
              alt=""
              className="image"
            />
          </Button>
          <Button
            onClick={handleRefresh}
            variant="light"
            style={{ marginLeft: "4px" }}
          >
            <img
              src="/images/refresh.png"
              loading="lazy"
              alt=""
              className="image"
              style={{ color: "#f3a" }}
            />
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default SearchBoxAdmin;
