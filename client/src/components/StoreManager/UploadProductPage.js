import React, {useState} from 'react'
import {Form,Button} from 'react-bootstrap';
import FileUpload from '../../service/FileUpload';

function UploadProductPage() {

    const [Images, setImages] = useState([])

    const updateImages = (newImages) => {
      setImages(newImages)
    }

    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <h2>Upload Product</h2>
            </div>
            <Form>
            <FileUpload refreshFunction={updateImages}/>
            <br/>
    <Form.Group controlId="formMainCategory">
    <Form.Label>Main Category</Form.Label>
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="formSubCategory">
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
  <Form.Group controlId="formDescription">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
  <Form.Group controlId="formPrice">
    <Form.Label>Price(Rs)</Form.Label>
    <Form.Control type="number" placeholder="Rs.xxxx" />
  </Form.Group>
  <Button className="btn btn-primary btn-large centerButton" type="submit">Submit</Button>
</Form>
        </div>
    ) 
}

export default UploadProductPage
