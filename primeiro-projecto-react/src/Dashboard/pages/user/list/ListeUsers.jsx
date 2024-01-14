import React, { useState } from "react";
import { Card, CardGroup, CardHeader, CardBody, CardTitle, CardText, CardLink } from "react-bootstrap";

export default function ListeUsers()  {
  const [users, setUsers] = useState([
    {
      name: "John Doe",
      email: "johndoe@example.com",
     
    },
    {
      name: "Jane Doe",
      email: "janedoe@example.com",
    },
    {
      name: "John Smith",
      email: "johnsmith@example.com",
      
    },
    {
      name: "Jane Smith",
      email: "janesmith@example.com",
      
    },
    {
      name: "John Johnson",
      email: "johnjohnson@example.com",
      
    },
  ]);

  return (
    <CardGroup>
      <Card>
        <CardBody>
          <div style={{ height: 200, overflow: "auto" }}>
            {users.slice(0, 5).map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <CardTitle>{user.name}</CardTitle>
                </CardHeader>
                <CardBody>
                  <CardText>
                    <p>E-mail: {user.email}</p>
                  </CardText>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </CardGroup>
  );
};

