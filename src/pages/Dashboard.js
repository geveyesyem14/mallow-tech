import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Modal, Form, Row, Col, Card } from "react-bootstrap";
import { FaTable } from "react-icons/fa";
import { FaTableColumns } from "react-icons/fa6";

const Dashboard = () => {
  const [viewType, setViewType] = useState("list");
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    {
      id: 1,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
    },
    {
      id: 2,
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
    },
    {
      id: 3,
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      email: "alex.johnson@example.com",
      firstName: "Alex",
      lastName: "Johnson",
    },
    {
      id: 4,
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      email: "lisa.white@example.com",
      firstName: "Lisa",
      lastName: "White",
    },
    {
      id: 5,
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      email: "michael.brown@example.com",
      firstName: "Michael",
      lastName: "Brown",
    },
    {
      id: 6,
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      email: "susan.miller@example.com",
      firstName: "Susan",
      lastName: "Miller",
    },
    {
      id: 7,
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      email: "david.wilson@example.com",
      firstName: "David",
      lastName: "Wilson",
    },
    {
      id: 8,
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      email: "emily.moore@example.com",
      firstName: "Emily",
      lastName: "Moore",
    },
    {
      id: 9,
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      email: "daniel.taylor@example.com",
      firstName: "Daniel",
      lastName: "Taylor",
    },
    {
      id: 10,
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      email: "olivia.jones@example.com",
      firstName: "Olivia",
      lastName: "Jones",
    },
    {
      id: 11,
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      email: "james.davis@example.com",
      firstName: "James",
      lastName: "Davis",
    },
    {
      id: 12,
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      email: "charlotte.garcia@example.com",
      firstName: "Charlotte",
      lastName: "Garcia",
    },
    {
      id: 13,
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      email: "william.martinez@example.com",
      firstName: "William",
      lastName: "Martinez",
    },
    {
      id: 14,
      image: "https://randomuser.me/api/portraits/women/7.jpg",
      email: "sarah.rodriguez@example.com",
      firstName: "Sarah",
      lastName: "Rodriguez",
    },
    {
      id: 15,
      image: "https://randomuser.me/api/portraits/men/8.jpg",
      email: "chris.lee@example.com",
      firstName: "Chris",
      lastName: "Lee",
    },
    {
      id: 16,
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      email: "isabella.williams@example.com",
      firstName: "Isabella",
      lastName: "Williams",
    },
    {
      id: 17,
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      email: "anthony.harris@example.com",
      firstName: "Anthony",
      lastName: "Harris",
    },
    {
      id: 18,
      image: "https://randomuser.me/api/portraits/women/9.jpg",
      email: "amanda.young@example.com",
      firstName: "Amanda",
      lastName: "Young",
    },
    {
      id: 19,
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      email: "john.walker@example.com",
      firstName: "John",
      lastName: "Walker",
    },
    {
      id: 20,
      image: "https://randomuser.me/api/portraits/women/10.jpg",
      email: "rebecca.king@example.com",
      firstName: "Rebecca",
      lastName: "King",
    },
    {
      id: 21,
      image: "https://randomuser.me/api/portraits/men/11.jpg",
      email: "joseph.scott@example.com",
      firstName: "Joseph",
      lastName: "Scott",
    },
    {
      id: 22,
      image: "https://randomuser.me/api/portraits/women/11.jpg",
      email: "lily.lee@example.com",
      firstName: "Lily",
      lastName: "Lee",
    }
  ]);

  const columns = [
    {
      name: "User Image",
      cell: (row) => (
        <img
          src={row.image}
          alt={row.firstName}
          width="36"
          height="36"
          className="rounded-circle"
        />
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      cell: (row) => (
        <a className="text-decoration-none" href={`mailto:${row.email}`}>
          {row.email}
        </a>
      ),
      sortable: true,
    },
    {
      name: "First Name",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button
            variant="primary"
            className="me-2 btn-sm"
            onClick={() => handleEditUser(row)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            className="btn-sm"
            onClick={() => openDeleteModal(row)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setShowAddEditModal(true);
  };

  const openDeleteModal = (user) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteUser = () => {
    setUsers(users.filter((u) => u.id !== currentUser.id));
    setShowDeleteModal(false);
  };

  const handleSaveUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
      id: isEditing ? currentUser.id : users.length + 1,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      image: formData.get("image") || "https://via.placeholder.com/50",
    };

    if (isEditing) {
      setUsers(
        users.map((user) => (user.id === currentUser.id ? updatedUser : user))
      );
    } else {
      setUsers([...users, updatedUser]);
    }

    setShowAddEditModal(false);
    setCurrentUser(null);
    setIsEditing(false);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User Management</h2>
        <div className="d-flex align-items-center">
          <Form.Control
            className="me-4"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            className="w-50"
            onClick={() => {
              setCurrentUser(null);
              setIsEditing(false);
              setShowAddEditModal(true);
            }}
          >
            Add User
          </Button>
        </div>
      </div>

      <Row className="mb-3">
        <Col>
          <Button className="btn-sm"
            variant={viewType === "list" ? "primary" : "outline-primary"}
            onClick={() => setViewType("list")}
          >
            <FaTable className="toogle-icon" /> List View
          </Button>
          <Button
            variant={viewType === "card" ? "primary" : "outline-primary"}
            onClick={() => setViewType("card")}
            className="btn-sm ms-2"
          >
            <FaTableColumns className="toogle-icon" /> Card View
          </Button>
        </Col>
      </Row>

      {viewType === "list" ? (
        <DataTable
          className="react-data-table"
          columns={columns}
          data={filteredUsers}
          pagination
          highlightOnHover
        />
      ) : (
        <Row>
          {filteredUsers.map((user) => (
            <Col key={user.id} sm={12} md={6} lg={3}>
              <Card className="mb-3">
                <Card.Img
                  variant="top"
                  src={user.image}
                  alt={user.firstName}
                  draggable="false"
                />
                <Card.Body className="text-center">
                  <Card.Title>
                    {user.firstName} {user.lastName}
                  </Card.Title>
                  <Card.Text>
                    <a
                      href={`mailto:${user.email}`}
                      className="text-decoration-none"
                    >
                      {user.email}
                    </a>
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => openDeleteModal(user)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal
        show={showAddEditModal}
        onHide={() => setShowAddEditModal(false)}
        centered
        backdrop="static"
      >
        <Form onSubmit={handleSaveUser}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit User" : "Add User"}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4">
            <Form.Group className="mb-3">
              <Form.Label>
                <span className="text-danger">* </span>First Name
              </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                maxLength={50}
                minLength={3}
                defaultValue={currentUser?.firstName || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <span className="text-danger">* </span>Last Name
              </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                maxLength={50}
                defaultValue={currentUser?.lastName || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <span className="text-danger">* </span>Email
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                maxLength={150}
                defaultValue={currentUser?.email || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <span className="text-danger">* </span>Profile Image Link
              </Form.Label>
              <Form.Control
                type="url"
                name="image"
                defaultValue={currentUser?.image || ""}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setShowAddEditModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>
            {currentUser?.firstName} {currentUser?.lastName}
          </strong>
          ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
