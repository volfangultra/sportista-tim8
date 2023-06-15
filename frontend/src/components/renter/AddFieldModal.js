import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import FieldFormAction from "./FieldFormAction";
import "../../pages/renter/Renter.css";

const AddFieldModal = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    return (
        <>
            <Fab
                style={{ position: "fixed", right: "30px", bottom: "30px" }}
                aria-label="Add"
                onClick={openModal}
                className="add-fab"
            >
                <AddIcon />
            </Fab>
            <Modal show={isOpen} onHide={closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <FieldFormAction
                        action="ADD"
                        user={props.user}
                        closeModal={closeModal}
                        getF={props.getf}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddFieldModal;
