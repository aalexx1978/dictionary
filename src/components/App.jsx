import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as appActions from "../actions/appActions";
import Header from "./Header";
import PropTypes from "prop-types";
import { Col, Row, Grid, Alert, Button, ControlLabel } from "react-bootstrap";
import { PanelProd } from "./PanelProd";
import SelectDict from "./SelectDict";
import Tabla from "./Tabla";

export class App extends React.Component {
    componentDidMount() {
        this.props.appActions.fetchProducts("products");
        this.props.appActions.fetchDictionaries("dictionaries");
    }

    addProduct() {
        this.props.appActions.addProduct();
    }
    render() {
        const { dictionary, dictionaries } = this.props;
        let dataset = false;
        if (dictionary) {
            const dict = dictionaries.filter(element => {
                return element.id === dictionary;
            })[0];
            dataset = dict;
        }

        return (
            <div className="App">
                <Grid>
                    <Row>
                        <Col md={12}>
                            <Header />
                        </Col>
                    </Row>
                    {this.props.error !== null && (
                        <Alert bsStyle="danger">
                            <strong>Ups!</strong> {this.props.error}
                        </Alert>
                    )}
                    <Row>
                        <Col md={4}>
                            <SelectDict {...this.props} />
                        </Col>
                        <Col md={2}>
                            <ControlLabel>Add new product</ControlLabel>
                            <Button
                                onClick={() => this.addProduct()}
                                bsStyle="info"
                            >
                                Add Product
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {this.props.products.map(item => (
                            <Col lg={3} key={item.id}>
                                <PanelProd
                                    {...item}
                                    removeButton={id =>
                                        this.props.appActions.removeProduct(id)
                                    }
                                    data={dataset}
                                />
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        {dictionaries.map((item, i) => {
                            return (
                                <Col md={6} key={i}>
                                    {" "}
                                    <Tabla {...this.props} dictionary={item} />
                                </Col>
                            );
                        })}
                    </Row>
                    <Row>
                        <Col md={3}>
                            <Button
                                onClick={() =>
                                    this.props.appActions.addDictionary()
                                }
                                bsStyle="warning"
                            >
                                Add Dictionary
                            </Button>
                        </Col>
                    </Row>
                    <Row className="btm">
                        <Col xs={7}>
                            <div className="error1"> </div> Warning, domain or
                            range repeated
                        </Col>
                        <Col xs={5}>
                            <div className="error2 danger"> </div> Error,
                            possible bucle
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
App.propTypes = {
    products: PropTypes.array,
    dictionaries: PropTypes.array,
    error: PropTypes.string,
    dictionary: PropTypes.number
};
function mapStateToProps(state) {
    return {
        products: state.appRed.products,
        dictionaries: state.appRed.dictionaries,
        error: state.appRed.error,
        dictionary: state.appRed.dictionary
    };
}

function mapDispatchToProps(dispatch) {
    return {
        appActions: bindActionCreators(appActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
