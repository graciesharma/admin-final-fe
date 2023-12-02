import {
  Box,
  Button,
  Flex,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";
import Dropzone from "react-dropzone";
import { Controller, FormProvider, useForm } from "react-hook-form";
import ToiletService from "../services/ToiletService";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const RestroomAddForm = ({ opened, close, toiletId, onSubmit }) => {
  const toiletService = React.useMemo(() => new ToiletService(), []);
  const methods = useForm();
  const { handleSubmit, setValue, watch } = methods;
  const watchLatitude = watch("latitude");
  const watchLongitude = watch("longitude");
  const watchImages = watch("images");
  const [amValue, setAmValue] = React.useState("8:00");
  const [pmValue, setPmValue] = React.useState("8:00");

  React.useEffect(() => {
    if (!toiletId) return;
    toiletService.get(toiletId).then((response) => {
      const responseData = response.data;
      setValue("name", responseData.name);
      setValue("latitude", responseData.coords.latitude);
      setValue("longitude", responseData.coords.longitude);
      setValue("images", responseData.images);
      setValue("description", responseData.description);
      setValue("locationName", responseData.locationName);
      setValue("countryName", responseData.countryName);
      setValue("tags", responseData.tags);
      setAmValue(responseData.openingTime);
      setPmValue(responseData.closingTime);
    });
  }, []);

  React.useEffect(() => {
    if (toiletId) return;
    setValue("latitude", 27.705404499487766);
    setValue("longitude", 85.304517365112275);
    setValue("locationName", "Kathmandu");
    setValue("countryName", "Nepal");
  }, []);

  const onMarkerDragEnd = async (e) => {
    setValue("latitude", e.latLng.lat());
    setValue("longitude", e.latLng.lng());
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng.lat()},${e.latLng.lng()}&key=AIzaSyCkWaxfKNAgjBQHtGKW_rQg6uPnr-zzgFg`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const addressResult = data.results[0];

        const locationName = addressResult.address_components.filter(
          (component) => component.types.includes("locality")
        );

        const countryName = addressResult.address_components.filter(
          (component) => component.types.includes("country")
        );

        setValue("locationName", locationName[0].long_name);
        setValue("countryName", countryName[0].long_name);
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };

  const handleDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("images", reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const center = {
    lat: watchLatitude,
    lng: watchLongitude,
  };

  const onHandleSubmit = (data) => {
    onSubmit(data, amValue, pmValue);
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
      }}
      title="Add a toilet"
      centered
      size="lg"
    >
      <FormProvider>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <Stack spacing="lg">
            <Flex justify="flex-start">
              <Flex direction="column">
                <Text size="0.875rem" weight="500" color="#212529">
                  Opening Time
                </Text>
                <TimePicker onChange={setAmValue} value={amValue} />
              </Flex>
              <Flex ml={20} direction="column">
                <Text size="0.875rem" weight="500" color="#212529">
                  Closing Time
                </Text>
                <TimePicker onChange={setPmValue} value={pmValue} />
              </Flex>
            </Flex>

            <Controller
              {...methods}
              render={({ field }) => {
                return (
                  <TextInput
                    placeholder="Name"
                    label="Name of the toilet"
                    {...field}
                  />
                );
              }}
              name="name"
            />
            <Controller
              {...methods}
              render={({ field }) => {
                return (
                  <MultiSelect
                    placeholder="Tags"
                    label="Tags"
                    data={[
                      "Gender Neutral",
                      "Baby Feeding and Changing",
                      "Disabled Friendly",
                      "Senior Friendly",
                      "Commercial Building",
                      "Government Building",
                      "Hospital ",
                    ]}
                    {...field}
                  />
                );
              }}
              name="tags"
            />
            <Controller
              {...methods}
              render={({ field }) => {
                return (
                  <Textarea
                    placeholder="Description"
                    label="Description"
                    {...field}
                  />
                );
              }}
              name="description"
            />
            <Controller
              {...methods}
              render={({ field }) => {
                return (
                  <NumberInput
                    placeholder="Latitude"
                    label="Latitude"
                    withAsterisk
                    hideControls
                    precision={15}
                    {...field}
                  />
                );
              }}
              name="latitude"
            />
            <Controller
              {...methods}
              render={({ field }) => {
                return (
                  <NumberInput
                    placeholder="Longitude"
                    label="Longitude"
                    withAsterisk
                    precision={15}
                    hideControls
                    {...field}
                  />
                );
              }}
              name="longitude"
            />
            <Controller
              {...methods}
              render={({ field }) => {
                return (
                  <TextInput
                    placeholder="Locality"
                    label="Locality"
                    disabled
                    {...field}
                  />
                );
              }}
              name="locationName"
            />
            <LoadScript googleMapsApiKey="AIzaSyCkWaxfKNAgjBQHtGKW_rQg6uPnr-zzgFg">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
              >
                <Marker
                  position={center}
                  draggable={true}
                  onDragEnd={onMarkerDragEnd}
                />
              </GoogleMap>
            </LoadScript>

            <Controller
              {...methods}
              render={() => {
                return (
                  <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <Box
                            sx={{
                              border: "3px dashed grey",
                              padding: "0.6rem",
                              borderRadius: "12px",
                            }}
                          >
                            Upload the image of the toilet
                          </Box>
                          {watchImages && (
                            <Flex justify="center" align="center" mt="2rem">
                              <img
                                style={{
                                  height: "250px",
                                  width: "250px",
                                }}
                                src={watchImages}
                                alt="Preview"
                              />
                            </Flex>
                          )}
                        </div>
                      </section>
                    )}
                  </Dropzone>
                );
              }}
              name="images"
            />

            <Flex justify="flex-end">
              <Button type="submit">Submit</Button>
            </Flex>
          </Stack>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default RestroomAddForm;
