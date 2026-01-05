import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const styles = {
    bannerImage: {
      width: "40%",
      height: "auto",
      maxHeight: "230px",
      objectFit: "cover",
    },
    header: {
      height: "34vw",
      width: "80%",
      margin: "0 auto",
      background: "url(/pic.jpg) no-repeat center center",
      backgroundSize: "cover",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#ffffff",
    },
    title: {
      fontSize: "4vw",
      fontWeight: "800",
      color: "#7BC47F",
      textShadow: "2px 2px 5px rgba(255,255,255,0.9)",
      marginBottom: "2vw",
    },
    buttonGroup: {
      display: "flex",
      gap: "2vw",
      justifyContent: "center",
    },
  };

  return (
    <div>
      <div>
        <img src="/banner.jpg" alt="SBIT Banner" style={styles.bannerImage} />
      </div>

      <div style={styles.header}>
        <h2 style={styles.title}>WELCOME</h2>

        <div style={styles.buttonGroup}>
          <Button
            onClick={() => navigate("/login")}
            sx={{
              py: 1.2,
              px: 4,
              fontWeight: 600,
              borderRadius: "30px",
              backgroundColor: "#7BC47F",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#6FB573" },
            }}
          >
            LOGIN
          </Button>

          <Button
            onClick={() => navigate("/register")}
            sx={{
              py: 1.2,
              px: 4,
              fontWeight: 600,
              borderRadius: "30px",
              backgroundColor: "#7BC47F",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#6FB573" },
            }}
          >
            REGISTER
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
