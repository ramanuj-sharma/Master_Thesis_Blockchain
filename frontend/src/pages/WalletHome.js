import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Card = styled.div`
  background: ${(props) => props.theme.cardBackground};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled(Link)`
  background: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonText};
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin: 10px;
  transition: 0.3s;
  
  &:hover {
    opacity: 0.8;
  }
`;

const WalletHome = () => {
  return (
    <Container>
      <Card>
        <h2>Welcome to Your Wallet</h2>
        <Button to="/otp-setup">Setup OTP</Button>
        <Button to="/transactions">View Transactions</Button>
        <Button to="/settings">Settings</Button>
      </Card>
    </Container>
  );
};

export default WalletHome;
