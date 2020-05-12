import React, { Component } from 'react'
import { Container, Table, ButtonGroup, Button, Col, Image, Alert } from "react-bootstrap";

export default class SizeGuide extends Component {
    render() {
        return (
            <>
                {/* Tops & Tshirts */}
                <Container>
                    <h5 className="text-secondary">Tops & Tshirts</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Size</th>
                                <th>M</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>US/CAN</td>
                                <td>7, 9</td>
                            </tr>
                            <tr>
                                <td>Bust (in)</td>
                                <td>35-37</td>
                            </tr>
                            <tr>
                                <td>Waist (in)</td>
                                <td>28-29</td>
                            </tr>
                            <tr>
                                <td>UK</td>
                                <td>10, 12</td>
                            </tr>
                            <tr>
                                <td>EU</td>
                                <td>40, 42</td>
                            </tr>
                            <tr>
                                <td>AUS</td>
                                <td>10, 12</td>
                            </tr>
                            <tr>
                                <td>Bust (cm)</td>
                                <td>89-94</td>
                            </tr>
                            <tr>
                                <td>Waist (cm)</td>
                                <td>70-75</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>

                {/* Jeans & Bottoms */}
                <Container>
                    <h5 className="text-secondary">Jeans & Bottoms</h5>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Size</th>
                                <th>M</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>US/CAN</td>
                                <td>7, 9</td>
                            </tr>
                            <tr>
                                <td>Waist (in)</td>
                                <td>28-29</td>
                            </tr>
                            <tr>
                                <td>Hips (in)</td>
                                <td>38-40</td>
                            </tr>
                            <tr>
                                <td>UK</td>
                                <td>10, 12</td>
                            </tr>
                            <tr>
                                <td>EU</td>
                                <td>40, 42</td>
                            </tr>
                            <tr>
                                <td>AUS</td>
                                <td>10, 12</td>
                            </tr>
                            <tr>
                                <td>Waist (cm)</td>
                                <td>70-75</td>
                            </tr>
                            <tr>
                                <td>Hips (cm)</td>
                                <td>93-98</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </>
        )
    }
}
