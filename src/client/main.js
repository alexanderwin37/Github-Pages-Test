"use strict";

import React from "react";
import styled from "styled-components";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Redirect } from "./components/utils.js";

const MainApp = styled.div`
  font-size: 2em;
`;

const Header = styled.div`
  height: 1.5em;
  background-color: darkolivegreen;
  color: antiquewhite;
  font-weight: bold;
  font-variant: small-caps;
  font-size: 2em;
`;

const App = () => {
    return (
        <BrowserRouter>

            <Header>Spa React Template</Header>

            <Routes>
                <Route path="/" element={<MainApp>Hello World!</MainApp>} />
                <Route path="*" element={<Redirect path="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = createRoot(document.getElementById("mainDiv"));
root.render(<App />)