import "./App.css";
import Footer from "./HOF/Footer";
import Home from "./Components/Home/Home";
import Navbar from "./HOF/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./HOF/Layout";
import Solutions from "./Components/Solutions/Solutions";
import About from "./Components/About/About";
import ContactUs from "./Components/ContactUs/ContactUs";
import ScrollToTop from "./Utilities/scrollTop";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route
            path="*"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/solutions/save"
            element={
              <Layout>
                <Solutions />
              </Layout>
            }
          />

          <Route
            path="/contact"
            element={
              <Layout>
                <ContactUs />
              </Layout>
            }
          />
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
