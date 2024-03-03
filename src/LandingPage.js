import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Half = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LandingPage = () => (
  <Container>
    <Half style={{ background: '#f0f0f0' }}>
      <h1>Welcome to Our Website</h1>
      <p>Discover the amazing features of our site...</p>
    </Half>
    <Half>
      <h2>Get Started</h2>
      <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
    </Half>
  </Container>
);

export default LandingPage;
