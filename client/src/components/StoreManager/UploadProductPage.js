import React from 'react'
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import FileUpload from '../../service/FileUpload';

function UploadProductPage() {
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <h2>Upload Product</h2>
            </div>
            <Form>
            <FileUpload/>
            <br/>
    <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Main Category</Form.Label>
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Sub Category</Form.Label>
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  {['checkbox'].map((type) => (
    <div key={`custom-inline-${type}`} className="mb-3">
      <Form.Check
        custom
        inline
        label="XS"
        type={type}
        id={`custom-inline-${type}-1`}
      />
      <Form.Check
        custom
        inline
        label="S"
        type={type}
        id={`custom-inline-${type}-2`}
      />
      <Form.Check
        custom
        inline
        label="M"
        type={type}
        id={`custom-inline-${type}-3`}
      />
      <Form.Check
        custom
        inline
        label="L"
        type={type}
        id={`custom-inline-${type}-4`}
      />
      <Form.Check
        custom
        inline
        label="XL"
        type={type}
        id={`custom-inline-${type}-5`}
      />
    </div>
  ))}
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Price(Rs)</Form.Label>
    <Form.Control type="number" placeholder="Rs.xxxx" />
  </Form.Group>
  <Button as="input" type="submit" value="Submit" />
</Form>
        </div>
    ) 
}

export default UploadProductPage
