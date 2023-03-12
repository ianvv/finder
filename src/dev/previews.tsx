import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import App from "../App";
import Navbar from "../components/Navbar/Navbar";
import MainLayout from "../layouts/MainLayout";

const ComponentPreviews = () => {
    return (
      <Previews palette={<PaletteTree />}>
        <ComponentPreview path="/App">
          <App />
        </ComponentPreview>
        <ComponentPreview path="/Navbar">
          <Navbar />
        </ComponentPreview>
        <ComponentPreview path="/MainLayout">
          <MainLayout />
        </ComponentPreview>
      </Previews>
    );
};

export default ComponentPreviews;