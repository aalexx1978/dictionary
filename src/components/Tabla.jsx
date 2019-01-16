import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import { Panel, Button, Form, FormGroup, FormControl } from "react-bootstrap";

class Tabla extends React.Component {
    constructor(props) {
        super(props);
        this.validate = this.validate.bind(this);
        this.addWord = this.addWord.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = { d: "", r: "" };
    }
    removeDictionary(id) {
        this.props.removeDictionary(id);
    }
    onChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    addWord(e, dictionary, rest) {
        e.preventDefault();
        let d = this.state.d;
        let r = this.state.r;
        if (d.length <= 0 || r.length <= 0) {
            return false;
        }
        dictionary[d] = r;
        this.props.appActions.updateDictionary(dictionary);
        this.setState.d = "";
        this.setState.r = "";
    }
    deleteItem(row) {
        let dict = this.props.dictionary;
        delete dict[row.domain];
        if (window.confirm("Are you sure you wish to delete this item?"))
            this.props.appActions.updateDictionary(dict);
    }
    validate(value, row, column, dictionary, rest) {
        if (value.length === 0 || /^\s*$/.test(value)) {
            return {
                valid: false,
                message: "Not Empty"
            };
        } else if (value === "id" || value === "name") {
            return {
                valid: false,
                message: "Name not valid"
            };
        } else if (row.domain === value || row.range === value) {
            return {
                valid: false,
                message: "Exists alredy as domain or range"
            };
        } else if (
            Object.keys(rest).indexOf(value) >= 0 ||
            Object.values(rest).indexOf(value) >= 0
        ) {
            return {
                valid: false,
                message: "Exists alredy as domain or range"
            };
        } else {
            delete dictionary[row.domain];
            row[column.dataField] = value;
            dictionary[row.domain] = row.range;
            this.props.appActions.updateDictionary(dictionary);
            return true;
        }
    }
    onSubmit(e) {
        e.preventDefault();
    }

    render() {
        const { dictionary } = this.props;
        const { id, name, ...rest } = this.props.dictionary;
        const expandRow = {
            renderer: row => (
                <div>
                    <p>
                        To delete press here{" "}
                        <Button onClick={() => this.deleteItem(row)}>
                            Delete
                        </Button>
                    </p>
                </div>
            )
        };

        const columns = [
            {
                dataField: "id",
                text: "ID"
            },
            {
                dataField: "domain",
                text: "Domain",
                editable: true,
                sort: true,
                classes: (cell, row, rowIndex, colIndex) => {
                    if (row.domain === row.range) {
                        return "warning";
                    }
                    let values = { ...rest };
                    delete values[row.domain];
                    let k = this.dataField === "domain";
                    if (k) {
                        if (Object.values(values).indexOf(cell) >= 0) {
                            return "danger";
                        } else if (Object.keys(values).indexOf(cell) >= 0) {
                            return "warning";
                        }
                    } else {
                        if (Object.keys(values).indexOf(cell) >= 0) {
                            return "danger";
                        } else if (Object.values(values).indexOf(cell) >= 0) {
                            return "warning";
                        }
                    }
                    return "";
                },
                validator: (newValue, row, column) => {
                    let validD = this.validate(
                        newValue,
                        row,
                        column,
                        dictionary,
                        { ...rest }
                    );
                    return validD;
                }
            },
            {
                dataField: "range",
                text: "Range",
                editable: true,
                sort: true,
                classes: (cell, row, rowIndex, colIndex) => {
                    if (row.domain === row.range) {
                        return "warning";
                    }
                    let values = { ...rest };
                    delete values[row.domain];
                    let k = this.dataField === "domain";
                    if (k) {
                        if (Object.values(values).indexOf(cell) >= 0) {
                            return "danger";
                        } else if (Object.keys(values).indexOf(cell) >= 0) {
                            return "warning";
                        }
                    } else {
                        if (Object.keys(values).indexOf(cell) >= 0) {
                            return "danger";
                        } else if (Object.values(values).indexOf(cell) >= 0) {
                            return "warning";
                        }
                    }
                    return "";
                },
                validator: (newValue, row, column) => {
                    let validR = this.validate(
                        newValue,
                        row,
                        column,
                        dictionary,
                        { ...rest }
                    );
                    return validR;
                }
            }
        ];
        const defaultSorted = [
            {
                dataField: "domain",
                order: "asc"
            }
        ];
        const elements = Object.keys(rest).map((item, i) => ({
            id: i,
            domain: item,
            range: rest[item]
        }));

        return (
            <Panel id={"panel" + dictionary.id}>
                <Panel.Heading>
                    <Panel.Title toggle>
                        {dictionary.name}{" "}
                        <small className="text-right small muted pull-right">
                            Double Click to EDIT, press return to save
                        </small>
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <BootstrapTable
                            expandRow={expandRow}
                            keyField="id"
                            data={elements}
                            columns={columns}
                            defaultSorted={defaultSorted}
                            cellEdit={cellEditFactory({
                                mode: "dbclick"
                            })}
                        />
                        <Form onSubmit={e => this.onSubmit(e)} inline>
                            <FormGroup
                                bsSize="small"
                                controlId="formInlineDomain"
                            >
                                <FormControl
                                    required={true}
                                    name="d"
                                    onChange={e => this.onChange(e)}
                                    type="text"
                                    placeholder="Type domain"
                                />
                            </FormGroup>{" "}
                            <FormGroup
                                onChange={e => this.onChange(e)}
                                bsSize="small"
                                controlId="formInlineRange"
                            >
                                <FormControl
                                    name="r"
                                    required={true}
                                    type="text"
                                    placeholder="Type range"
                                />
                            </FormGroup>{" "}
                            <Button
                                type="submit"
                                onClick={e => this.addWord(e, dictionary, rest)}
                                bsSize="small"
                            >
                                Add row
                            </Button>
                        </Form>
                        <br />
                        <Button
                            bsStyle="danger"
                            onClick={() =>
                                this.props.appActions.removeDictionary(
                                    dictionary.id
                                )
                            }
                        >
                            Remove Dictionary
                        </Button>
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }
}
export default Tabla;
