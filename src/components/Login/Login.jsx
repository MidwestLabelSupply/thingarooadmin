import { Button, TextField } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";

function Login({ username, password, setUsername, setPassword, handleSubmit }) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: 340,
          width: "100%",
          boxShadow: "0 10px 6px -6px #777",
          padding: "45px 25px 30px",
          backgroundColor: "white",
          borderRadius: 10,
        }}
      >
        <div
          style={{
            background: "#0e91a0",
            height: 54,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
            fontSize: 22,
            color: "white",
            fontWeight: 500,
            borderRadius: 4,
          }}
        >
          <LockOpenIcon /> LOGIN
        </div>
        <div>
          <div style={{ margin: "20px 0" }}>
            <TextField
              id="username-input"
              error={!username}
              value={username}
              sx={{ width: "100%", fontSize: 20 }}
              onChange={(e) => setUsername(e.target.value)}
              label="USERNAME"
              variant="standard"
              helperText={!username ? "username can not be empty." : ""}
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <TextField
              id="password-input"
              value={password}
              error={!password}
              sx={{ width: "100%", fontSize: 20 }}
              onChange={(e) => setPassword(e.target.value)}
              label="PASSWORD"
              inputProps={{ type: "password" }}
              variant="standard"
              helperText={!password ? "password can not be empty." : ""}
            />
          </div>

          <div>
            <Button
              onClick={handleSubmit}
              style={{
                color: "white",
                fontWeight: 700,
                background: "#0e91a0",
                padding: "8px 20px",
                width: "100%",
              }}
              disabled={!username || !password}
            >
              LOGIN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
