"use client";
import { Button, Flex, Input, Paper, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ToiletService from "../services/ToiletService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const toiletService = new ToiletService();

  const handleSubmit = () => {
    // setLoading(true);
    // toiletService
    //   .login({ username, password })
    //   .then((res) => {
        window.location.href = "/";
    //   })
    //   .catch((_) => {
    //     toast.error("Something went wrong");
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  return (
    <Flex
      sx={{
        margin: 0,
        padding: 0,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.99)), url('/toiletpaper.jpeg')",
        backgroundRepeat: "repeat",
        backgroundSize: "400px 240px",
      }}
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
    >
      <Toaster />
      <Paper shadow="xs" p="xl">
        <Stack align="center">
          <Text size={64}>🚽</Text>
          <Title>Admin Login</Title>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            w={{ md: 512 }}
            name="username"
            placeholder="username"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            w={{ md: 512 }}
            name="password"
            placeholder="password"
            type="password"
          />

          <Button
            w="100%"
            loading={loading}
            onClick={handleSubmit}
            type="submit"
          >
            Login
          </Button>
        </Stack>
      </Paper>
    </Flex>
  );
};

export default Login;
