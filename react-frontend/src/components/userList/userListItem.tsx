import styles from "../../styles/UserListItem.module.css";
import { Card, Col } from "react-bootstrap";
import { formatDate } from "../../utils/dateUtils";
import { orange } from "@mui/material/colors";
import { useState } from "react";

interface UserListItemProps {
    name: string,
    email: string,
    phone: string,
    dob: string,
    gender: string,
    createdAt: string,
    className?: string
}

const UserListItem = ({
    name,
    email,
    phone,
    dob,
    gender,
    createdAt,
    className
}: UserListItemProps) => {
    const [showDetails, setShowDetails] = useState(false)
    return (
        <Card className={`${styles.cardPointer} ${className}`} onClick={() => setShowDetails(!showDetails)}>
            <Card.Body>
                <Card.Title>
                    {name}
                </Card.Title>
                <Card.Subtitle>
                    {email}
                </Card.Subtitle>
                {showDetails && <Col style={{
                    backgroundColor: orange[100],
                    borderRadius: '8px',
                    marginTop: '2px',
                    opacity: showDetails ? "1" : "0",
                    transition: "opacity .2s",
                }}>
                    <Card.Text>Phone: {phone}</Card.Text>
                    <Card.Text>Date of Birth: {formatDate(dob, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}</Card.Text>
                    <Card.Text>Gender: {gender}</Card.Text>
                </Col>
                }
            </Card.Body>
            <Card.Footer className="text-muted">
                Created At: {formatDate(createdAt, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}
            </Card.Footer>
        </Card>
    )
};



export default UserListItem;