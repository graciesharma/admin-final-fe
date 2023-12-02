import React from "react";
import { Modal, Text, Rating, Stack, Divider } from "@mantine/core";
import ToiletService from "../services/ToiletService";

const ReviewRatingModal = ({ opened, close, toiletId }) => {
  const [reviewsData, setReviewsData] = React.useState([]);
  const toiletService = React.useMemo(() => new ToiletService(), []);

  React.useEffect(() => {
    toiletService.getReview(toiletId).then((data) => setReviewsData(data.data));
  }, [toiletId, toiletService]);

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Review"
      centered
      size="lg"
      padding={20}
    >
      <Stack gap="xs">
        {reviewsData?.map((reviewRating, index) => (
          <React.Fragment key={index}>
            <Stack gap="xs">
              <Text>{reviewRating.fullName}</Text>
              <Text>{reviewRating.emailAddress}</Text>
              <Text>{reviewRating.description}</Text>
              <Rating value={reviewRating.rating} fractions={2} readOnly />
            </Stack>
            <Divider />
          </React.Fragment>
        ))}
      </Stack>
    </Modal>
  );
};

export default ReviewRatingModal;
