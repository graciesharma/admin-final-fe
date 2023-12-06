import React from "react";
import {
  Modal,
  Text,
  Rating,
  Stack,
  Divider,
  Flex,
  Button,
} from "@mantine/core";
import ToiletService from "../services/ToiletService";

const ReviewRatingModal = ({ opened, close, toiletId }) => {
  const [reviewsData, setReviewsData] = React.useState([]);
  const toiletService = React.useMemo(() => new ToiletService(), []);

  React.useEffect(() => {
    toiletService.getReview(toiletId).then((data) => setReviewsData(data.data));
  }, [toiletId, toiletService]);

  const deleteReview = (reviewId) => {
    const deletedReview = reviewsData.filter(({ id }) => id !== reviewId);
    setReviewsData(deletedReview);
    toiletService.deleteReview(toiletId, reviewId).then(() => {});
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Review"
      centered
      size="lg"
      padding={20}
    >
      <Stack gap="0.5rem">
        {reviewsData?.map((reviewRating, index) => (
          <React.Fragment key={index}>
            <Stack>
              <Flex justify="space-between">
                <Text fw="bold">Name: {reviewRating.fullName}</Text>
                <Button
                  color="red"
                  onClick={() => deleteReview(reviewRating.id)}
                >
                  Delete Review
                </Button>
              </Flex>
              <Text>Email: {reviewRating.email}</Text>
              <Text color="gray">{reviewRating.description}</Text>
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
