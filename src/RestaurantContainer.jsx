import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantDetail from './RestaurantDetail';

import {
  loadRestaurant,
  changeReviewFields,
  sendReview,
} from './actions';

import { get } from './utils';
import RestaurantReviewForm from './RestaurantReviewForm';
import RestaurantReviews from './RestaurantReviews';

export default function RestaurantContainer({ restaurantId }) {
  const dispatch = useDispatch();

  const reviews = [
    {
      id: 1,
      name: '테스터',
      score: '5',
      description: '맛있어요',
    },
  ];

  useEffect(() => {
    dispatch(loadRestaurant({ restaurantId }));
  }, []);

  const restaurant = useSelector(get('restaurant'));

  if (!restaurant) {
    return (
      <p>Loading...</p>
    );
  }

  function handleChange({ value, name }) {
    dispatch(changeReviewFields({ value, name }));
  }

  function handleClick() {
    dispatch(sendReview({ restaurantId }));
  }

  return (
    <>
      <RestaurantDetail restaurant={restaurant} />
      <RestaurantReviewForm
        onChange={handleChange}
        onClick={handleClick}
      />
      <RestaurantReviews reviews={reviews} />
    </>
  );
}
