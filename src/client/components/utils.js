import React , { useEffect } from "react";
import { useNavigate } from "react-router";

export const Redirect = ({ path }) => {
    let navigate = useNavigate();
    useEffect(() => navigate(path), []);
    return null;
}