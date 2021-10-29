import React, { useEffect, useState } from "react";
import { Button, DropdownButton, Dropdown, Form } from "react-bootstrap"

export function Request() {
    const [endpoint, setEndpoint] = useState("");
    const [method, setMethod] = useState("GET");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [requiresBody, setRequiresBody] = useState(false);
    const [body, setBody] = useState("");

    const onSubmit = () => {
        const requestOptions = {
            method: method,
            header: { 'Content-Type': 'application/json' },
            body: body
        }
        fetch(endpoint)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                },
                (error) => {
                    setError(error.message);
                }
            )
    }

    const handleSelect = (event) => {
        if (event === "GET") {
            setRequiresBody(false)
        } else {
            setRequiresBody(true)
        }

        setMethod(event)
    }

    const onEndpointChange = (event) => {
        setEndpoint(event.target.value);
    }

    const onBodyChange = (event) => {
        setBody(event.target.value);
    }

    return (
        <React.Fragment>
            <Form>
                <Form.Group className="mb-3" controlId="formEndpoint">
                    <Form.Control value={endpoint} onChange={onEndpointChange} type="text" placeholder="Enter API Endpoint" />
                </Form.Group>

                <DropdownButton title={method} onSelect={handleSelect} className="p-2">
                    <Dropdown.Item eventKey="GET">GET</Dropdown.Item>
                    <Dropdown.Item eventKey="PUT">PUT</Dropdown.Item>
                    <Dropdown.Item eventKey="POST">POST</Dropdown.Item>
                    <Dropdown.Item eventKey="DELETE">Delete</Dropdown.Item>
                </DropdownButton>

                {requiresBody &&
                    <Form.Group className="mb-3" controlId="formBody">
                        <Form.Control value={body} onChange={onBodyChange} type="text" placeholder="Enter Request Body" />
                    </Form.Group>
                }

                <Button onClick={onSubmit} variant="primary" className="p-2">
                    Go
                </Button>
                <div>
                    <Form.Text className="text-danger">{error}</Form.Text>
                </div>

                {body &&
                    <Form.Text>{body}</Form.Text>
                }
            </Form>
        </React.Fragment>
    )
}