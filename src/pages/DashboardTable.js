import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
  Form,
  Modal,
} from "react-bootstrap";
import { FaSearch, FaTable } from "react-icons/fa";
import { FaTableColumns } from "react-icons/fa6";

const Dashboard = () => {
  const [viewType, setViewType] = useState("list"); // Toggle between list and card views
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddEditModal, setShowAddEditModal] = useState(false); // Add/Edit modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Delete modal visibility
  const [currentUser, setCurrentUser] = useState(null); // Current user to edit or delete
  const [users, setUsers] = useState([
    // Sample user data
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
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      email: "rale.tena@example.com",
      firstName: "Rale",
      lastName: "Tena",
    },
  ]);

  const isEditing = !!currentUser; // Determine if it's edit mode

  // Handle adding/updating a user
  const handleSaveUser = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newUser = {
      id: isEditing ? currentUser.id : Date.now(),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      image: formData.get("image"),
    };

    if (isEditing) {
      setUsers((prev) =>
        prev.map((user) => (user.id === currentUser.id ? newUser : user))
      );
    } else {
      setUsers((prev) => [...prev, newUser]);
    }

    setShowAddEditModal(false);
    setCurrentUser(null);
  };

  // Handle opening Add/Edit modal
  const openAddEditModal = (user = null) => {
    setCurrentUser(user);
    setShowAddEditModal(true);
  };

  // Handle opening Delete modal
  const openDeleteModal = (user) => {
    setCurrentUser(user);
    setShowDeleteModal(true);
  };

  // Handle user deletion
  const handleDeleteUser = () => {
    setUsers((prev) => prev.filter((user) => user.id !== currentUser.id));
    setShowDeleteModal(false);
    setCurrentUser(null);
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      {/* Header with Search and Add New */}
      <Row className="my-4">
        <Col className="d-flex justify-content-between align-items-center">
          <h2>User Management</h2>
          <div className="d-flex align-items-center">
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="me-2"
            />
            <Button variant="outline-primary" className="btn-bordered me-3">
              <FaSearch />
            </Button>
            <Button variant="primary w-50" onClick={() => openAddEditModal()}>
              Add User
            </Button>
          </div>
        </Col>
      </Row>

      {/* Toggle View Buttons */}
      <Row className="mb-3">
        <Col>
          <Button
            variant={viewType === "list" ? "secondary" : "outline-secondary"}
            onClick={() => setViewType("list")}
          >
            <FaTable className="toogle-icon" /> List View
          </Button>
          <Button
            variant={viewType === "card" ? "secondary" : "outline-secondary"}
            onClick={() => setViewType("card")}
            className="ms-2"
          >
            <FaTableColumns className="toogle-icon" /> Card View
          </Button>
        </Col>
      </Row>

      {/* List or Card View */}
      {viewType === "list" ? (
        <Table hover responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <img
                    src={user.image}
                    alt={user.firstName}
                    width="50"
                    height="50"
                    className="rounded-circle"
                    draggable="false"
                  />
                </td>
                <td><a href= {`mailto:user.email`} className="text-decoration-none">{user.email}</a></td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td className="text-end">
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => openAddEditModal(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => openDeleteModal(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Row>
          {filteredUsers.map((user) => (
            <Col key={user.id} sm={12} md={6} lg={3}>
              <Card className="mb-3">
                <Card.Img variant="top" src={user.image} alt={user.firstName} draggable="false" />
                <Card.Body className="text-center">
                  <Card.Title>
                    {user.firstName} {user.lastName}
                  </Card.Title>
                  <Card.Text>
                    <a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a>
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => openAddEditModal(user)}
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

      {/* Add/Edit User Modal */}
      <Modal show={showAddEditModal} onHide={() => setShowAddEditModal(false)} centered backdrop="static">
        <Form onSubmit={handleSaveUser}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit User" : "Add User"}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4">
            <Form.Group className="mb-3">
              <Form.Label><span className="text-danger">* </span>First Name</Form.Label>
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
              <Form.Label><span className="text-danger">* </span>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                maxLength={50}
                defaultValue={currentUser?.lastName || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><span className="text-danger">* </span>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                maxLength={150}
                defaultValue={currentUser?.email || ""}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><span className="text-danger">* </span>Profile Image Link</Form.Label>
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

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered backdrop="static">
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
    </Container>
  );
};

export default Dashboard;
