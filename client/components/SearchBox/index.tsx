import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.length > 0) {
      router.push(`/search/${keyword.trim()}/#productos`);
    }
  };

  return (
    <Form onSubmit={submitHandler} style={{width: '80%'}} className="d-flex">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div className="div-block-9">

          <Form.Control
            type="text"
            name="q"
            onChange={e => setKeyword(e.target.value)}
            placeholder="Buscar productos..."
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>

          <Button type="submit" variant="light" style={{ marginLeft: '4px' }} >
            <img
              src="/images/searchIcon.png"
              loading="lazy"
              alt=""
              className="image"
            />
          </Button>
        </div>
      </div>
    </Form>
    
  )  
};

export default SearchBox;

/*<Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={e => setKeyword(e.target.value)}
        placeholder="Buscar productos..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  ); */

  /*<div className="div-block-9">
      <Form.Control
        type="text"
        name="q"
        onChange={e => setKeyword(e.target.value)}
        placeholder="Buscar productos..."
        //className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      
      <Button type="submit" variant="light" style={{marginLeft: '4px'}} >
        <img
          src="images/searchIcon.png"
          loading="lazy"
          alt=""
          className="image"
        />
      </Button>

    </div> */
