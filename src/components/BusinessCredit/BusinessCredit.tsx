import "./BusinessCredit.css";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Fade from "@mui/material/Fade";
import CardContent from "@mui/material/CardContent";
import bnpl from "../../images/bnpl2.png";
import rbf from "../../images/rbf2.png";
import id from "../../images/id2.png";

const BusinessCredit = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contentIndex, setContentIndex] = useState<number>(0);

  const content = [
    {
      img: bnpl,
      title: "Buy Now, Pay Later",
      text: "Pick up the bills you want us to pay now. Pay those bills instantly using our credit & pay us back within 30 days. Available for eligible businesses based on customized credit limts.",
    },
    {
      img: rbf,
      title: "Revenue Based Financing",
      text: "Borrow money against future online sales or subscription fee. Repay us when you generate sales. If your revenvue slows down, so you your repayments. Available for D2C % SaaS companies.",
    },
    {
      img: id,
      title: "Invoice Discounting",
      text: "Borrow money against your outstanding invoices. Available for eligible businesses based on collection history.",
    },
  ];

  return (
    <div className="business-credit">
      <h1 className="section-heading business-credit-heading">
        Business Credit
      </h1>
      <Modal keepMounted open={isOpen} onClose={() => setIsOpen(false)}>
        <Fade in={isOpen} timeout={500}>
          <div className="modal-box">
            <Card elevation={4} className="cards">
              <img
                src={content[contentIndex].img}
                className="card-image"
                alt={content[contentIndex].title}
              ></img>
              <CardContent className="card-content">
                <h1 className="card-title">{content[contentIndex].title}</h1>
                <h3 className="card-text">{content[contentIndex].text}</h3>
              </CardContent>
            </Card>
          </div>
        </Fade>
      </Modal>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        className="cards-container"
      >
        <Grid item lg={3} md={4} sm={5.5} xs={12}>
          <Card
            elevation={4}
            className="cards"
            onClick={() => {
              setContentIndex(0);
              setIsOpen(true);
            }}
          >
            <img
              src={bnpl}
              className="card-image"
              alt="Buy Now, Pay Later"
            ></img>
            <CardContent className="card-content">
              <h1 className="card-title">But Now, Pay Later</h1>
              <h3 className="read-more">Read More</h3>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={4} sm={5.5} xs={12}>
          <Card
            elevation={4}
            className="cards"
            onClick={() => {
              setContentIndex(1);
              setIsOpen(true);
            }}
          >
            <img
              src={rbf}
              className="card-image"
              alt="Revenue Based Financing"
            ></img>
            <CardContent className="card-content">
              <h1 className="card-title">Revenue Based Financing</h1>
              <h3 className="read-more">Read More</h3>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={4} sm={5.5} xs={12}>
          <Card
            elevation={4}
            className="cards"
            onClick={() => {
              setContentIndex(2);
              setIsOpen(true);
            }}
          >
            <img
              src={id}
              className="card-image"
              alt="Invoice Discounting"
            ></img>
            <CardContent className="card-content">
              <h1 className="card-title">Invoice Discounting</h1>
              <h3 className="read-more">Read More</h3>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default BusinessCredit;
