import React, { useEffect } from 'react';
import { Redirect } from "react-router";
import './Login.css';
import { logout } from "../../services/api";

const Logout: React.FC = () => {
  useEffect(() => {
    logout();
  }, []);

    return (
        <Redirect to="/login" />
    );
};

export default Logout;