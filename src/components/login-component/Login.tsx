import React from "react";
import { Col, Row, Form, Container } from "react-bootstrap";

const Login = () => {
  return (
    <div>
      <h3 className="text-blue-900">Login to Book Tickets</h3>
      <div className="container bg-sky-500">
        <div className="flex">
          <input type="email" className="mx-2"/>
          <input type="password" className="mx-2"/>
        </div>
      </div>
    </div>
  );
};

export default Login;
