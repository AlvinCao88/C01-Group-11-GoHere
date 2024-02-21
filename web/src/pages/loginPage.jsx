import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginPage({mode}) {
  return (
    <div className='d-flex justify-content-center' style={{maxWidth: '100vw', width: '100vw', height: '100vh'}}>

    <div style={{width: '800px', marginTop: '8rem'}}>
        <h1>GoHere Administrator Site: {mode === 'signup' ? "Sign Up" : 'Log In'}</h1>
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
            {mode === 'signup' ? "Sign Up" : 'Log In'}
        </Button>
        </Form>
    </div>
    </div>


  );
}

export default LoginPage;