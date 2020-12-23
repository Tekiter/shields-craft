import { ChangeEvent, forwardRef, useCallback, useState } from "react";
import { Form, Header, Segment } from "semantic-ui-react";

export interface StaticContentProps {
    onChange?(e: { label: string; message: string }): void;
    label?: string;
    message?: string;
}

export const StaticContent = forwardRef<Element, StaticContentProps>(
    ({ onChange, ...props }, ref) => {
        const [label, setLabel] = useState("shields.io");
        const [message, setMessage] = useState("badge");

        const handleLabel = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                setLabel(e.target.value);
                if (onChange && typeof onChange === "function") {
                    onChange({ label: e.target.value, message });
                }
            },
            [label, message]
        );

        const handleMessage = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                setMessage(e.target.value);
                if (onChange && typeof onChange === "function") {
                    onChange({ label, message: e.target.value });
                }
            },
            [label, message]
        );

        return (
            <Segment ref={ref}>
                <Header as="h3">Content</Header>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Input
                            fluid
                            label="Label (left side)"
                            value={props.label}
                            onChange={handleLabel}
                        />
                        <Form.Input
                            fluid
                            label="Message (right side)"
                            value={props.message}
                            onChange={handleMessage}
                        />
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field></Form.Field>
                        <Form.Field></Form.Field>
                    </Form.Group>
                </Form>
            </Segment>
        );
    }
);
StaticContent.displayName = "StaticContent";
