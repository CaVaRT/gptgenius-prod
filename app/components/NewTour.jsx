'use client';
import toast from 'react-hot-toast';
import TourInfo from './TourInfo';
import { useAuth } from '@clerk/nextjs';
import {
  getExistingTour,
  generateTourResponse,
  createNewTour,
  fetchUserTokensById,
  subtractTokens,
} from '@/utils/actions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const NewTour = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) return existingTour;

      const currentTokens = await fetchUserTokensById(userId);
      if (currentTokens < 300) {
        toast.error('You run out of tokens...');
        return null;
      }
      const newTour = await generateTourResponse(destination);
      if (!newTour) {
        toast.error('No matching city found...');
        return null;
      }
      const response = await createNewTour(newTour.tour);

      queryClient.invalidateQueries({ queryKey: ['tours'] });
      const newTokens = await subtractTokens(userId, newTour.tokens);
      toast.success(`${newTokens} tokens left!`);
      return newTour.tour;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination);
  };

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4">Select your dream destination</h2>
        <div className="join w-full">
          <input
            type="text"
            placeholder="city"
            name="city"
            className="join-item input input-bordered w-full"
            required
          />
          <input
            type="text"
            placeholder="country"
            name="country"
            className="input input-bordered join-item w-full"
            required
          />
          <button type="submit" className="btn btn-primary join-item">
            generate tour
          </button>
        </div>
      </form>
      <div className="mt-16">{tour ? <TourInfo tour={tour} /> : null}</div>
    </>
  );
};
export default NewTour;