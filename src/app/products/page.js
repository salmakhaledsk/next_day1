"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/users");
        const userData = await res.json();
        setData(userData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h2 className="my-4">Users</h2>
      <Container>
        <Row>
          {data.map((user) => (
            <Col key={user.id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> {user.name.firstname} {user.name.lastname}
                    <br />
                    <strong>Email:</strong> {user.email}
                  </Card.Text>
                  <Link href={`/products/${user.id}`}>
                    <Button variant="success">Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Products;