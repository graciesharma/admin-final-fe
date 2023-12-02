"use client";
import React, { useState, useEffect } from "react";
import {
  AppShell,
  Burger,
  Button,
  Flex,
  Header,
  MediaQuery,
  Table,
  Text,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RestroomAddForm from "./components/RestroomAddForm";
import AddReview from "./components/AddReview";

import ReviewRatingModal from "./components/ReviewRatingModal";
import ToiletService from "./services/ToiletService";
import { useTableStyles } from "./style";

export default function Home() {
  const theme = useMantineTheme();
  const toiletService = new ToiletService();

  const { classes: tableStyleClasses } = useTableStyles();

  const [reviewOpened, { open: reviewOpen, close: reviewClosed }] =
    useDisclosure();

  const [
    reviewModalOpened,
    { open: reviewModalOpen, close: reviewModalClosed },
  ] = useDisclosure();

  const [hamBurgerOpened, setHamburgerOpened] = useState(false);
  const [opened, { open, close }] = useDisclosure();

  const [toilets, setToilets] = useState([]);

  const [toiletId, setToiletId] = useState("");

  const load = () =>
    toiletService.getAll().then((response) => {
      setToilets(response.data);
    });

  useEffect(() => {
    load();
  }, []);

  const handleDeleteToilet = (toiletId) => {
    toiletService.delete(toiletId).then(() => {
      load();
    });
  };

  const onSubmit = (data, amValue, pmValue) => {
    const formattedData = {
      address: `${data.locationName}, ${data.countryName}`,
      locationName: data.locationName,
      countryName: data.countryName,
      coords: {
        latitude: data?.latitude,
        longitude: data?.longitude,
      },
      description: data?.description,
      images: data?.images,
      name: data?.name,
      tags: data?.tags,
      openingTime: amValue,
      closingTime: pmValue,
    };

    if (toiletId) {
      toiletService.update(toiletId, formattedData).then(() => {
        close();
        load();
      });
    } else {
      toiletService.create(formattedData).then(() => {
        close();
        load();
      });
    }
  };

  const handleLogout = () => {
    document.cookie =
      "authtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setHamburgerOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text
              sx={{ fontSize: "1.4rem", fontWeight: 500, color: "#262758" }}
            >
              Include a toilet and contribute to making a difference!
            </Text>
            <Button onClick={handleLogout} color="red">
              Logout
            </Button>
          </div>
        </Header>
      }
    >
      <Flex justify="flex-start">
        <Button mb="4rem" onClick={open} bg="#262758">
          Add Toilet
        </Button>
      </Flex>
      <Table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Name</th>
            <th>Address</th>
            <th>Description</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Action</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {toilets.map((toilet, index) => (
            <tr key={index} className={tableStyleClasses.row}>
              <td className={tableStyleClasses.td}>{toilet?.id}</td>
              <td className={tableStyleClasses.td}>{toilet?.name}</td>
              <td className={tableStyleClasses.td}>{toilet?.address}</td>
              <td className={tableStyleClasses.td}>{toilet?.description}</td>
              <td className={tableStyleClasses.td}>
                {toilet.coords?.latitude}
              </td>
              <td className={tableStyleClasses.row}>
                {toilet.coords?.longitude}
              </td>
              <td>
                <Group>
                  <Button
                    color="red"
                    onClick={() => handleDeleteToilet(toilet.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    color="filled"
                    onClick={() => {
                      setToiletId(toilet.id);
                      open();
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    color="cyan"
                    onClick={() => {
                      setToiletId(toilet.id);
                      reviewOpen();
                    }}
                  >
                    View Review
                  </Button>
                  <Button
                    color="pink"
                    onClick={() => reviewModalOpen()} // Open AddReviewModal
                  >
                    Add Review
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {opened && (
        <RestroomAddForm
          opened={opened}
          close={close}
          toiletId={toiletId}
          onSubmit={onSubmit}
        />
      )}
      {reviewOpened && (
        <ReviewRatingModal
          opened={reviewOpened}
          close={reviewClosed}
          toiletId={toiletId}
        />
      )}

      <AddReview opened={reviewModalOpened} onClose={reviewModalClosed} />
    </AppShell>
  );
}
