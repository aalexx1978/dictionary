import React from "react";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

class SelectDict extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        let selected = parseInt(e.target.value, 10);
        this.props.appActions.setDictionary(selected);
    }
    render() {
        const { dictionaries, dictionary } = this.props;
        return (
            <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select Dictionary to apply</ControlLabel>
                <FormControl
                    defaultValue={dictionary}
                    onChange={e => this.handleChange(e)}
                    componentClass="select"
                    placeholder="select"
                >
                    <option value={0}>Original</option>
                    {dictionaries.map(item => {
                        return (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        );
                    })}
                </FormControl>
            </FormGroup>
        );
    }
}
export default SelectDict;
