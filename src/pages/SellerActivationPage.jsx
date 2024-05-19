import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { server } from "../server";

const SellerActivationPage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (activation_token) {
            const sendRequest = async () => {
                await axios
                .post(`${server}/shop/activation/${activation_token}`) // Make sure the URL matches the backend route
                .then((res)=>{
                    setError(true);
                })
                .catch((error) => {
                    setError(true); // Handle errors
                    console.log(error); // Log any errors for debugging
                });
            };
            sendRequest();
        }
    }, []);

    return (
        <div style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            Your account has been created
        </div>
    );
}

export default SellerActivationPage;
