import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import icon from "../assets/x_icon.png";
import axios from "axios";

function Sidebar(props) {
  const [channels, setChannels] = useState(props.channels);
  const [notifications, setNotifications] = useState({
    General: 3,
    Random: 0,
    React: 1,
    JavaScript: 0,
  });
  const [newChannel, setNewChannel] = useState("");
  const [show, setShow] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddChannel = () => {
    if (newChannel.trim() !== "") {
      axios
        .post(
          `/api/boards/${props.boardId}/channels`,
          {
            name: newChannel,
            members: [
              /* array of member IDs */
            ], //problem here?
          },
          {
            headers: { Authorization: `${localStorage.getItem("token")}` },
          }
        )
        .then((response) => {
          setChannels([...channels, response.data.newChannel]);
          setNewChannel("");
          handleClose();
        })
        .catch((error) => console.error(error));
    }
  };

  const handleDeleteChannel = () => {
    axios
      .delete(`/api/boards/${props.boardId}/channels/${channelToDelete._id}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setChannels(
          channels.filter((channel) => channel.name !== channelToDelete.name)
        );
        setChannelToDelete(null);
      })
      .catch((error) => console.error(error));
  };

  const handleConfirmDelete = (channel) => {
    setChannelToDelete(channel);
  };

  useEffect(() => {
    axios
      .get(`/api/boards/${props.boardId}/channels`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setChannels(response.data);
      })
      .catch((error) => console.error(error));
  }, [props.boardId]);

  return (
    <div className="sidebar">
      <h2>{props.boardName}</h2>
      <ul>
        {channels.map((channel) => (
          <li
            className={`channel ${
              props.selectedChannel === channel.name
                ? "selected-channel"
                : "channel-row"
            }`}
            key={channel.name}
          >
            <div
              className="channel-row"
              onClick={() => props.onChannelClick(channel.name)}
            >
              <div
                className={notifications[channel.name] > 0 ? "unread" : "read"}
              >
                # {channel.name}
              </div>
              <button
                className="delete-button"
                onClick={() => {
                  console.log(channel);
                  handleConfirmDelete(channel);
                }}
              >
                <img className="x-logo" src={icon}></img>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Button variant="outline-primary" size="sm" onClick={handleShow}>
        Add Channel
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="New channel"
            value={newChannel}
            onChange={(e) => setNewChannel(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddChannel}>
            Add Channel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={channelToDelete !== null}
        onHide={() => setChannelToDelete(null)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>#{channelToDelete ? channelToDelete.name : ""}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setChannelToDelete(null)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDeleteChannel}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Sidebar;
