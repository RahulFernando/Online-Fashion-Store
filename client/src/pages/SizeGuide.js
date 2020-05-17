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
                                <th>S</th>
                                <th>M</th>
                                <th>L</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>US/CAN</td>
                                <td>3, 5</td>
                                <td>7, 9</td>
                                <td>11, 13</td>
                            </tr>
                            <tr>
                                <td>Bust (in)</td>
                                <td>33-35</td>
                                <td>35-37</td>
                                <td>37-39</td>
                            </tr>
                            <tr>
                                <td>Waist (in)</td>
                                <td>26-27</td>
                                <td>28-29</td>
                                <td>30-31</td>
                            </tr>
                            <tr>
                                <td>UK</td>
                                <td>6, 8</td>
                                <td>10, 12</td>
                                <td>14, 16</td>
                            </tr>
                            <tr>
                                <td>EU</td>
                                <td>36, 38</td>
                                <td>40, 42</td>
                                <td>44, 46</td>
                            </tr>
                            <tr>
                                <td>AUS</td>
                                <td>6, 8</td>
                                <td>10, 12</td>
                                <td>14, 16</td>
                            </tr>
                            <tr>
                                <td>Bust (cm)</td>
                                <td>83-89</td>
                                <td>89-94</td>
                                <td>94-99</td>
                            </tr>
                            <tr>
                                <td>Waist (cm)</td>
                                <td>65-70</td>
                                <td>70-75</td>
                                <td>75-80</td>
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
                                <th>S</th>
                                <th>M</th>
                                <th>L</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>US/CAN</td>
                                <td>3, 5</td>
                                <td>7, 9</td>
                                <td>11, 13</td>
                            </tr>
                            <tr>
                                <td>Waist (in)</td>
                                <td>26-27</td>
                                <td>28-29</td>
                                <td>30-31</td>
                            </tr>
                            <tr>
                                <td>Hips (in)</td>
                                <td>35-37</td>
                                <td>38-40</td>
                                <td>41-42</td>
                            </tr>
                            <tr>
                                <td>UK</td>
                                <td>6, 8</td>
                                <td>10, 12</td>
                                <td>14, 16</td>
                            </tr>
                            <tr>
                                <td>EU</td>
                                <td>36, 38</td>
                                <td>40, 42</td>
                                <td>44, 46</td>
                            </tr>
                            <tr>
                                <td>AUS</td>
                                <td>6, 8</td>
                                <td>10, 12</td>
                                <td>14, 16</td>
                            </tr>
                            <tr>
                                <td>Waist (cm)</td>
                                <td>65-70</td>
                                <td>70-75</td>
                                <td>75-80</td>
                            </tr>
                            <tr>
                                <td>Hips (cm)</td>
                                <td>88-93</td>
                                <td>93-98</td>
                                <td>98-103</td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </>
        )
    }
}
