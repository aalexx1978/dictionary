import React from "react";
import { Panel, Button } from "react-bootstrap";
import { get } from "lodash";

export const PanelProd = props => {
    const { color, price, product, data, removeButton, id } = props;
    let translation = color;
    if (data) {
        translation = get(data, color, "not translated");
    }
    return (
        <Panel bsStyle="info">
            <Panel.Heading>
                <Panel.Title componentClass="h3">
                    {product}
                    <Button
                        bsStyle="danger"
                        onClick={() => removeButton(id)}
                        bsSize="xsmall"
                        className="pull-right"
                    >
                        x
                    </Button>
                </Panel.Title>
            </Panel.Heading>
            <Panel.Body>{translation}</Panel.Body>
            <Panel.Footer className="text-right">
                <strong>{price}</strong> CHF
            </Panel.Footer>
        </Panel>
    );
};
