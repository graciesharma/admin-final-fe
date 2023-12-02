import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMediaQuery } from "@mantine/hooks";
import {
  Box,
  Group,
  Modal,
  Stack,
  Text,
  Title,
  Flex,
  TextInput,
  Rating,
  Button,
  Divider,
} from "@mantine/core";

const AddReviewModal = ({ opened, onClose, onSubmit }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const methods = useForm();
  const { handleSubmit: submitForm, ...rest } = methods;
  const { isSubmittingReview, ...method } = rest;

  return (
    <Modal
      size="70.1rem"
      opened={opened}
      zIndex={500}
      onClose={onClose}
      withCloseButton={true}
      radius={8}
      centered={true}
      padding={0}
      overlayColor="rgba(35, 42, 64, 0.4)"
      fullScreen={isMobile}
      classNames={{
        header: {
          padding: "1.6rem 2rem 0 0",
        },
        body: {
          padding: 0,
        },
        close: {
          "& svg": {
            padding:"2rem",
            width: "2rem",
            height: "2rem",
          },
        },
      }}
    >
      <Box
        sx={{
          padding: "0rem 2rem",
          marginTop: "-2.5rem",
        }}
      >
        <Stack spacing={8} mb="2.2rem">
          <Title weight={600}>Write a review</Title>
          <Text size={20} weight={500}>
            Your opinion means the world to us and we appreciate the time you’re
            taking to leave a review.
          </Text>
          <Divider />
        </Stack>
        <FormProvider {...method}>
          <Box component="form" onSubmit>
            <Box>
              <Stack mb="2.4rem" spacing={0}>
                <Flex mb="1.2rem">
                  <Text size={20} weight={600}>
                    Please provide your information{" "}
                  </Text>
                  &nbsp;
                </Flex>
                <Stack spacing={16}>
                  <TextInput
                    label="Full name"
                    radius={8}
                    data-autofocus
                    placeholder="Your full name "
                  />
                  <TextInput
                    name="email"
                    label="Email"
                    placeholder="Contact email address"
                    radius={8}
                  />
                </Stack>
              </Stack>
              <Stack spacing={0}>
                <Flex>
                  <Text size={20} weight={600} mb="2rem">
                    How would you rate this toilet?
                  </Text>
                  &nbsp;
                </Flex>
                <Rating size="xl" />

                <TextInput
                  sx={{
                    TextInput: {
                      width: "4rem",
                    },
                  }}
                  name="description"
                  mt="2rem"
                  mb="4rem"
                  radius={8}
                  placeholder="Add something about your experience "
                />
              </Stack>
            </Box>
            <Group position="right" mb={20}>
              <Button color="red" sx={{ minWidth: "10rem" }} onClick={onClose}>
                Cancel
              </Button>
              <Button
              onClick={submitForm}
                type="submit"
                rounded
                disabled={isSubmittingReview}
                loading={isSubmittingReview}
                sx={{
                  minWidth: "14rem",
                }}
              >
                Submit
              </Button>
            </Group>
          </Box>
        </FormProvider>
      </Box>
    </Modal>
  );
};

export default AddReviewModal;
